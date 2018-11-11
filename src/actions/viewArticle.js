import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewArticleById = (params) => {
    let url = '/view-article/get-article-by-id?article_id=' + params
    let type = 'VIEW_ARTICLE_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const postComment = (params) => {
    let url = '/view-article/post-comment'
    let type = 'POST_COMMENT_ARTICLE'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const editComment = (params) => {
    let url = '/view-article/edit-comment'
    let type = 'EDIT_COMMENT_ARTICLE'
    return requestPutJsonReturnDispatch(url, params, type)
}
