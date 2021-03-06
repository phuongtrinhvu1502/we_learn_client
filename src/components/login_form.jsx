import React, { Component } from 'react';

import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Button, notification, Icon, Form, Input, Checkbox } from 'antd';
import { scrollToErrorForm } from '../actions/reuse_action/reuse';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		let token = cookie.load('token')
		if (token != undefined && token != '') {
			this.props.history.push('/')
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.loginSuccess) {
			var token = nextProps.token;
			cookie.save('token', token, { path: '/' });
			cookie.save('lstPermission', nextProps.lstPermission);
			cookie.save('userInfo', nextProps.userInfo);
			window.location.reload();
			this.props.history.push('/');
		}
		if (nextProps.loginFail) {
			this.props.resetStoreBar()
			notification.error({
				message: 'Login loginFail',
				description: nextProps.msg
			});

		}
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let username = values.userName
				let password = values.password
				this.setState({
					username: '',
					password: ''
				})
				this.props.login(username, password)
			} else {
				scrollToErrorForm(err)
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem key="userName">
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem key="password">
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem key="remember">
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
					<a className="login-form-forgot" href="">Forgot password</a>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
				</Button>
					Or <a href="">register now!</a>
				</FormItem>
			</Form>
		)
	}
}
const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm;
