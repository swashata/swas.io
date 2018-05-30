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
		},
	} = props;
	return (
		<Page
			title={`Projects – ${shortTitle}`}
			subtitle={`Total ${edges.length} projects published`}
		>
			{edges.map(project => {
				const {
					node: {
						html,
						id,
						frontmatter: {
							featured_image: featuredImage,
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
	}).isRequired,
};

export default Projects;

export const projectQuery = graphql`
	query ProjectQuery {
		projects: allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___order] }
			filter: { frontmatter: { templateKey: { eq: "projects" } } }
			limit: 4
		) {
			edges {
				node {
					id
					frontmatter {
						title
						subtitle
						featured_image
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
	}
`;
