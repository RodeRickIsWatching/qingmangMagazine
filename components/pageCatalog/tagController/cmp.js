// components/pageCatalog/tagController/cmp.js
import {subscriptionModel} from "../../../models/subscription";

let sub = new subscriptionModel()


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        tagId: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        class: 'common',
        myTagList: [],
        ifSub: false
    },
    lifetimes: {
        attached() {
            this.initTag()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        toggleClass() {
            if (this.data.class === "common") {
                this.setData({
                    class: '',
                    ifSub: true
                })
            } else {
                this.setData({
                    class: 'common',
                    ifSub: false
                })
            }
        },
        onTap() {
            this.toggleClass()
            let _index = this.properties.tagId;
            let _item = this.properties.tag;
            let _ifSub = this.properties.ifSub;
            let tagList = {tag: _item, tagId: _index}
            this.triggerEvent("tap", {tagList, _ifSub}, {})
        },
        getData() {
            let myTagList = sub.getTagList();
            this.setData({
                myTagList
            })
            return myTagList
        },
        initTag() {
            let myTagList = this.getData()
            myTagList.forEach((item, index) => {
                if (item.tagId == this.properties.tagId) {
                    this.toggleClass()
                }
            })
        }
    }
})
