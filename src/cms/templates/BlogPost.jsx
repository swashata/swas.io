import React from 'react';
import PropTypes from 'prop-types';

import { BlogPostTemplate } from '../../templates/blog-post';

const BlogPost = ({ entry, widgetFor, getAsset }) => {
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
	const content = widgetFor('body');
	const props = {
		content,
		title: entry.getIn(['data', 'title']),
		tags: [],
		date,
		hero: getAsset(entry.getIn(['data', 'hero_image'])),
	};
	return <BlogPostTemplate {...props} />;
};

BlogPost.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
		getAsset: PropTypes.func,
	}).isRequired,
	widgetFor: PropTypes.func.isRequired,
	getAsset: PropTypes.func.isRequired,
};

export default BlogPost;
