import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import BlogCard from '../components/BlogCard';

class TagRoute extends React.Component {
	render() {
		const {
			data: {
				allMarkdownRemark: { edges: posts, totalCount },
				site: {
					siteMetadata: { title },
				},
			},
			pathContext: { tag },
		} = this.props;
		const tagHeader = `${totalCount} post${
			totalCount === 1 ? '' : 's'
		} tagged with “${tag}”`;

		return (
			<div className="blog-page">
				<Helmet title={`${tag} | ${title}`} />
				<section className="hero blog-page__hero is-primary">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">{tagHeader}</h1>
							<h2 className="subtitle is-4">{title}</h2>
						</div>
					</div>
				</section>
				<div className="container blog-page__container">
					<div className="blog-page__cards columns is-desktop is-multiline">
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
				</div>
				<div className="home-browse">
					<Link
						className="button is-large is-link is-outlined"
						to="/tags/"
					>
						Browse all tags
					</Link>
				</div>
			</div>
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
