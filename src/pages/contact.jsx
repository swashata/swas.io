import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Recaptcha from 'react-google-recaptcha';

import Page from '../components/Page';

const RECAPTCHA_SITE_KEY = '6LcOq1wUAAAAALPCGwXixAbMHQuoUb_mP0G-ZPwK';

function encode(data) {
	return Object.keys(data)
		.map(
			key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
		)
		.join('&');
}

class Contact extends React.PureComponent {
	static propTypes = {
		data: PropTypes.shape({
			site: PropTypes.shape({
				siteMetadata: PropTypes.shape({
					title: PropTypes.string.isRequired,
				}).isRequired,
			}).isRequired,
			pageBG: PropTypes.shape({
				childImageSharp: PropTypes.object.isRequired,
			}).isRequired,
		}).isRequired,
	};

	state = {
		name: '',
		email: '',
		message: '',
		recaptcha: '',
		submitting: false,
		succeeded: false,
		error: '',
	};

	changeName = e => this.setState({ name: e.target.value });
	changeEmail = e => this.setState({ email: e.target.value });
	changeMessage = e => this.setState({ message: e.target.value });
	changeRecaptcha = value => this.setState({ recaptcha: value });

	handleFormSubmit = e => {
		e.preventDefault();
		const form = e.target;
		this.setState(
			() => ({ submitting: true }),
			() => {
				fetch('/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: encode({
						'form-name': form.getAttribute('name'),
						name: this.state.name,
						email: this.state.email,
						message: this.state.message,
						'g-recaptcha-response': this.state.recaptcha,
					}),
				})
					.then(() => {
						this.setState(() => ({
							submitting: false,
							succeeded: true,
							name: '',
							email: '',
							message: '',
						}));
					})
					.catch(error => {
						this.setState(() => ({
							submitting: false,
							succeeded: false,
							error,
						}));
					});
			}
		);
	};

	render() {
		const { data } = this.props;
		return (
			<Page
				title="Contact Me"
				subtitle={data.site.siteMetadata.title}
				hero={data.pageBG.childImageSharp}
			>
				<div style={{ maxWidth: '480px', margin: '0 auto 2rem auto' }}>
					<div className="notification is-danger">
						<p>
							Thanks for trying to reach me. Do note that if you
							have some questions regarding eForm{' '}
							<a href="https://codecanyon.net/item/eform-wordpress-form-builder/3180835/comments">
								Comments
							</a>{' '}
							is the best place. Need to ask something else? SHOOT
							📢.
						</p>
					</div>

					<form
						method="post"
						data-netlify="true"
						data-netlify-recaptcha="true"
						name="Contact"
						onSubmit={this.handleFormSubmit}
					>
						<div className="field">
							<label htmlFor="name" className="label">
								Name
							</label>
							<div className="control has-icons-left">
								<input
									type="text"
									name="name"
									id="name"
									value={this.state.name}
									onChange={this.changeName}
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
									value={this.state.email}
									onChange={this.changeEmail}
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
									value={this.state.message}
									onChange={this.changeMessage}
									required
									placeholder="Enter your message"
								/>
							</div>
						</div>
						<div className="field">
							<label htmlFor="bot" className="label">
								Recaptcha
							</label>
							<div className="control">
								<Recaptcha
									sitekey={RECAPTCHA_SITE_KEY}
									onChange={this.changeRecaptcha}
								/>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<button
									className="button is-outlined"
									type="submit"
									style={{
										display: 'block',
										width: '100%',
									}}
								>
									SEND
								</button>
							</div>
						</div>
					</form>
					{this.state.submitting && (
						<div
							className="notification is-warning has-text-centered"
							style={{ margin: '2rem 0' }}
						>
							<span className="icon">
								<FontAwesomeIcon
									icon="spinner"
									spin
									pulse
									fixedWidth
								/>
							</span>
							<span className="text">
								Submitting, Please wait.
							</span>
						</div>
					)}
					{!this.state.submitting &&
						this.state.succeeded && (
							<div
								className="notification is-success has-text-centered"
								style={{ margin: '2rem 0' }}
							>
								Thank you for getting in touch. I will try to
								get back to you soon. In the meanwhile, do sniff
								around 😉.
							</div>
						)}
					{!this.state.submitting &&
					!this.state.succeeded &&
					this.state.error ? (
						<div
							className="notification is-danger has-text-centered"
							style={{ margin: '2rem 0' }}
						>
							Sorry, something went wrong 😖. Maybe try again or
							get in touch directly{' '}
							<a href="https://twitter.com/swashata">@swashata</a>.
						</div>
					) : null}
				</div>
			</Page>
		);
	}
}

export default Contact;

export const contactQuery = graphql`
	query contactQuery {
		site {
			siteMetadata {
				title
			}
		}
		pageBG: file(relativePath: { eq: "contact.jpg" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				# Makes it trivial to update as your page's design changes.
				resolutions(width: 2500) {
					...GatsbyImageSharpResolutions_withWebp
				}
			}
		}
	}
`;
