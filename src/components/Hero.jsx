import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Hero.scss';

const Hero = props => {
	const {
		data: {
			site: {
				siteMetadata: { author, socials, taglines },
			},
		},
	} = props;
	return (
		<div className="swas-hero">
			<div className="swas-hero__title">
				<h1 className="swas-hero__author title">{author}</h1>
				<h2
					className="swas-hero__tagline subtitle"
					dangerouslySetInnerHTML={{
						__html: taglines.join(' - '),
					}}
				/>
			</div>
			<div className="swas-hero__socials">
				{Object.keys(socials).map(s => (
					<a className="swas-hero__social" key={s} href={socials[s]}>
						<FontAwesomeIcon icon={['fab', s]} />
					</a>
				))}
			</div>
		</div>
	);
};
Hero.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.object,
	}).isRequired,
};
export default Hero;