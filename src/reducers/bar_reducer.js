const initialState = {
	activeSidebar: false,
	token: '',
	lstPermission: [],
	userInfo: {},
	loginSuccess: false,
	loginFail: false,
	msg: '',
	logoutSuccess: false
}
const bar_reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'SIDEBAR_COLLAPSE':
			return { ...state, activeSidebar: !state.activeSidebar, }
		case 'LOGIN_SUCCESS':
			return {
				...state, token: action.token, userInfo: action.data,
				lstPermission: action.lstPermission, loginSuccess: true,
			}
		case 'LOGIN_FAIL':
			return { ...state, msg: action.msg, loginFail: true, loginSuccess: false, }
		case 'LOGOUT':
			return { ...state, msg: action.data, logoutSuccess: true, }
		case 'RESET_STORE_BAR':
			return state = initialState
		default:
			return state;
	}
}
export default bar_reducer