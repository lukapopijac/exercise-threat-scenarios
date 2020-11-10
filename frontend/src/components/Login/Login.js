import React from 'react';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import './Login.css';
import openModal from '../../common/open-modal.js';


export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.form = React.createRef();
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		this.form.current[0].focus();
	}

	login(evt) {
		evt.preventDefault();

		let formData = new FormData(this.form.current);
		let {username, password} = Object.fromEntries(formData);

		const authenticationDetails = new AuthenticationDetails({
			Username: username,
			Password: password
		});
		const cognitoUser = new CognitoUser({
			Username: username,
			Pool: this.props.userPool
		});
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: result => {
				let idToken = result.getIdToken().getJwtToken();
				localStorage.setItem('jwt', idToken);
				localStorage.setItem('username', username);
				this.props.onSuccess();
			},
			onFailure: err => {
				openModal('Error', err.message);
			},
		})
	}

	render() {
		return (
			<div className="Login">
				<form ref={this.form} onSubmit={this.login}>
					<label>Username<br/>
						<input type="text" name="username"/>
					</label>
					<label>Password<br/>
						<input type="password" name="password"/>
					</label>
					<br/>
					<button type="submit">Log In</button>
				</form>
			</div>
		)
	}
}
