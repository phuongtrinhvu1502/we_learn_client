import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTestPagination = (params) => {
    let url = 'test/get-test-by-page';
    let type = 'LIST_TEST_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTest = (params) => {
    let url = '/test/insert'
    let type = 'INSERT_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateTest = (params) => {
    let url = '/test/update'
    let type = 'UPDATE_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTestById = (params) => {
    let url = '/test/get-test-by-id?test_id=' + params
    let type = 'GET_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteTest = (params) => {
    let url = '/test/delete'
    let type = 'DELETE_TEST'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeTest = (params) => {
    let url = '/test/remove'
    let type = 'REMOVE_TEST'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreTest = (params) => {
    let url = '/test/restore'
    let type = 'RESTORE_TEST'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchTest = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_TEST',
        data: obj
    }
}

