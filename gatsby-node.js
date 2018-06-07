const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const {
	createPaginationPages,
	prefixPathFormatter,
	createLinkedPages,
} = require('gatsby-pagination');

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	return graphql(`
		{
			site {
				siteMetadata {
					title
					shortTitle
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
							date(formatString: "MMMM DD, YYYY")
							featured_image {
								childImageSharp {
									sizes {
										aspectRatio
										base64
										sizes
										src
										srcSet
										srcWebp
										srcSetWebp
									}
								}
							}
						}
						excerpt(pruneLength: 400)
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
					siteMetadata: { title, shortTitle },
				},
			},
		} = result;

		// Create paginated pages for blog posts
		const blogEdges = edges.filter(
			edge => edge.node.frontmatter.templateKey === 'blog-post'
		);
		const staticEdges = edges.filter(
			edge => edge.node.frontmatter.templateKey === 'static-page'
		);
		createPaginationPages({
			createPage,
			edges: blogEdges,
			component: path.resolve('src/templates/BlogPage.jsx'),
			limit: 5,
			// pathFormatter: p => (p === 1 ? `/blog/` : `/blog/${p}`),
			pathFormatter: prefixPathFormatter('/blog'),
			context: {
				title,
				shortTitle,
			},
		});

		// Create linked blog pages
		createLinkedPages({
			createPage,
			edges: blogEdges,
			component: path.resolve(`src/templates/blog-post.js`),
			edgeParser: edge => {
				const {
					id,
					fields: { slug },
				} = edge.node;
				return {
					path: slug,
					// additional data can be passed via context
					context: {
						id,
						slug,
					},
				};
			},
			circular: true,
		});

		// Create static pages
		staticEdges.forEach(edge => {
			const {
				id,
				fields: { slug },
			} = edge.node;
			createPage({
				path: slug,
				component: path.resolve(`src/templates/static-page.js`),
				// additional data can be passed via context
				context: {
					id,
				},
			});
		});

		// Tag pages:
		let tags = [];
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
