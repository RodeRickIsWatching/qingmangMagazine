// components/pageIndex/articleLists/childCmps/nineImg/cmp.js
import {myBeh} from "../../../../behaviors/behaviors";

Component({
    behaviors: [myBeh],
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        showImg(e) {
            let _index = e.currentTarget.dataset.index;
            let _arr = this.properties.imgArray;
            wx.previewImage({
                urls: _arr,
                current: _arr[_index]
            })
        }
    }
})
