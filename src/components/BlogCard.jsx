// Will create a component that will list down all blog posts
// in cards which gets passed to it.
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';

import './BlogCard.scss';

const BlogCard = ({ excerpt, featuredImage, tags, title, slug, date }) => (
	<div className="blog-card">
		<header className="blog-card__header">
			<h2 className="title is-4">
				<Link to={slug}>{title}</Link>
			</h2>
			<p className="subtitle is-6">
				{`on ${date} under`}
				{tags.map(tag => (
					<Link
						to={`/tags/${kebabCase(tag)}/`}
						className="tag"
						key={tag}
					>
						{tag}
					</Link>
				))}
			</p>
		</header>
		{featuredImage !== '' &&
			featuredImage != null && (
				<div className="blog-card__featured-image">
					<figure className="image is-fullwidth">
						<Link to={slug}>
							<img src={featuredImage} alt={title} />
						</Link>
					</figure>
				</div>
			)}
		<div className="blog-card__content">
			<div className="content has-text-justified">
				<p>{excerpt}</p>
			</div>
		</div>
		<footer className="blog-card__footer">
			<Link to={slug} className="button is-outlined is-rounded">
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
	date: PropTypes.string.isRequired,
};
BlogCard.defaultProps = {
	featuredImage: null,
	tags: [],
};

export default BlogCard;
