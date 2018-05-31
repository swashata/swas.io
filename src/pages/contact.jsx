import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Page from '../components/Page';

const Contact = ({ data }) => (
	<Page title="Contact Me" subtitle={data.site.siteMetadata.title}>
		<div style={{ maxWidth: '480px', marginBottom: '2rem' }}>
			<div className="notification is-danger">
				<p>
					Thanks for trying to reach me. Do note that if you have some
					questions regarding eForm{' '}
					<a href="https://codecanyon.net/item/eform-wordpress-form-builder/3180835/comments">
						Comments
					</a>{' '}
					is the best place. Need to ask something else? SHOOT 📢.
				</p>
			</div>
			<form method="post" netlify="true">
				<div className="field">
					<label htmlFor="name" className="label">
						Name
					</label>
					<div className="control has-icons-left">
						<input
							type="text"
							name="name"
							id="name"
							defaultValue=""
							placeholder="Full name"
							className="input"
							required
						/>
						<span className="is-small is-left icon">
							<FontAwesomeIcon icon="user" />
						</span>
					</div>
				</div>
				<div className="field">
					<label htmlFor="email" className="label">
						Email
					</label>
					<div className="control has-icons-left">
						<input
							type="email"
							name="email"
							id="email"
							defaultValue=""
							placeholder="Full name"
							className="input"
							required
						/>
						<span className="is-small is-left icon">
							<FontAwesomeIcon icon="envelope" />
						</span>
					</div>
				</div>
				<div className="field">
					<label htmlFor="message" className="label">
						Message
					</label>
					<div className="control">
						<textarea
							name="message"
							id="message"
							className="textarea"
							defaultValue=""
							required
							placeholder="Enter your message"
						/>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<button
							className="button is-outlined"
							type="submit"
							style={{ display: 'block', width: '100%' }}
						>
							SEND
						</button>
					</div>
				</div>
			</form>
		</div>
	</Page>
);
Contact.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				title: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};

export default Contact;

export const contactQuery = graphql`
	query contactQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
