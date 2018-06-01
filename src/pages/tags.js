import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Page from '../components/Page';

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
		site: {
			siteMetadata: { title },
		},
		pageBG,
	},
}) => (
	<Page
		title={`Total ${group.length} tags`}
		subtitle={title}
		hero={pageBG.childImageSharp}
	>
		<div
			className="tags"
			style={{ maxWidth: '960px', margin: '2rem auto' }}
		>
			{group.map(tag => (
				<Link
					className="tag is-info is-large"
					to={`/tags/${kebabCase(tag.fieldValue)}/`}
					key={tag.fieldValue}
				>
					{tag.fieldValue} ({tag.totalCount})
				</Link>
			))}
		</div>
	</Page>
);
TagsPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.object,
		site: PropTypes.object,
		pageBG: PropTypes.shape({
			childImageSharp: PropTypes.object.isRequired,
		}),
	}).isRequired,
};

export default TagsPage;

export const tagPageQuery = graphql`
	query TagsQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(limit: 1000) {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
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
