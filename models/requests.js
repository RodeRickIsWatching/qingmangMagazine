/**
 * 该文件中是发送请求的集合，即所有发送请求都在这被封装成方法
 */
import {ajaxRequest} from "../utils/request"

class _Ajax extends ajaxRequest {
    // 杂志列表：articleList
    getArticleList(magazineId = 0, start = 0) {
        // 1.由于继承了ajaxRequest，所以不用使用new，直接使用this即可 
        // const _ajax = new ajaxRequest();
        // 2.同步操作可以使用try-catch来解决错误，像发送请求这种异步操作通过fail回调即可
        return this._request({url: `/getIndexArticleList/${magazineId}/${start}`})
    }

    // 推荐信息：recommendInfo
    getRecommendInfo(magazineId = 0) {
        return this._request({
            url: `/getRecommendInfo/${magazineId}`
        })
    }

    // tag列表: markTypeList
    getMarkTypeList(magazineId = 0) {
        return this._request({
            url: `/getMarkTypeList/${magazineId}`
        })
    }

    // 搜索文章列表：searchArticleList
    searchArticleList(searchText = '读书') {
        return this._request({
            url: `/searchArticleList/${searchText}`
        })
    }

    // 搜索推荐文章：searchArticleRecommend
    searchArticleRecommend(searchText = '读书', count = 0) {
        return this._request({
            url: `/searchArticleRecommend/${searchText}/${count}`
        })
    }
}

export {_Ajax}