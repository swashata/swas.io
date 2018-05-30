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
				footer={
					<div className="has-text-centered">
						<Link
							className="button is-large is-link is-outlined"
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
	data: PropTypes.objectOf(PropTypes.any).isRequired,
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
						featured_image
					}
					excerpt
					id
				}
			}
		}
	}
`;
