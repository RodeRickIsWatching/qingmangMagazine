// components/cmps/articleLists/articleItem/cmp.js
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
            // toString是因为存在内部的数据是String格式，也可以都转换成number
            let flag = arr.includes(this.properties.articleIndex.toString())
            if(flag){
                this.setData({
                    likeStatus: true
                })
            }
        }
    }
})
