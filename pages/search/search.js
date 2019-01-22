// pages/search/search.js
import {_Ajax} from "../../models/requests";
import {randomStr} from "../../utils/getRandom";

const _ajax = new _Ajax()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchWord: '读书',
        result: '',
        articleList: '',
        getMore: ''
    },
    /**
     * 获取推荐列表
     * */
    getData(_word) {
        let searchArticleRecommend = _ajax.searchArticleRecommend(_word)
        let searchArticleList = _ajax.searchArticleList(_word)
        Promise.all([searchArticleRecommend, searchArticleList]).then(res => {
            this.setResult([res[0].data],res[1].data.data)
            console.log(res[1].data.data)
        })
    },
    setResult(result, articleList) {
        this.setData({
            result,
            articleList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let searchWord = options.searchWord || this.data.searchWord
        this.setData({
            searchWord
        })

        this.getData(searchWord)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            getMore: randomStr()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})