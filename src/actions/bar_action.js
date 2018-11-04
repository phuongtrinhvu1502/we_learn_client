
import axios from 'axios';

import {requestPostJson} from './index.js';
// import {configUrl} from './config.js';
// export const api_url = configUrl;


export const login = (username,password) =>{
	var params = {
			username: username,
			password: password
		},url = 'login';
	return dispatch => {
		requestPostJson(url,params,function(response){
			if(response.status === 200) {
				if(response.data.success)
					dispatch({
						type: 'LOGIN_SUCCESS',
						data: response.data.data,
						token: response.headers.authorization,
						lstPermission: response.data.lstPermission
					});
				else{
					dispatch({
						type: 'LOGIN_FAIL',
						msg: response.data.msg
					});
				}
				
			}
			else {
				alert("Wrong username or password")
			}
		})
	}
}
export const logout = () =>{
	var params = {}
	var url = 'logout'
	return dispath =>{
		requestPostJson(url,params,function(response){
			dispath ({
				type: 'LOGOUT',
				data: response.data
			})
		})
	}
}
export const sidebarCollapse = () =>{
	return{
		type: 'SIDEBAR_COLLAPSE'
	}
}
export const resetStoreBar = () =>{
	return {
		type: 'RESET_STORE_BAR'
	}
}