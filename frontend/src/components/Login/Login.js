import React from 'react';
import './Login.css';
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

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

		console.log(username, password);

		if(username=='aaa') {
			localStorage.setItem('jwt', 'bla');
			localStorage.setItem('username', username);
			this.props.onSuccess();
		}

		// const poolData = {
		// 	UserPoolId: 'us-west-2_9rkRbB2Vn',
		// 	ClientId: '7q73kj26651bkg4t3peu4v3m4q'
		// };
		// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
		// const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
		// 	Username: username,
		// 	Password: password
		// });
		// const userData = {
		// 	Username: username,
		// 	Pool: userPool
		// };
		// const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
		// cognitoUser.authenticateUser(authenticationDetails, {
		// 	onSuccess: result => {
		// 		let idToken = result.getIdToken().getJwtToken();
		// 		localStorage.setItem('jwt', idToken);
		// 		localStorage.setItem('username', username);
		// 		this.props.onSuccess();
		// 	},
		// 	onFailure: err => {
		// 		console.log(err);
		// 	},
		// })
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
