import React from 'react';
import { renderRoutes } from 'react-router-config'
import asyncComponent from './async_component.jsx';
// import AppContainer from '../containers/app_container.jsx';
import App from '../components/app.jsx';
import cookie from 'react-cookies';


import {
	HashRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const lstPermission = cookie.load('lstPermission') || [];

const routes = [
	{
		path: '/',
		component: App,
		routes: [
			{
				path: '/',
				exact: true,
				component: asyncComponent(
					() => System.import('../containers/dashboard.jsx').then(module => module.default),
					{ name: 'index' }
				)
			},
			{
				path: '/dashboard',
				component: asyncComponent(
					() => System.import('../containers/dashboard.jsx').then(module => module.default),
					{ name: 'index' }
				)
			},
			{
				path: '/login',
				component: asyncComponent(() => System.import('../containers/login.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/grammar/present-tenses',
				component: asyncComponent(() => System.import('../containers/grammar/present_container.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-article',
				component: asyncComponent(() => System.import('../containers/adminPanel/postArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/not-found',
				component: (
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
				)
			}
		]
	}
]
const RouteRoot = () => (
	<Router>
		{renderRoutes(routes)}
	</Router>
)
export default RouteRoot