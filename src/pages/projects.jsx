import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import ProjectList from '../components/ProjectList';

const Projects = props => {
	const {
		data: {
			projects: { edges },
			site: {
				siteMetadata: { shortTitle },
			},
			pageBG,
		},
	} = props;
	return (
		<Page
			title={`Projects – ${shortTitle}`}
			subtitle={`Total ${edges.length} projects published`}
			hero={pageBG.childImageSharp}
		>
			{edges.map(project => {
				const {
					node: {
						html,
						id,
						frontmatter: {
							featured_image: {
								childImageSharp: { sizes: featuredImage },
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
		</Page>
	);
};

Projects.propTypes = {
	data: PropTypes.shape({
		projects: PropTypes.object,
		site: PropTypes.object,
		pageBG: PropTypes.object,
	}).isRequired,
};

export default Projects;

export const projectQuery = graphql`
	query ProjectQuery {
		projects: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___order] }
			filter: { frontmatter: { templateKey: { eq: "projects" } } }
			limit: 1000
		) {
			edges {
				node {
					id
					frontmatter {
						title
						subtitle
						featured_image {
							childImageSharp {
								sizes(maxWidth: 960) {
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
		site {
			siteMetadata {
				shortTitle
			}
		}
		pageBG: file(relativePath: { eq: "projects.jpg" }) {
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
