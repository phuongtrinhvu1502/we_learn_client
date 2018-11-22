import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewQAById = (params) => {
    let url = '/qa/view-qa-by-id?qa_id=' + params
    let type = 'VIEW_QA_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const postComment = (params) => {
    let url = '/qa/post-comment'
    let type = 'POST_COMMENT_QA'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const editComment = (params) => {
    let url = '/qa/edit-comment'
    let type = 'EDIT_COMMENT_QA'
    return requestPutJsonReturnDispatch(url, params, type)
}
