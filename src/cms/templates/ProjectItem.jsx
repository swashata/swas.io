import React from 'react';
import PropTypes from 'prop-types';

import ProjectList from '../../components/ProjectList';

const ProjectItem = ({ entry, widgetFor, getAsset }) => {
	const props = {
		html: widgetFor('body'),
		title: entry.getIn(['data', 'title']),
		subtitle: entry.getIn(['data', 'subtitle']),
		featuredImage: getAsset(entry.getIn(['data', 'featured_image'])),
		link: entry.getIn(['data', 'link']),
	};
	return <ProjectList {...props} />;
};

ProjectItem.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}).isRequired,
	widgetFor: PropTypes.func.isRequired,
	getAsset: PropTypes.func.isRequired,
};

export default ProjectItem;
