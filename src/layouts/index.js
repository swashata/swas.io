import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-tomorrow.css';

import '../components/fontawesome';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import './all.scss';

const TemplateWrapper = ({ data, location, children }) => {
	let content;
	const {
		site: {
			siteMetadata: {
				title,
				description,
				image,
				twitterHandle,
				author,
				url,
			},
		},
	} = data;
	const helmet = (
		<Helmet>
			<meta httpEquiv="X-UA-Compatible" content="chrome=1" />
			<meta name="HandheldFriendly" content="True" />
			<meta name="MobileOptimized" content="320" />
			<meta name="referrer" content="no-referrer-when-downgrade" />
			<meta name="generator" content="gatsbyjs" />
			<meta name="theme-color" content="#EDE7F6" />

			<title>{title}</title>

			<meta name="description" content={description} />

			<meta name="author" content={author} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={twitterHandle} />
			<meta name="twitter:creator" content={twitterHandle} />

			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={image} />
			<meta property="og:description" content={description} />
		</Helmet>
	);
	if (location.pathname === '/') {
		content = (
			<div className="home-page">
				{helmet}
				<Hero data={data} />
				<Navbar />
				<div className="home-page__blog">{children()}</div>
			</div>
		);
	} else {
		content = (
			<div className="non-home-page">
				{helmet}
				<Navbar />
				<div>{children()}</div>
			</div>
		);
	}
	return (
		<React.Fragment>
			{content}
			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						Made with{' '}
						<span role="img" aria-label="love">
							❤️
						</span>{' '}
						by <span className="text-accent">Swashata Ghosh</span>{' '}
						with <a href="https://www.gatsbyjs.org/">Gatbsy</a> and{' '}
						<a href="https://www.netlify.com/">Netlify</a>. The
						source code is licensed{' '}
						<a href="http://opensource.org/licenses/mit-license.php">
							MIT
						</a>. The website content is licensed{' '}
						<a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
							CC BY NC SA 4.0
						</a>.
					</p>
					<p>
						Photos are used with permission from{' '}
						<a href="https://somrajsahu.com/">Somraj Sahu</a>. Ninja{' '}
						Icon made by{' '}
						<a
							rel="noopener noreferrer nofollow"
							href="http://www.freepik.com"
							title="Freepik"
						>
							Freepik
						</a>{' '}
						from{' '}
						<a
							rel="noopener noreferrer nofollow"
							href="https://www.flaticon.com/"
							title="Flaticon"
						>
							www.flaticon.com
						</a>{' '}
						is licensed by{' '}
						<a
							href="http://creativecommons.org/licenses/by/3.0/"
							title="Creative Commons BY 3.0"
							target="_blank"
							rel="noopener noreferrer"
						>
							CC 3.0 BY
						</a>
					</p>
				</div>
			</footer>
		</React.Fragment>
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
				description
				image
				twitterHandle
				author
				url
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
