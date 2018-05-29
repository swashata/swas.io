import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import readingTime from "reading-time";

import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = props => {
	const {
		content,
		contentComponent,
		tags,
		title,
		helmet,
		date,
	} = props;
	const PostContent = contentComponent || Content;
	const readingStat = readingTime(content);
	return (
		<section className="section">
			{helmet || ''}
			<div className="container content single">
				<div className="columns">
					<div className="column is-10 is-offset-1">
						<h1 className="title is-1 single__title">
							{title}
						</h1>
						<h4 className="subtitle is-size-6 single__subtitle">on {date} · {readingStat.text} · {readingStat.words} words</h4>
						<div className="single__post-meta">
							{tags && tags.length ? (
								<div className="post-meta__tags">
									<div className="tags">
										{tags.map(tag => (
											<Link
												to={`/tags/${kebabCase(tag)}/`}
												className="tag is-link"
												key={tag}
											>
												{tag}
											</Link>
										))}
									</div>
								</div>
							) : null}
						</div>
						<PostContent content={content} />
					</div>
				</div>
			</div>
		</section>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func,
	title: PropTypes.string.isRequired,
	helmet: PropTypes.instanceOf(Helmet).isRequired,
};
BlogPostTemplate.defaultProps = {
	contentComponent: null,
};

const BlogPost = ({ data }) => {
	const {
		markdownRemark: {
			html,
			frontmatter: { description, title, tags, date },
		},
	} = data;
	const props = {
		content: html,
		contentComponent: HTMLContent,
		description,
		helmet: <Helmet title={`${title} | Blog`} />,
		tags,
		date,
		title,
	};
	return <BlogPostTemplate {...props} />;
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM, YYYY")
				title
				tags
			}
		}
	}
`;
