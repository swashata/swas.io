import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash.kebabcase';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import readingTime from 'reading-time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Disqus from 'disqus-react';

import Page from '../components/Page';
import Content, { HTMLContent } from '../components/Content';
import Share from '../components/Share';

export const BlogPostTemplate = props => {
	const {
		content,
		contentComponent,
		tags,
		title,
		helmet,
		date,
		nextPost,
		prevPost,
		socialConfig,
		featured,
	} = props;
	const PostContent = contentComponent || Content;
	const readingStat = !contentComponent
		? readingTime(content.props.value)
		: readingTime(content);
	return (
		<Page
			title={title}
			subtitle={`on ${date} • ${readingStat.text}`}
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
					{socialConfig !== null ? (
						<Disqus.DiscussionEmbed {...socialConfig} />
					) : null}
				</React.Fragment>
			}
			hero={featured}
		>
			{helmet || ''}
			<div className="content">
				<article className="blog-article">
					<PostContent content={content} />
				</article>
			</div>
			<div className="post-meta">
				{tags && tags.length ? (
					<div className="post-meta__block">
						<h6 className="title is-6">Tags:</h6>
						<div className="tags">
							{tags.map(tag => (
								<Link
									to={`/tags/${kebabCase(tag)}/`}
									className="tag is-medium"
									key={tag}
								>
									{tag}
								</Link>
							))}
						</div>
					</div>
				) : null}
				{socialConfig !== null ? (
					<div className="post-meta__block">
						<h6 className="title is-6">Share:</h6>
						<div className="post-meta__share-buttons">
							<Share socialConfig={socialConfig} tags={tags} />
						</div>
					</div>
				) : null}
			</div>
		</Page>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	contentComponent: PropTypes.func,
	title: PropTypes.string.isRequired,
	helmet: PropTypes.objectOf(PropTypes.any),
	tags: PropTypes.arrayOf(PropTypes.string),
	date: PropTypes.string.isRequired,
	prevPost: PropTypes.objectOf(PropTypes.any),
	nextPost: PropTypes.objectOf(PropTypes.any),
	socialConfig: PropTypes.shape({
		shortname: PropTypes.string.isRequired,
		config: PropTypes.object.isRequired,
	}),
	featured: PropTypes.objectOf(PropTypes.any),
};
BlogPostTemplate.defaultProps = {
	contentComponent: null,
	tags: [],
	prevPost: null,
	nextPost: null,
	helmet: null,
	socialConfig: null,
	featured: null,
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
				featured_image: featuredImage,
			},
			excerpt,
			fields: { slug },
		},
		site: {
			siteMetadata: { shortTitle, url, disqusShortName, twitterHandle },
		},
		prevPost,
		nextPost,
		pageBG,
	} = data;
	const featured =
		featuredImage &&
		featuredImage.childImageSharp &&
		featuredImage.childImageSharp.resolutions &&
		featuredImage.childImageSharp.resolutions.src
			? featuredImage.childImageSharp.resolutions.src
			: '';

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
	const socialConfig = {
		shortname: disqusShortName,
		config: {
			url: `${url}${slug}`,
			title,
			identifier: slug,
		},
		twitterHandle,
	};
	const props = {
		content: html,
		contentComponent: HTMLContent,
		description,
		helmet,
		tags,
		date,
		title,
		prevPost,
		nextPost,
		socialConfig,
		featured:
			featuredImage &&
			featuredImage.childImageSharp &&
			featuredImage.childImageSharp.resolutions
				? featuredImage.childImageSharp
				: pageBG.childImageSharp,
	};
	return <BlogPostTemplate {...props} />;
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		post: PropTypes.object,
		prevPost: PropTypes.object,
		nextPost: PropTypes.object,
		pageBG: PropTypes.object,
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
				twitterHandle
			}
		}
		post: markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM, YYYY")
				title
				tags
				featured_image {
					childImageSharp {
						resolutions(width: 960) {
							...GatsbyImageSharpResolutions_withWebp
						}
					}
				}
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
		pageBG: file(relativePath: { eq: "blog.jpg" }) {
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
