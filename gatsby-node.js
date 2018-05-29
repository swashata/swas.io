const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPaginationPages } = require('gatsby-pagination');

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	return graphql(`
		{
			site {
				siteMetadata {
					title
				}
			}
			posts: allMarkdownRemark(
				sort: { fields: [frontmatter___date], order: DESC }
			) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							tags
							templateKey
							title
							date
							featured_image
						}
						excerpt
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const {
			data: {
				posts: { edges },
				site: {
					siteMetadata: { title },
				},
			},
		} = result;

		// Create paginated pages for blog posts
		const blogEdges = edges.filter(
			edge => edge.node.frontmatter.templateKey === 'blog-post'
		);
		createPaginationPages({
			createPage,
			edges: blogEdges,
			component: path.resolve('src/templates/BlogPage.jsx'),
			limit: 10,
			pathFormatter: p => (p === 1 ? `/blog/` : `/blog/${p}`),
			context: {
				title,
			},
		});

		edges.forEach(edge => {
			const { id } = edge.node;
			createPage({
				path: edge.node.fields.slug,
				tags: edge.node.frontmatter.tags,
				component: path.resolve(
					`src/templates/${String(
						edge.node.frontmatter.templateKey
					)}.js`
				),
				// additional data can be passed via context
				context: {
					id,
				},
			});
		});

		// Tag pages:
		let tags = [];
		// Iterate through each post, putting all found tags into `tags`
		edges.forEach(edge => {
			if (_.get(edge, `node.frontmatter.tags`)) {
				tags = tags.concat(edge.node.frontmatter.tags);
			}
		});
		// Eliminate duplicate tags
		tags = _.uniq(tags);

		// Make tag pages
		tags.forEach(tag => {
			const tagPath = `/tags/${_.kebabCase(tag)}/`;

			createPage({
				path: tagPath,
				component: path.resolve(`src/templates/tags.js`),
				context: {
					tag,
				},
			});
		});
		return Promise.resolve();
	});
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};
