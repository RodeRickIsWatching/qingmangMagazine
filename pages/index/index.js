// pages/index/index.js
import {_Ajax} from "../../models/requests"

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
        loading: true
    },
    /**
     * 发送请求，并保存值
     */
    getData(magazineId) {
        const articleList = _ajax.getArticleList(magazineId);
        const markList = _ajax.getMarkTypeList(magazineId);
        const recommendInfo = _ajax.getRecommendInfo(magazineId);
        Promise.all([articleList, markList, recommendInfo]).then(res => {
            console.log(res[0].data.data);
            this.setData({
                articleList: res[0].data.data,
                markList: res[1].data.data,
                recommendInfo: res[2].data.data
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(this.magazineId);
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