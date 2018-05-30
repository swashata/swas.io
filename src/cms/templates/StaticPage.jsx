import React from 'react';
import PropTypes from 'prop-types';

import { StaticPageTemplate } from '../../templates/static-page';

const StaticPage = ({ entry, widgetFor }) => {
	const props = {
		content: widgetFor('body'),
		title: entry.getIn(['data', 'title']),
		subtitle: "Swas.io - Swashata's Personal Blog",
	};
	return <StaticPageTemplate {...props} />;
};

StaticPage.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}).isRequired,
	widgetFor: PropTypes.func.isRequired,
};

export default StaticPage;
