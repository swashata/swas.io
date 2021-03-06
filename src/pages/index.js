import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import BlogCard from '../components/BlogCard';
import ProjectList from '../components/ProjectList';

export default class IndexPage extends React.Component {
	render() {
		const {
			data: {
				posts: { edges, totalCount: totalPosts },
				projects: { edges: projectEdges, totalCount: totalProjects },
			},
		} = this.props;
		return (
			<section className="section">
				<div className="container">
					<h2 className="subtitle is-3 home-blog-title">
						Latest Projects
					</h2>
					<div className="home-page-projects">
						{projectEdges.map(project => {
							const {
								node: {
									html,
									id,
									frontmatter: {
										featured_image: {
											childImageSharp: {
												sizes: featuredImage,
											},
										},
										title,
										subtitle,
										link,
									},
								},
							} = project;
							return (
								<ProjectList
									key={id}
									{...{
										title,
										html,
										link,
										featuredImage,
										subtitle,
									}}
								/>
							);
						})}
					</div>
					<div className="home-browse">
						<Link
							className="button is-large is-link is-outlined is-rounded"
							to="/projects/"
						>
							{`EXPLORE ALL ${totalProjects} PROJECTS`}
						</Link>
					</div>
					<h2 className="subtitle is-3 home-blog-title">
						Latest From Blog
					</h2>
					<div className="columns is-desktop is-multiline">
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
							className="button is-large is-link is-outlined is-rounded"
							to="/blog/"
						>
							{`BROWSE ALL ${totalPosts} ENTRIES`}
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
			limit: 4
		) {
			totalCount
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
						featured_image {
							childImageSharp {
								sizes(maxWidth: 960) {
									...GatsbyImageSharpSizes_withWebp
								}
							}
						}
					}
				}
			}
		}
		projects: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___order] }
			filter: { frontmatter: { templateKey: { eq: "projects" } } }
			limit: 3
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						subtitle
						featured_image {
							childImageSharp {
								sizes(maxWidth: 650) {
									...GatsbyImageSharpSizes_withWebp
								}
							}
						}
						link
					}
					html
				}
			}
		}
	}
`;
