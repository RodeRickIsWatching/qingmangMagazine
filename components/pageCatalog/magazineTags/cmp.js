// components/pageCatalog/magazineTags/cmp.js
import {subscriptionModel} from "../../../models/subscription";

const sub = new subscriptionModel();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tagInfoList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        triggerByCmp(e) {
            let _status = e.detail._ifSub
            if (_status) {
                let tagList = e.detail.tagList
                sub.addTagList(tagList)
            } else {
                let tagList = e.detail.tagList
                sub.removeTagList(tagList)
            }

            this.triggerEvent('refreshInfo', {}, {})
        }
    }
})
