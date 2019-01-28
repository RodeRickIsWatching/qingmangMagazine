// pages/index/index.js
import {_Ajax} from "../../models/requests"
import {randomStr} from "../../utils/getRandom";

const _ajax = new _Ajax();


Page({
    /**
     * 页面的初始数据
     */
    data: {
        articleList: [],
        markList: [],
        recommendInfo: {},
        getMore: '',
        magazineId: 0,
        loading: true,
        refresh: ''
    },
    _init() {
        this.setData({
            articleList: [],
            markList: [],
            recommendInfo: {},
            getMore: '',
            magazineId: 0,
            loading: true,
            refresh: ''
        })
        this.getData(this.magazineId)
    },
    /**
     * 发送请求，并保存值
     */
    getData(magazineId) {
        const articleList = _ajax.getArticleList(magazineId);
        const markList = _ajax.getMarkTypeList(magazineId);
        const recommendInfo = _ajax.getRecommendInfo(magazineId);
        Promise.all([articleList, markList, recommendInfo]).then(res => {
            this.setData({
                articleList: res[0].data.data,
                markList: res[1].data.data,
                recommendInfo: res[2].data.data
            })
        })
    },
    /**
     *自定义nav事件，用于切换nav对应的内容
     */
    onNav(e) {
        //获取点击的index，用于修改接口地址发送请求获取内容
        let _index = e.detail._index
        //重新渲染页面：重置数据（清空页面），跳转到顶部，重新获取
        this._setMagazindId(_index)
        this._resetData()
        this._scrollPageToTop()
        this.getData(this.data.magazineId);
    },
    _setMagazindId(magazineId) {
        this.setData({
            magazineId
        })
    },
    _resetData() {
        this.setData({
            articleList: [],
            markList: [],
            recommendInfo: {}
        })
    },
    _scrollPageToTop() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
    },
    /**
     * 自定义refresh事件
     *
     * */
    onRefreshInfo(e) {
        this.setData({
            refresh: randomStr()
        })
    },
    onPageScroll() {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._init();
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
        // console.log(this.data.articleList)
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
        this.setData({
            refresh: randomStr()
        })
        setTimeout(() => {
            wx.stopPullDownRefresh()
            this._init();
        }, 500)
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        } else {
            console.log(999)
        }
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123'
        }
    }
})