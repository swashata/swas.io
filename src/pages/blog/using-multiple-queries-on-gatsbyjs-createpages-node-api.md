---
title: Using multiple queries or entries on gatsbyjs createPages Node API
date: 2018-10-24T07:55:06.295Z
featured_image: null
description: Learn how to create multiple types of pages with multiple graphql queries under gatsbyjs createPages node API.
tags: ["gatsbyjs"]
templateKey: blog-post
---

[Gatsbyjs Node API](https://www.gatsbyjs.org/docs/node-apis/) provides great many
ways to create static pages for your application. The thing I like most about it
is, the complete control it gives. Essentially to create a page, we need to

1.  Supply `path` or `slug` of the page.
2.  A react component template.
3.  Data.

> **NOTE**: The article is written for gatsbyjs v2, and it may still work for v1.

Gatsby doesn't care how and where the data came from, it can be from a `graphql`
query or maybe something else too. It just creates a page at the provided `path`,
passes the data to your react component and again you are in control of how to
present the data.

So I was in a situation where I needed to iterate over a multiple thing, which
was based on promise interface and I needed `createPages` to wait for all the
promise to resolve. Basically I was:

1.  Fetching some markdown files using `graphql` query.
2.  Fetching some directory from the file-system using Nodejs `fs` API.

This is the solution I came up with.

## Use `Promise.all` interface

Under `gatsby-node.js` file, we usually define `createPages` like this:

```js
// Create pages for docs
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;
	const docTemplate = path.resolve('src/templates/docTemplate.js');

	// Individual doc pages
	return graphql(`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { glob: "**/docs/**/*.md" } }
				sort: { order: DESC, fields: frontmatter___order }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			Promise.reject(result.errors);
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: docTemplate,
			});
		});
	});
};
```

As we can see, here we are just returning one single `Promise`, we get with `graphql`
function and gatsby is taking care of waiting till it is resolved. This is just how `Promise` work, they don't resolve until we call `resolve()` or all chainables
are passed.

So naturally the right way to wait for multiple queries would be to have multiple
`Promise` and return a `Promise.all([promiseOne, promiseTwo])`. Let's see an example

```js
// Create pages for docs and docRoots
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;
	const docTemplate = path.resolve('src/templates/docTemplate.js');
	const docRootTemplate = path.resolve('src/templates/docRootTemplate.js');

	// Individual doc pages
	// graphql already returns a promise
	// so we can use that instead of creating our own Promise instance
	const docs = graphql(`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { glob: "**/docs/**/*.md" } }
				sort: { order: DESC, fields: frontmatter___order }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			Promise.reject(result.errors);
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: docTemplate,
			});
		});
	});

	// Doc root pages
	// This is a `sync` operation, but we are wrapping
	// inside a Promise, because that's what gatsby Node API
	// expects.
	const docRoots = new Promise((resolve, reject) => {
		// First get all directories inside docs
		const docTypes = dirs(path.resolve(__dirname, './docs'));
		if (docTypes && docTypes.length) {
			docTypes.forEach(docType => {
				createPage({
					path: `/${docType}/`,
					component: docRootTemplate,
					context: {
						docType,
					},
				});
			});
			resolve();
		} else {
			reject(new Error(`No directories found for document roots.`));
		}
	});

	return Promise.all([docs, docRoots]);
};
```

Here we are

1.  Querying through `graphql` our markdown files.
2.  At the same time, we are querying directories to get child directory and creating
    pages for them too. Here the operation is `synchronous` but we are still using
    promise interface to demonstrate the working of `asynchronous` operations.
3.  Finally we are returning `Promise.all([...])`, which would return a promise
    interface, which in turn, would wait for all the individual Promises we have
    passed to it.

And that's how it works.

## What if I need multiple `graphql` queries?

In most of the cases you don't. Just use a single `graphql` query and extract
data from it.

For example, if we were to extract files from `src/pages/guide/**/*.md`, and
`src/blog/**/*.md`, then instead of writing two queries, we can very much do

```js
// Create pages for docs
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;
	const docTemplate = path.resolve('src/templates/docTemplate.js');
	const blogTemplate = path.resolve('src/templates/blogTemplate.js');

	// Individual doc and blog pages
	// All in one go
	return graphql(`
		{
			blogs: allMarkdownRemark(
				filter: { fileAbsolutePath: { glob: "**/src/pages/blog/*.md" } }
				sort: { order: DESC, fields: frontmatter___date }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
			docs: allMarkdownRemark(
				filter: {
					fileAbsolutePath: { glob: "**/src/pages/project/*.md" }
				}
				sort: { order: DESC, fields: frontmatter___order }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			Promise.reject(result.errors);
		}

		// Create doc pages
		result.data.docs.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: docTemplate,
			});
		});
		// Create blog pages
		result.data.blogs.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: docTemplate,
			});
		});
	});
};
```

Notice we are querying `docs` and `blogs` under the same `graphql`

```graphql
{
	blogs: allMarkdownRemark(
		filter: { fileAbsolutePath: { glob: "**/src/pages/blog/*.md" } }
		sort: { order: DESC, fields: frontmatter___date }
	) {
		edges {
			node {
				fields {
					slug
				}
			}
		}
	}
	docs: allMarkdownRemark(
		filter: { fileAbsolutePath: { glob: "**/src/pages/project/*.md" } }
		sort: { order: DESC, fields: frontmatter___order }
	) {
		edges {
			node {
				fields {
					slug
				}
			}
		}
	}
}
```

and extracting the results using `result.data.blogs` and `result.data.docs`.

IMHO, this is the perfectly fine way to have multiple query dependent `createPage`
stuff.

But if, for some reason, you absolutely **MUST** have parallel running multiple
queries, then again you can use the promise interface. Let's convert the same
example into multiple queries.

```js
// Create pages for docs and blogs separately using two separate
// queries. We use the `graphql` function which returns a Promise
// and ultimately resolve all of them using Promise.all(Promise[])
exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;
	const docTemplate = path.resolve('src/templates/docTemplate.js');
	const blogTemplate = path.resolve('src/templates/blogTemplate.js');

	// Individual blogs pages
	const blogs = graphql(`
		{
			blogs: allMarkdownRemark(
				filter: { fileAbsolutePath: { glob: "**/src/pages/blog/*.md" } }
				sort: { order: DESC, fields: frontmatter___date }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			Promise.reject(result.errors);
		}

		// Create blog pages
		result.data.blogs.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: blogTemplate,
			});
		});
	});

	// Individual docs pages
	const docs = graphql(`
		{
			docs: allMarkdownRemark(
				filter: {
					fileAbsolutePath: { glob: "**/src/pages/project/*.md" }
				}
				sort: { order: DESC, fields: frontmatter___order }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			Promise.reject(result.errors);
		}

		// Create doc pages
		result.data.docs.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: docTemplate,
			});
		});
	});

	// Return a Promise which would wait for both the queries to resolve
	return Promise.all([blogs, docs]);
};
```

Here we are creating multiple `Promise`es `blogs` and `docs`. Notice we are again
just using `graphql` directly, which actually returns a `Promise`. We are calling
`.then()` to chain a callback function, under which we are creating the pages
through `createPage` API.

Returning `Promise.all([blogs, docs])` ensures that our operation is successfully
completed, before gatsby moves to create page files.
