import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import BlogCard from '../components/BlogCard';
import Page from '../components/Page';

class TagRoute extends React.Component {
	render() {
		const {
			data: {
				allMarkdownRemark: { edges: posts, totalCount },
				site: {
					siteMetadata: { title, shortTitle },
				},
				pageBG,
			},
			pathContext: { tag },
		} = this.props;
		const tagHeader = `${totalCount} post${
			totalCount === 1 ? '' : 's'
		} tagged with “${tag}”`;

		return (
			<Page
				title={`${shortTitle} – ${tag}`}
				subtitle={tagHeader}
				hero={pageBG.childImageSharp}
				footer={
					<div className="home-browse">
						<Link
							className="button is-large is-link is-outlined is-rounded"
							to="/tags/"
						>
							Browse all tags
						</Link>
					</div>
				}
			>
				<Helmet title={`${tag} | ${title}`} />
				<div className="columns is-desktop is-multiline">
					{posts.map(item => {
						const {
							node: {
								excerpt,
								fields: { slug },
								frontmatter: {
									featured_image: featuredImage,
									tags,
									title, // eslint-disable-line no-shadow
								},
								id,
							},
						} = item;
						const cardProps = {
							excerpt,
							featuredImage,
							tags,
							title,
							slug,
						};
						return (
							<div className="column is-full" key={id}>
								<BlogCard {...cardProps} />
							</div>
						);
					})}
				</div>
			</Page>
		);
	}
}

export default TagRoute;
TagRoute.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.object.isRequired,
		allMarkdownRemark: PropTypes.object.isRequired,
		pageBG: PropTypes.object.isRequired,
	}).isRequired,
	pathContext: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		site {
			siteMetadata {
				title
				shortTitle
			}
		}
		allMarkdownRemark(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						tags
						templateKey
						title
						featured_image {
							childImageSharp {
								sizes(maxWidth: 960) {
									...GatsbyImageSharpSizes_withWebp
								}
							}
						}
					}
					excerpt
					id
				}
			}
		}
		pageBG: file(relativePath: { eq: "tags.jpg" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				# Makes it trivial to update as your page's design changes.
				resolutions(width: 2500) {
					...GatsbyImageSharpResolutions_withWebp
				}
			}
		}
	}
`;
