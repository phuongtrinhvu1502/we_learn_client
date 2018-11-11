
const initialState = {
    articleItem: {},
    listArticle: [],
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
const article = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'VIEW_ARTICLE_BY_ID':
            return {
                ...state, listArticle: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'POST_COMMENT_ARTICLE':
            return { ...state, actionName: 'postComment', countUpdate: state.countUpdate + 1, }
        case 'EDIT_COMMENT_ARTICLE':
            return { ...state, actionName: 'editComment', countUpdate: state.countUpdate + 1, }
        default:
            return state;
    }
}
export default article