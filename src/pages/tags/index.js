import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Page from '../../components/Page';

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
		site: {
			siteMetadata: { title },
		},
	},
}) => (
	<Page title={`Total ${group.length} tags`} subtitle={title}>
		<div className="tags">
			{group.map(tag => (
				<Link
					className="tag is-info is-large"
					to={`/tags/${kebabCase(tag.fieldValue)}/`}
					key={tag}
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
	}
`;
