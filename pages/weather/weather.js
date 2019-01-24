// pages/weather/weather.js
import {getLocation} from "../../models/getLocation";
import {getWeatherModel} from "../../models/getWeather";
import {getIcon} from "../../utils/weatherIcon";

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
        _completeFlag: false
    },
    getLocation() {
        this.changeStatus(false)
        wx.getLocation({
            //获取地址经纬度
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success: res => {
                let latitude = res.latitude
                let longitude = res.longitude
                let _param = `${longitude},${latitude}`

                gL._getAddress(_param)
                //获取具体地址和城市
                    .then(res => {
                        let _city = res.addressComponent.province;
                        let _address = res.formatted_address
                        this.setLoation({_address, _city})

                        gW.getWeather(_city).then(res => {
                            console.log(res)
                            //获取今天和未来几天的天气
                            this.chargeByDate(res.forecast)
                            this.setDes(res.ganmao)
                        })
                        gW.getRealTimeWeather(_city).then(res => {
                            //获取今天到凌晨12点的天气
                            this.chargeByHours(res)
                        })
                    })
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
            console.log(1234)
            this.changeStatus(true)
        }).catch(rej => {
            //说明此时有的数据还没有赋值完毕或接收完毕，每500ms判断一次
            //尝试直接使用promise但是失败
            setTimeout(() => {
                this._judgeStatus()
            }, 500)
        })
    },
    changeStatus(_completeFlag) {
        this.setData({
            _completeFlag
        })
    },
    chargeByDate(_arr) {
        _arr.forEach((item, index) => {
            item.date = item.date.split("日")[1];
            item.date = item.date.replace("星期","周");
            item.high = item.high.split(" ")[1];
            item.low = item.low.split(" ")[1];
            item.fengxiang = item.fengxiang.replace("持续","")
        })
        this.setTodayAndTomorrow([_arr[0], _arr[1]])
        this.setFutureWeatherByDate(_arr)
    },
    chargeByHours(_arr) {
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

        //传值
        this.setIcon(tempArr[0].weather)
        this.setNowWeather([tempArr[0]])
        tempArr.shift()
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
    setIcon(_weather) {
        let weatherIcon = getIcon(_weather)
        this.setData({
            weatherIcon
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
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },500)
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