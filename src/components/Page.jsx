import React from 'react';
import PropTypes from 'prop-types';

import './Page.scss';

const Page = ({ title, subtitle, children, footer, hero }) => {
	const heroStyle = {};
	if (hero && hero !== '') {
		heroStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("${hero}")`;
	}
	return (
		<div className="page">
			<section className="hero page__hero is-primary" style={heroStyle}>
				<div className="hero-body">
					<div className="container">
						<h1 className="title is-1">{title}</h1>
						<h2 className="subtitle is-4">{subtitle}</h2>
					</div>
				</div>
			</section>
			<section className="section page__container">
				<div className="container">{children}</div>
			</section>
			{footer && (
				<footer className="section page__footer">
					<div className="container">{footer}</div>
				</footer>
			)}
		</div>
	);
};

Page.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	footer: PropTypes.node,
	hero: PropTypes.string,
};
Page.defaultProps = {
	footer: null,
	hero: '',
};

export default Page;
