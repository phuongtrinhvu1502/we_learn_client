import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewWritingTestById = (params) => {
    let url = '/qa/view-qa-by-id?qa_id=' + params
    let type = 'VIEW_WRITING_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const postComment = (params) => {
    let url = '/qa-comment/insert'
    let type = 'POST_COMMENT_WRITING_TEST_QA'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const editComment = (params) => {
    let url = '/qa-comment/update'
    let type = 'EDIT_COMMENT_WRITING_TEST_QA'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const listCommentByPage = (params) => {
    let url = '/qa-comment/list-comment-by-page'
    let type = 'LIST_COMMENT_WRITING_TEST_BY_PAGE'
    return requestPostJsonReturnDispatch(url, params, type)
}
