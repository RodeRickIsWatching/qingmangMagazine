class getWeatherModel {
    constructor() {
        this.baseUrl = "http://wthrcdn.etouch.cn/weather_mini?city="
        this.realTimeBaseUrl = "http://api.help.bj.cn/apis/weather36h?id="
        this.todayBaseUrl = "http://api.k780.com/?app=weather.today&format=json&appkey=39846&sign=570051ca7fef5354b30bed3d363a2c62&weaid="
    }

    _returns(url, _successCb) {
        return new Promise(resolve => {
            wx.request({
                url, method: "GET", success: (res) => {
                    _successCb(res, resolve)
                }
            })
        })
    }

    getWeather(_param) {
        let url = this.baseUrl + _param
        return new Promise(resolve => {
            wx.request({
                url,
                method: "GET",
                success: res => {
                    if (res.data && res.data.status == 1000) {
                        resolve(res.data.data)
                    }
                }
            })
        })
    }

    getTodayWeather(_city) {
        let url = this.todayBaseUrl + _city.replace("市", "")
        // let _success = (res,resolve) => {
        //     resolve(console.log(111, res))
        // }
        return new Promise(resolve => {
            wx.request({
                url,
                method: "GET",
                success: (res) => {
                    if(res.data.success==1){
                        resolve(res.data.result)
                    }
                }
            })
        })
    }

    getRealTimeWeather(_param) {
        let url = this.realTimeBaseUrl + _param
        return new Promise(resolve => {
            wx.request({
                url,
                method: "GET",
                success: res => {
                    if (res.data && res.data.status == "0") {
                        resolve(res.data.weather36h)
                    }
                }
            })
        })
    }
}

export {getWeatherModel}