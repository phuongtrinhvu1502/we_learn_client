
const initialState = {
    articleItem: {},
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
const viewArt = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'VIEW_ARTICLE_BY_ID':
            return {
                ...state, articleItem: action.data.data ? action.data.data : {}, success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        default:
            return state;
    }
}
export default viewArt