// components/pageCatalog/searchBox/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        word: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onBlur(e) {
            let val = e.detail.value
            this.setData({
                word: val
            })
        },
        onSearch(e) {
            let value = e.detail.value || e.currentTarget.dataset.word || this.data.word
            if (value !== "读书") {
                wx.showToast({
                    title: '只能搜索 读书 哦~',
                    icon: 'none'
                })
                return
            }
        },
    }

})
