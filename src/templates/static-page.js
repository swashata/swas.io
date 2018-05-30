import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Page from '../components/Page';
import Content, { HTMLContent } from '../components/Content';

export const StaticPageTemplate = ({
	title,
	content,
	contentComponent,
	subtitle,
	helmet,
}) => {
	const PageContent = contentComponent || Content;

	return (
		<Page title={title} subtitle={subtitle}>
			{helmet || ''}
			<div className="content">
				<PageContent content={content} />
			</div>
		</Page>
	);
};

StaticPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func.isRequired,
	subtitle: PropTypes.string.isRequired,
	helmet: PropTypes.objectOf(PropTypes.any).isRequired,
};

const StaticPage = ({ data }) => {
	const {
		page: {
			frontmatter: { title },
			html,
			excerpt,
			fields: { slug },
		},
		site: {
			siteMetadata: { title: siteTitle, shortTitle },
		},
	} = data;
	const helmet = (
		<Helmet>
			<title>
				{title} | {shortTitle}
			</title>
			<meta name="description" content={excerpt} />
			<meta property="og:title" content={`${title} | ${shortTitle}`} />
			<meta property="og:type" content="article" />
			<meta property="og:url" content={slug} />

			<meta property="og:description" content={excerpt} />
		</Helmet>
	);

	return (
		<StaticPageTemplate
			contentComponent={HTMLContent}
			title={title}
			content={html}
			subtitle={siteTitle}
			helmet={helmet}
		/>
	);
};

StaticPage.propTypes = {
	data: PropTypes.shape({
		page: PropTypes.object,
		site: PropTypes.object,
	}).isRequired,
};

export default StaticPage;

export const staticPageQuery = graphql`
	query StaticPage($id: String!) {
		site {
			siteMetadata {
				title
				shortTitle
			}
		}
		page: markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
			}
			excerpt
			fields {
				slug
			}
		}
	}
`;
