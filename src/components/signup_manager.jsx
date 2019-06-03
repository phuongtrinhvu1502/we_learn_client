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
	componentWillReceiveProps(nextProps) {
		if (nextProps.countSignUp > this.props.countSignUp) {
			notification.success({
				message: 'Thành công',
				description: "Tạo tài khoản quản lý thành công"
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
				this.props.signUpManager(values)
			} else {
				scrollToErrorForm(err)
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem key="full_name">
					{getFieldDecorator('full_name', {
						rules: [{ required: true, message: 'Please input your Full Name!' }],
					})(
						<Input placeholder="Full name" />
					)}
				</FormItem>
				<FormItem key="user_login">
					{getFieldDecorator('user_login', {
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
				<FormItem key="email">
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your Email!' }],
					})(
						<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="Email" placeholder="Email" />
					)}
				</FormItem>
				<FormItem key="remember">
					<Button type="primary" htmlType="submit" className="login-form-button">
						Sign Up
				</Button>
				</FormItem>
			</Form>
		)
	}
}
const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm;
