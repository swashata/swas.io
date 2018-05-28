import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-tomorrow.css';

import '../components/fontawesome';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import './all.scss';

const TemplateWrapper = ({ data, location, children }) => {
	console.log(location);
	if (location.pathname === '/') {
		return (
			<div className="home-page">
				<Helmet title={data.site.siteMetadata.title} />
				<Hero data={data} />
				<Navbar />
				<div className="home-page__blog">{children()}</div>
			</div>
		);
	}
	return (
		<div>
			<Helmet title={data.site.siteMetadata.title} />
			<Navbar />
			<div>{children()}</div>
		</div>
	);
};

TemplateWrapper.propTypes = {
	children: PropTypes.func.isRequired,
	location: PropTypes.objectOf(PropTypes.any).isRequired,
	data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TemplateWrapper;

export const query = graphql`
	query HomePageQuery {
		site {
			siteMetadata {
				title
				author
				socials {
					twitter
					github
					linkedin
				}
				taglines
			}
		}
	}
`;
