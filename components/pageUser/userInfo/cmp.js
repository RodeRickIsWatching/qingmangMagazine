// components/pageUser/userInfo/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        userInfo: {},
        authorized: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onDeliverUserInfo(e) {
            //判断用户是否授权
            wx.getSetting({
                success: res => {
                    if (res.authSetting["scope.userInfo"]) {
                        //授权了
                        wx.getUserInfo({
                            success: res => {
                                this.setData({
                                    userInfo: res.userInfo,
                                    authorized: true
                                })
                                this.triggerEvent("getMarkList", {ifAuth: true}, {})
                            }
                        })
                    }
                }
            })
        }
    }
})
