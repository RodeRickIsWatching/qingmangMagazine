// components/pageIndex/articleLists/articleItem/cmp.js
import {likeModel} from "../../../../models/liked";

let lM = new likeModel();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        articleDetail: Object,
        articleIndex: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {
        likeStatus: false
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    lifetimes: {
        attached() {
            // 刚渲染页面时候，调取storage
            let arr = lM.getLikeList()
            arr.forEach((item, index) => {
                if (this.properties.articleIndex == item.artId) {
                    this.setData({
                        likeStatus: true
                    })
                }
            })
        }
    }
})
