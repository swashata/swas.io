import React from 'react';
import PropTypes from 'prop-types';

import { BlogPostTemplate } from '../../templates/blog-post';

const BlogPost = ({ entry, widgetFor }) => {
	const entryDate = new Date(entry.getIn(['data', 'date']));
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const date = `${
		monthNames[entryDate.getMonth()]
	}, ${entryDate.getFullYear()}`;
	const props = {
		content: widgetFor('body'),
		title: entry.getIn(['data', 'title']),
		tags: entry.getIn(['data', 'tags']),
		date,
		hero: entry.getIn(['data', 'hero_image']),
	};
	return <BlogPostTemplate {...props} />;
};

BlogPost.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}).isRequired,
	widgetFor: PropTypes.func.isRequired,
};

export default BlogPost;
