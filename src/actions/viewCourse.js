import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewCourseById = (params) => {
    let url = '/course/view-course-by-id?course_id=' + params
    let type = 'VIEW_COURSE_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const postComment = (params) => {
    let url = '/course-comment/insert'
    let type = 'POST_COMMENT_COURSE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const editComment = (params) => {
    let url = '/course-comment/update'
    let type = 'EDIT_COMMENT_COURSE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const listCommentCourseByPage = (params) => {
    let url = '/course-comment/list-comment-by-page'
    let type = 'LIST_COMMENT_COURSE_BY_PAGE'
    return requestPostJsonReturnDispatch(url, params, type)
}
