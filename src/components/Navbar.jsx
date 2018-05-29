import React from 'react';
import Link from 'gatsby-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.scss';

class Navbar extends React.PureComponent {
	state = {
		isOpen: false,
	};

	toggleNavbar = e => {
		e.preventDefault();
		this.setState(state => ({ isOpen: !state.isOpen }));
	};

	render() {
		const burgerClass = `navbar-burger ${
			this.state.isOpen ? 'is-active' : ''
		}`;
		const menuClass = `navbar-menu ${this.state.isOpen ? 'is-active' : ''}`;
		return (
			<nav className="navbar is-transparent swas-navbar">
				<div className="container">
					<div className="navbar-brand">
						<Link
							to="/"
							className="navbar-item navbar-item--site-title"
						>
							Swas.io
						</Link>
						{/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}
						<a
							role="button"
							className={burgerClass}
							aria-label="menu"
							aria-expanded="false"
							onClick={this.toggleNavbar}
						>
							<span aria-hidden="true" />
							<span aria-hidden="true" />
							<span aria-hidden="true" />
						</a>
						{/* eslint-enable */}
					</div>
					<div className={menuClass}>
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
				</div>
			</nav>
		);
	}
}

export default Navbar;
