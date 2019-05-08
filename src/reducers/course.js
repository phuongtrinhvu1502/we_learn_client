
const initialState = {
    courseItem: {},
    listCourse: [],
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    countFetchById: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const course = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_COURSE_PAGINATION':
            return {
                ...state, listCourse: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_COURSE_BY_ID':
            return {
                ...state, courseItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_COURSE':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'UPDATE_COURSE':
            return { ...state, actionName: 'update', countUpdate: state.countUpdate + 1, }
        case 'DELETE_COURSE':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'REMOVE_COURSE':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_COURSE':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        case 'SET_LAST_SEARCH_COURSE':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default course