// components/pageIndex/articleLists/articleList/cmp.js
import {_Ajax} from "../../../../models/requests"

const _ajax = new _Ajax();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        magazineId: Number,
        articleList: Array,
        getMore: {
            type: String,
            value: '',
            observer: 'loadMore'
        },
        refresh: {
            type: String,
            value: '',
            observer: 'loadRefresh'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        noMoreData: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadRefresh() {
            let _count = 5;
            this.sendAjax(_count).then(res => this.loadRefreshCb(res))
        },
        loadRefreshCb(res) {
            let len = res.data.data.length;
            if (len < 0) {
                this._refreshData(res.data.data)
                wx.showToast({
                    title: '已更新',
                    icon: 'success'
                })
            } else {
                wx.showToast({
                    title: '没有更新内容',
                    icon: 'loading'
                })
            }
        },
        loadMore() {
            //计算传递来的原始articleList的长度
            // 注：组件中data和properties没有特别明确的区别，这里的data写成properties也不会错
            //properties是初值由父级传入的data
            let _count = this.properties.articleList.length;
            //开启loading动画
            this._inLoading()
            //发送请求
            this.sendAjax(_count).then(res => this.loadMoreCb(res))
        },
        loadMoreCb(res) {
            let len = res.data.data.length;
            if (len > 0) {
                this._setData(res.data.data)
            } else {
                this._hasNoData()
            }
        },
        /**
         * 以下是工具方法
         * */
        _stopRefresh(timer = 0) {
            setTimeout(function () {
                wx.stopPullDownRefresh()
            }, timer)
        },
        sendAjax(_count) {
            /**一个是magazineId，另一个是第几条开始传递*/
            return _ajax.getArticleList(this.properties.magazineId, _count)
        },
        _refreshData(_data) {
            this.setData({
                articleList: _data
            })
        },
        _setData(_data) {
            //获取到新数组后，进行合并
            let temp = this.properties.articleList.concat(_data);
            this.setData({
                articleList: temp
            })
            //数据设置完毕后，关闭loading动画
            this._unLoading()
            this._hasData()
        },
        _hasData() {
            this.setData({
                noMoreData: false
            })
        },
        _hasNoData() {
            this.setData({
                noMoreData: true
            })
            this._unLoading()
        },
        _inLoading() {
            this.setData({
                loading: true
            })
        },
        _unLoading() {
            this.setData({
                loading: false
            })
        }
    },
})
