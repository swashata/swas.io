import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = ({
	content,
	contentComponent,
	description,
	tags,
	title,
	helmet,
}) => {
	const PostContent = contentComponent || Content;

	return (
		<section className="section">
			{helmet || ''}
			<div className="container content">
				<div className="columns">
					<div className="column is-10 is-offset-1">
						<h1 className="title is-size-2 has-text-weight-bold is-bold-light">
							{title}
						</h1>
						{tags && tags.length ? (
							<div style={{ margin: `1rem 0` }}>
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
						<p>{description}</p>
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
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.instanceOf(Helmet),
};

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data;
	console.log(data);
	return (
		<BlogPostTemplate
			content={post.html}
			contentComponent={HTMLContent}
			description={post.frontmatter.description}
			helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
		/>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
			}
		}
	}
`;
