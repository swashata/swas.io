import React from 'react';
import PropTypes from 'prop-types';

import './ProjectList.scss';

const ProjectList = ({ title, subtitle, featuredImage, link, html }) => (
	<div className="project-list">
		<div className="project-list__image">
			<a href={link} target="_blank" rel="noopener noreferrer">
				<img src={featuredImage} alt={title} />
			</a>
		</div>
		<div className="project-list__content">
			<div className="project-list__titles">
				<h2 className="title is-4">{title}</h2>
				<h3 className="subtitle is-6">{subtitle}</h3>
			</div>
			{typeof html === 'string' ? (
				<div
					className="content project-list__text has-text-justified"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			) : (
				<div className="content project-list__text has-text-justified">
					{html}
				</div>
			)}
			<div className="project-list__link">
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="button is-medium is-outlined is-rounded"
				>
					VISIT
				</a>
			</div>
		</div>
	</div>
);

ProjectList.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	featuredImage: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	html: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default ProjectList;
