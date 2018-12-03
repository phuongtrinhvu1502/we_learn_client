
const initialState = {
    articleItem: {},
    listTopicContent: [],
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
const topicContent = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_TOPIC_CONTENT_PAGINATION':
            return {
                ...state, listTopicContent: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_TOPIC_CONTENT_BY_ID':
            return {
                ...state, articleItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_TOPIC_CONTENT':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'UPDATE_TOPIC_CONTENT':
            return { ...state, actionName: 'update', countUpdate: state.countUpdate + 1, }
        case 'DELETE_TOPIC_CONTENT':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'REMOVE_TOPIC_CONTENT':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_TOPIC_CONTENT':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        case 'SET_LAST_SEARCH_TOPIC_CONTENT':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default topicContent