// components/pageWeather/weather/cmp.js

Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        todayWeather: Array,
        address: String,
        des: String,
        weatherIcon: String,
        _todayAndTommorrow: Array

    },

    /**
     * 组件的初始数据
     */
    data: {},
    lifetimes: {},
    /**
     * 组件的方法列表
     */
    methods: {}
})
