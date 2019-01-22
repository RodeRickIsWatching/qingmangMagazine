// pages/user/user.js
import {likeModel} from "../../models/liked";
import {randomStr} from "../../utils/getRandom";

const lM = new likeModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleList: [],
        ifAuth: false
    },
    _init() {
        this.setData({
            articleList: []
        })
    },
    onGetMarkList(e) {
        if(e){
            this.setData({
                ifAuth: e.detail.ifAuth
            })
        }
        //    授权完成，获取mark列表
        let articleList = lM.getLikeList()
        this._setData(articleList)
    },
    _setData(articleList) {
        this.setData({
            articleList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        if (this.data.ifAuth) {
            this.onGetMarkList()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        //由于允许在user页面中对item进行like操作，因此需要重新渲染
        this._init();
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