// components/pageIndex/navBar/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        magazineId: 'magazine0',
        magazineArr: ["轻芒", "兴趣", "物质", "世界", "新事", "灵魂"],
        magazineIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            let _index = e.currentTarget.dataset.index
            this.setData({
                magazineIndex: _index,
                //注意：为了防止不能回弹到最左边第一个nav，要设置-1操作
                magazineId: `magazine${_index - 1}`
            })

            //nav组件
            this.triggerEvent("nav", {
                _index
            }, {})
        }
    }
})
