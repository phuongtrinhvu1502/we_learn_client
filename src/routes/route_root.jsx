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
				path: '/resend-active-code',
				component: asyncComponent(() => System.import('../containers/resend_active_code.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/active-account',
				component: asyncComponent(() => System.import('../containers/active_user.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/sign-up',
				component: asyncComponent(() => System.import('../containers/signup.jsx')
					.then(module => module.default), { name: 'sign-up' })
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
				path: '/grammar/all-grammar',
				component: asyncComponent(() => System.import('../containers/grammar/grammar_container.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control article
			{
				path: '/system-control/list-article',
				component: asyncComponent(() => System.import('../containers/adminPanel/Topic/listArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-article/:id?',
				component: asyncComponent(() => System.import('../containers/adminPanel/Topic/postArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control user
			{
				path: '/system-control/list-user',
				component: asyncComponent(() => System.import('../containers/adminPanel/listUser.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control topic
			{
				path: '/system-control/list-article-topic',
				component: asyncComponent(() => System.import('../containers/adminPanel/Topic/listTopic.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-article-topic/:id?',
				component: asyncComponent(() => System.import('../containers/adminPanel/Topic/postTopic.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control Article topic content
			{
				path: '/system-control/list-atc',
				component: asyncComponent(() => System.import('../containers/adminPanel/listArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-atc/:id?',
				component: asyncComponent(() => System.import('../containers/adminPanel/postArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control Test
			{
				path: '/system-control/list-test',
				component: asyncComponent(() => System.import('../containers/adminPanel/listTest.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/system-control/post-test/:id?',
				component: asyncComponent(() => System.import('../containers/adminPanel/postTest.jsx')
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
			//List Test
			{
				path: '/test/list-test',
				component: asyncComponent(() => System.import('../containers/test/list_test.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/test/view-test/:id?',
				component: asyncComponent(() => System.import('../containers/test/view_test.jsx')
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