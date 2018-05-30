// Will create a component that will list down all blog posts
// in cards which gets passed to it.
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';

const BlogCard = ({ excerpt, featuredImage, tags, title, slug }) => (
	<div className="blog-card card">
		<header className="card-header">
			<Link to={slug}>
				<h2 className="card-header-title title is-5">{title}</h2>
			</Link>
		</header>
		{featuredImage !== '' &&
			featuredImage != null && (
				<div className="card-image">
					<figure className="image is-fullwidth">
						<Link to={slug}>
							<img src={featuredImage} alt={title} />
						</Link>
					</figure>
				</div>
			)}
		<div className="card-content">
			<div className="content">
				<p>{excerpt}</p>
			</div>
			{tags &&
				tags.length > 0 && (
					<div className="blog-card__tags tags">
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
				)}
		</div>
		<footer className="card-footer">
			<Link to={slug} className="card-footer-item">
				READ MORE
			</Link>
		</footer>
	</div>
);

BlogCard.propTypes = {
	excerpt: PropTypes.string.isRequired,
	featuredImage: PropTypes.string,
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
};
BlogCard.defaultProps = {
	featuredImage: null,
	tags: [],
};

export default BlogCard;
