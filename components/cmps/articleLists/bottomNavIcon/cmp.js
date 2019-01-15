// components/cmps/articleLists/bottomNavIcon/cmp.js
import {likeModel} from "../../../../models/liked";

let lM = new likeModel();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        articleIndex: String,
        likeStatus: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        addLikeList(key) {
            // 将like放到storage中模拟数据库传递数据
            lM.addLikeList(key)
        },
        removeLikeList(key) {
            lM.removeLikeList(key)
        },
        toggleSign(e) {
            // 切换like样式
            let _status = !e.currentTarget.dataset.likeStatus;
            let _index = e.currentTarget.dataset.index;
            this.setData({
                likeStatus: _status
            });
            // 针对不同情况添加调用不同的方法，初始化在articleItem组件中进行
            if (_status) {
                this.addLikeList(_index)
            } else {
                this.removeLikeList(_index)
            }
        },
        share() {
            wx.getShareInfo({})
        },
        showMenu() {
            let menuArr = ["内容过期了", `内容和${this.properties.tag}不相关`, `不再显示来自${this.properties.tag}的内容`];
            wx.showActionSheet({
                itemList: menuArr,
                success: res => {
                    const index = res.tapIndex;
                    if (index == 0 || index == 1) {
                        wx.showToast({
                            title: '已提交'
                        })
                    }
                }
            })
        }
    }
})
