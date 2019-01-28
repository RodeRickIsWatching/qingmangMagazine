// pages/weather/weather.js
import {getLocation} from "../../models/getLocation";
import {getWeatherModel} from "../../models/getWeather";
// import {getIcon} from "../../utils/weatherIcon";

const gW = new getWeatherModel()
const gL = new getLocation()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _address: '',
        _city: '',
        _des: '',
        _today: [],
        _futureByHour: [],
        _futureByDate: [],
        _todayAndTommorrow: [],
        _completeFlag: false,
        _bgSrc: '',
        _fontColor: '',
    },
    onChooseLoaction() {
        wx.getLocation({
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success: res => {
                const latitude = res.latitude
                const longitude = res.longitude
                wx.chooseLocation({
                    success: res => {
                        console.log(res)
                        this.getLocation(res.latitude, res.longitude)
                    }
                })
            }
        })
    },
    sucCB(_param) {
        let self = this
        gL._getAddress(_param)
        //获取具体地址和城市
            .then(res => {
                let _city = res.addressComponent.province;
                let _address = res.formatted_address
                this.setLoation({_address, _city})

                gW.getWeather(_city).then(res => {
                    //获取今天和未来几天的天气
                    this.chargeByDate(res.forecast)
                    this.setDes(res.ganmao)
                })
                gW.getRealTimeWeather(_city).then(res => {
                    //获取今天到凌晨12点的天气
                    this.chargeByHours(res)
                })
                gW.getTodayWeather(_city).then(res => {
                    //获取实时天气
                    let _time = new Date()
                    let _hours = _time.getHours() < 10 ? '0'+_time.getHours(): _time.getHours()
                    let _minutes = _time.getMinutes() < 10 ? '0'+_time.getMinutes(): _time.getMinutes()
                    let _temp = `${_hours}: ${_minutes}`
                    let _tempObj = {temp: res.temp_curr, time:_temp ,weather: res.weather_curr}
                    this.chooseBg(res.weather_curr)
                    this.setNowWeather([_tempObj])
                })
            })
    },
    getLocation(_latitude = '', _longitude = '') {
        this.changeStatus(false)
        wx.getLocation({
            //获取地址经纬度
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success: res => {
                let latitude = _latitude || res.latitude
                let longitude = _longitude || res.longitude
                let _param = `${longitude},${latitude}`

                this.sucCB(_param)
            }
        })
        this._judgeStatus()

    },
    _judgeStatus() {
        //由于接口速度有快有慢，为了使得数据统一呈现
        new Promise((res, rej) => {
            //    判断数据是否都接收完毕
            for (let i in this.data) {
                if (this.data.hasOwnProperty(i) && i !== "_completeFlag") {
                    if (typeof this.data[i] != "object") {
                        //原始值
                        if (!this.data[i]) {
                            rej()
                            return
                        }
                    } else {
                        //引用值
                        if (Object.keys(this.data[i]).length == 0) {
                            rej()
                            return
                        }
                    }
                }
            }
            res()
        }).then(res => {

            this.changeStatus(true)
        }).catch(rej => {
            //说明此时有的数据还没有赋值完毕或接收完毕，每500ms判断一次
            //尝试直接使用promise但是失败
            setTimeout(() => {
                this._judgeStatus()
            }, 500)
        })
    },
    _getSize() {
        wx.getSystemInfo({
            success: res => {
                console.log(res)
                this.setData({
                    _height: 1334 + 'rpx'
                })
            }
        })
    },
    changeStatus(_completeFlag) {
        this.setData({
            _completeFlag
        })
    },
    chooseBg(_target) {
        let bgArr = ["晴", "云", "阴", "雨", "雪"];
        let temp = '';
        temp = bgArr.filter(item => {
            return _target.includes(item)
        })
        let bgObj = {
            "晴": 100,
            "云": 103,
            "阴": 101,
            "雨": 30,
            "雪": 30
        }
        let _fontColorObj = {
            "晴": '#000',
            "云": '#000',
            "阴": '#fff',
            "雨": '#fff',
            "雪": '#fff'
        }


        let _bgSrc = `/images/bg/${bgObj[temp]}.jpg`
        let _fontColor = _fontColorObj[temp]
        this.setData({
            _bgSrc,
            _fontColor
        })
    },
    chargeByDate(_arr) {
        _arr.forEach((item, index) => {
            item.date = item.date.split("日")[1];
            item.date = item.date.replace("星期", "周");
            item.high = item.high.split(" ")[1];
            item.low = item.low.split(" ")[1];
            item.fengxiang = item.fengxiang.replace("持续", "")
        })
        this.setTodayAndTomorrow([_arr[0], _arr[1]])

        this.setFutureWeatherByDate(_arr)
    },
    fangZha(_status = false) {
        let temp = ''
        if (_status) {
            let date = new Date()
            let temp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        return [{
            "temp": "2",
            "time": `${temp} 02:00`,
            "weather": "晴"
        }, {
            "temp": "4",
            "time": `${temp} 05:00`,
            "weather": "晴"
        }, {
            "temp": "7",
            "time": `${temp} 08:00`,
            "weather": "晴"
        }, {
            "temp": "13",
            "time": `${temp} 11:00`,
            "weather": "晴"
        }, {
            "temp": "15",
            "time": `${temp} 14:00`,
            "weather": "晴"
        }, {
            "temp": "11",
            "time": `${temp} 17:00`,
            "weather": "晴"
        }, {
            "temp": "8",
            "time": `${temp} 20:00`,
            "weather": "晴"
        }, {
            "temp": "5",
            "time": `${temp} 23:00`,
            "weather": "多云"
        }]
    },
    chargeByHours(_arr) {
        //防炸操作！
        _arr.forEach(item => {
            if (Object.is(item, null)) {
                console.log("防诈")
                item = this.fangZha(true)
            }
        })
        //过滤值，这里对时间的处理不好，以后要修改，即先转换成毫秒值再转换为具体日期
        let _time = new Date();
        let _month = _time.getMonth() + 1;
        let _date = _time.getDate();
        let _templateStr = `${_time.getFullYear()}-${_month < 10 ? '0' + _month : _month}-${_date < 10 ? '0' + _date : _date}`
        let tempArr = _arr.filter((item, index) => {
            //过滤非今天的天气预报并处理时间 xxxx-xx-xx 00:00:00 -> 00:00
            let _tempStr = item.time.split(' ')[0];
            let temp = item.time.split(' ')[1].slice().split('');
            temp.splice(-3, 3);
            item["time"] = temp.join('');
            return _templateStr === _tempStr
        })
        //防诈！
        if (!tempArr.length > 0) {
            tempArr = this.fangZha()
        }

        //传值
        if (tempArr.length > 2) {
            tempArr.shift()
        }
        this.setFutureWeatherByHour(tempArr)

    },
    setDes(_des) {
        this.setData({
            _des
        })
    },
    setTodayAndTomorrow(_todayAndTommorrow) {
        this.setData({
            _todayAndTommorrow
        })
    },
    setNowWeather(_today) {
        this.setData({
            _today
        })
    },
    setFutureWeatherByDate(_futureByDate) {
        this.setData({
            _futureByDate
        })
    },
    setFutureWeatherByHour(_futureByHour) {
        this.setData({
            _futureByHour
        })
    },

    setLoation({_address, _city}) {
        this.setData({
            _address,
            _city
        })
    },
    showMsg() {
        wx.showToast({
            title: '获取地址信息中',
            icon: 'loading'
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLocation();

        // this.getLocation()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this._getSize()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getLocation()
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 500)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})