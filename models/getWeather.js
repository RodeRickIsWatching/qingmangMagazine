class getWeatherModel {
    constructor() {
        this.baseUrl = "http://wthrcdn.etouch.cn/weather_mini?city="
        this.realTimeBaseUrl = "http://api.help.bj.cn/apis/weather36h?id="
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