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
			//Article
			// {
			// 	path: '/article/list-article',
			// 	component: asyncComponent(() => System.import('../containers/userPanel/listArticle.jsx')
			// 		.then(module => module.default), { name: 'name' })
			// },
			{
				path: '/article/view-article/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/viewArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//Grammar
			{
				path: '/grammar/:id?',
				component: asyncComponent(() => System.import('../containers/grammar/grammar_container.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control Article
			{
				path: '/system-control/list-article',
				component: asyncComponent(() => System.import('../containers/adminPanel/listArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-article/:id?',
				component: asyncComponent(() => System.import('../containers/adminPanel/postArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//List QA
			{
				path: '/forums/list-qa',
				component: asyncComponent(() => System.import('../containers/userPanel/list_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/forums/post-qa/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/post_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/forums/view-qa/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/view_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//Image
			// {
			// 	path: '/system-control/list-image',
			// 	component: asyncComponent(() => System.import('../containers/adminPanel/listImage.jsx')
			// 		.then(module => module.default), { name: 'name' })
			// },
			{
				path: '/system-control/upload-image',
				component: asyncComponent(() => System.import('../containers/adminPanel/uploadImg.jsx')
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