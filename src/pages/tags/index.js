import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
		site: {
			siteMetadata: { title },
		},
	},
}) => (
	<div className="blog-page">
		<Helmet title={`Tags | ${title}`} />
		<section className="hero blog-page__hero is-primary">
			<div className="hero-body">
				<div className="container">
					<h1 className="title is-1">{`Total ${
						group.length
					} tags`}</h1>
					<h2 className="subtitle is-4">{title}</h2>
				</div>
			</div>
		</section>
		<div className="container blog-page__container">
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
		</div>
	</div>
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
