import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewArticleById = (params) => {
    let url = '/atc/view-article-by-id?atc_id=' + params
    let type = 'VIEW_ARTICLE_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}
