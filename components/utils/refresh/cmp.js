// components/pageIndex/utils/refresh/cmp.js

Component({
    options: {
        multipleSlots: true,
        flag: false
    },
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        toView: 'content',
        flag: false,
        ifFirst: true,
        touching: false,
        _height: '0',//取值-220~0,-220是不出现refresh-box
        _top: 0,
        _status: 1,
        _lastScrollTop: 0,
    },
    lifetimes: {
        ready() {
            let self = this
            wx.nextTick(function () {
                self.scrollMove(self)
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onTouchStart(e) {
            this.setData({
                touching: true,
                _status: 1,
            })
        },
        onTouchEnd() {
            this.setData({
                touching: false
            })
            if (!this.data.touching && this.data._status === -1 && this.data.toView == "content" && !this.data.flag) {
                if (this.data._top <= 10) {
                    this.setData({
                        toView: 'refresh'
                    })
                    console.log("更新数据")
                    this.triggerEvent('refreshInfo', {}, {bubbles: true, composed: true})
                    this.delay(1000);
                } else {
                    this.delay(0);
                }
            }
        },
        toScroll(e) {

            this.data._top = e.detail.scrollTop;
            this.data._minus = this.data._top - this.data._lastScrollTop
            //判断是不是向下滑动
            if (this.data._top - this.data._lastScrollTop > 0) {
                this._setStatus(1)
            } else if (this.data._top - this.data._lastScrollTop < 0) {
                this._setStatus(-1)
            }
            this.data._lastScrollTop = this.data._top;
        },
        _setStatus(_status) {
            //    1是画面向下滑动，-1向上
            this.setData({
                _status: _status
            })
        },
        delay(timer) {
            let self = this;
            this.setData({
                flag: true
            });
            setTimeout(function () {
                self.scrollMove(self)
            }, timer)
        },
        scrollMove(self) {
            console.log(123)
            self.setData({
                toView: 'content',
                flag: false,
                _height: '0',
            })
        },
    }
})
