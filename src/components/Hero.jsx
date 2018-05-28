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
	console.log(author, socials, taglines);
	return (
		<div className="swas-hero">
			<div className="swas-hero__title">
				<h1 className="swas-hero__author">{author}</h1>
				<h2 className="swas-hero__tagline">{taglines.join(' ')}</h2>
				<div className="swas-hero__socials">
					{Object.keys(socials).map(s => (
						<a
							className="swas-hero__social"
							key={s}
							href={socials[s]}
						>
							<FontAwesomeIcon icon={['fab', s]} />
						</a>
					))}
				</div>
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
