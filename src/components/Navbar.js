import React from 'react';
import Link from 'gatsby-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.scss';

const Navbar = () => (
	<nav className="navbar is-transparent swas-navbar">
		<div className="container">
			<div className="navbar-brand">
				<Link to="/" className="navbar-item navbar-item--site-title">
					Swas.io
				</Link>
			</div>
			<div className="navbar-start">
				<Link className="navbar-item" to="/blog/">
					Blog
				</Link>
				<Link className="navbar-item" to="/projects">
					Projects
				</Link>
				<Link className="navbar-item" to="/about">
					About
				</Link>
			</div>
			<div className="navbar-end">
				<a
					className="navbar-item"
					href="https://github.com/swashata/swas.io"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="icon">
						<FontAwesomeIcon icon={['fab', 'github']} />
					</span>
				</a>
			</div>
		</div>
	</nav>
);

export default Navbar;
