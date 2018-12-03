import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTopicContentPagination = (params) => {
    let url = 'article/get-article-by-page';
    let type = 'LIST_TOPIC_CONTENT_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTopicContent = (params) => {
    let url = '/article/insert'
    let type = 'INSERT_TOPIC_CONTENT'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateTopicContent = (params) => {
    let url = '/article/update'
    let type = 'UPDATE_TOPIC_CONTENT'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTopicContentById = (params) => {
    let url = '/article/get-article-by-id?article_id=' + params
    let type = 'GET_TOPIC_CONTENT_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteTopicContent = (params) => {
    let url = '/article/delete'
    let type = 'DELETE_TOPIC_CONTENT'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeTopicContent = (params) => {
    let url = '/article/remove'
    let type = 'REMOVE_TOPIC_CONTENT'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreTopicContent = (params) => {
    let url = '/article/restore'
    let type = 'RESTORE_TOPIC_CONTENT'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchTopicContent = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_TOPIC_CONTENT',
        data: obj
    }
}

