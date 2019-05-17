import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listCoursePagination = (params) => {
    let url = 'course/get-course-by-page';
    let type = 'LIST_COURSE_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertCourse = (params) => {
    let url = '/course/insert'
    let type = 'INSERT_COURSE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateCourse = (params) => {
    let url = '/course/update'
    let type = 'UPDATE_COURSE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchCourseById = (params) => {
    let url = '/course/get-course-by-id?course_id=' + params
    let type = 'GET_COURSE_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteCourse = (params) => {
    let url = '/course/delete'
    let type = 'DELETE_COURSE'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeCourse = (params) => {
    let url = '/course/remove'
    let type = 'REMOVE_COURSE'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreCourse = (params) => {
    let url = '/course/restore'
    let type = 'RESTORE_COURSE'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchCourse = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_COURSE',
        data: obj
    }
}

