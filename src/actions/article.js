import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listArticlePagination = (params) => {
    let url = 'article/get-article-by-page';
    let type = 'LIST_ARTICLE_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertArticle = (params) => {
    let url = '/article/insert'
    let type = 'INSERT_ARTICLE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateArticle = (params) => {
    let url = '/article/update'
    let type = 'UPDATE_ARTICLE'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const fetchArticleById = (params) => {
    let url = '/article/get-article-by-id?id=' + params
    let type = 'GET_ARTICLE_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteArticle = (params) => {
    let url = '/article/delete'
    let type = 'DELETE_ARTICLE'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeArticle = (params) => {
    let url = '/article/remove'
    let type = 'REMOVE_ARTICLE'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreArticle = (params) => {
    let url = '/article/restore'
    let type = 'RESTORE_ARTICLE'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchArticle = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_ARTICLE',
        data: obj
    }
}

