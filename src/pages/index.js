import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import BlogCard from '../components/BlogCard';

export default class IndexPage extends React.Component {
	render() {
		const {
			data: {
				posts: { edges },
			},
		} = this.props;
		return (
			<section className="section">
				<div className="container">
					<h2 className="subtitle is-3 home-blog-title">
						Latest From Blog
					</h2>
					<div className="blog-page__cards columns is-desktop is-multiline">
						{edges.map(item => {
							const {
								node: {
									excerpt,
									fields: { slug },
									frontmatter: {
										date,
										featured_image: featuredImage,
										tags,
										title,
									},
									id,
								},
							} = item;
							const cardProps = {
								excerpt,
								date,
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
					<div className="home-browse">
						<Link
							className="button is-large is-link is-outlined"
							to="/blog/"
						>
							BROWSE
						</Link>
					</div>
				</div>
			</section>
		);
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		posts: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}).isRequired,
};

export const pageQuery = graphql`
	query IndexQuery {
		posts: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
			limit: 3
		) {
			edges {
				node {
					excerpt(pruneLength: 400)
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						date(formatString: "MMMM DD, YYYY")
						tags
					}
				}
			}
		}
	}
`;
