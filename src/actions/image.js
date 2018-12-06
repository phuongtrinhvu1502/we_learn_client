import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listImagePagination = (params) => {
    let url = 'image/get-image-by-page';
    let type = 'LIST_IMAGE_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertImage = (params) => {
    let url = '/document/insert'
    let type = 'INSERT_IMAGE'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const deleteImage = (params) => {
    let url = '/image/delete'
    let type = 'DELETE_IMAGE'
    return requestDeleteJsonReturnDispatch(url, params, type)
}
