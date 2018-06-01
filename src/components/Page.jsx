import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './Page.scss';

const Page = ({ title, subtitle, children, footer, hero }) => (
	<div className="page">
		<section className="hero page__hero is-primary">
			{hero !== null ? (
				<Img
					// sizes={bg.sizes}
					resolutions={hero.resolutions}
					style={{
						position: 'absolute',
						left: '-5%',
						top: '-5%',
						width: '110%',
						height: '110%',
					}}
				/>
			) : null}
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

Page.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	footer: PropTypes.node,
	hero: PropTypes.shape({
		resolutions: PropTypes.object.isRequired,
	}),
};
Page.defaultProps = {
	footer: null,
	hero: null,
};

export default Page;
