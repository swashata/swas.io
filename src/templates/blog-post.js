import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import readingTime from 'reading-time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Disqus from 'disqus-react';

import Page from '../components/Page';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = props => {
	const {
		content,
		contentComponent,
		tags,
		title,
		helmet,
		date,
		hero,
		nextPost,
		prevPost,
		disqusConfig,
	} = props;
	const PostContent = contentComponent || Content;
	const readingStat = readingTime(content);
	return (
		<Page
			title={title}
			subtitle={`on ${date} · ${readingStat.text} · ${
				readingStat.words
			} words`}
			footer={
				<React.Fragment>
					<nav className="post-navigation" aria-label="pagination">
						{nextPost && nextPost != null ? (
							<Link
								to={nextPost.fields.slug}
								className="post-navigation__previous button is-outlined is-link is-rounded"
							>
								<span className="icon is-medium">
									<FontAwesomeIcon icon="angle-double-left" />
								</span>
								<span className="post-navigation__label">
									{nextPost.frontmatter.title}
								</span>
							</Link>
						) : null}
						{prevPost && prevPost != null ? (
							<Link
								to={prevPost.fields.slug}
								className="post-navigation__next button is-outlined is-link is-rounded"
							>
								<span className="post-navigation__label">
									{prevPost.frontmatter.title}
								</span>
								<span className="icon is-medium">
									<FontAwesomeIcon icon="angle-double-right" />
								</span>
							</Link>
						) : null}
					</nav>
					{disqusConfig !== null ? (
						<Disqus.DiscussionEmbed {...disqusConfig} />
					) : null}
				</React.Fragment>
			}
			hero={hero}
		>
			{helmet || ''}
			<div className="content">
				<PostContent content={content} />
			</div>
			<div className="single__post-meta">
				{tags && tags.length ? (
					<div className="post-meta__tags">
						<div className="tags">
							{tags.map(tag => (
								<Link
									to={`/tags/${kebabCase(tag)}/`}
									className="tag is-link is-medium"
									key={tag}
								>
									{tag}
								</Link>
							))}
						</div>
					</div>
				) : null}
			</div>
		</Page>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func,
	title: PropTypes.string.isRequired,
	helmet: PropTypes.objectOf(PropTypes.any),
	tags: PropTypes.arrayOf(PropTypes.string),
	date: PropTypes.string.isRequired,
	hero: PropTypes.string,
	prevPost: PropTypes.objectOf(PropTypes.any),
	nextPost: PropTypes.objectOf(PropTypes.any),
	disqusConfig: PropTypes.shape({
		shortname: PropTypes.string.isRequired,
		config: PropTypes.object.isRequired,
	}),
};
BlogPostTemplate.defaultProps = {
	contentComponent: null,
	tags: [],
	hero: '',
	prevPost: null,
	nextPost: null,
	helmet: null,
	disqusConfig: null,
};

const BlogPost = ({ data }) => {
	const {
		post: {
			html,
			frontmatter: {
				description,
				title,
				tags,
				date,
				hero_image: hero,
				featured_image: featured,
			},
			excerpt,
			fields: { slug },
		},
		site: {
			siteMetadata: { shortTitle, url, disqusShortName },
		},
		prevPost,
		nextPost,
	} = data;
	const helmet = (
		<Helmet>
			<title>{`${title} | ${shortTitle}`}</title>
			<meta
				name="description"
				content={
					description && description !== '' ? description : excerpt
				}
			/>
			<meta property="og:title" content={`${title} | ${shortTitle}`} />
			<meta property="og:type" content="article" />
			<meta property="og:url" content={slug} />
			{featured && featured !== '' ? (
				<meta property="og:image" content={featured} />
			) : null}
			<meta
				property="og:description"
				content={
					description && description !== '' ? description : excerpt
				}
			/>
		</Helmet>
	);
	const disqusConfig = {
		shortname: disqusShortName,
		config: {
			url: `${url}${slug}`,
			title,
			identifier: slug,
		},
	};
	const props = {
		content: html,
		contentComponent: HTMLContent,
		description,
		helmet,
		tags,
		date,
		title,
		hero,
		prevPost,
		nextPost,
		disqusConfig,
	};
	return <BlogPostTemplate {...props} />;
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		post: PropTypes.object,
		prevPost: PropTypes.object,
		nextPost: PropTypes.object,
	}).isRequired,
	pathContext: PropTypes.shape({
		prev: PropTypes.string,
		next: PropTypes.string,
	}).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!, $prev: String!, $next: String!) {
		site {
			siteMetadata {
				shortTitle
				url
				disqusShortName
			}
		}
		post: markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM, YYYY")
				title
				tags
				hero_image
				featured_image
				description
			}
			excerpt
			fields {
				slug
			}
		}
		prevPost: markdownRemark(fields: { slug: { eq: $prev } }) {
			frontmatter {
				title
			}
			fields {
				slug
			}
		}
		nextPost: markdownRemark(fields: { slug: { eq: $next } }) {
			frontmatter {
				title
			}
			fields {
				slug
			}
		}
	}
`;
