
const initialState = {
    articleItem: {
        article_title: "Tieu de bai viet",
        article_content: "<div>Example <b>HTML</b> string</div>",
        listCommentByPage: [
            { user_id: 1, user_login: "hongpx", comment_id: 1, comment_content: "<div>Example <b>HTML</b> string</div>", created_date: "11-11-2018" },
            { user_id: 1, user_login: "hongpx", comment_id: 2, comment_content: "<div>Example <b>HTML</b> string</div>", created_date: "11-11-2018" },
            { user_id: 1, user_login: "hongpx", comment_id: 3, comment_content: "<div>Example <b>HTML</b> string</div>", created_date: "11-11-2018" },
            { user_id: 1, user_login: "hongpx", comment_id: 4, comment_content: "<div>Example <b>HTML</b> string</div>", created_date: "11-11-2018" },
        ],
        total: 4,
    },
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
const viewArt = (state = initialState, action = {}) => {
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
export default viewArt