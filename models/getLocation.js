// var QQMapWX = require('../utils/qqmap-wx-jssdk.js');
// var qqmapsdk = new QQMapWX({
//     key: '535BZ-66IKK-SETJP-A7W32-T4RMO-PNFNR'
// });

class getLocation {
    constructor() {
        //要先写super()才能对父级进行修改，否则直接修改会报错
        // this.baseUrl = "https://apis.map.qq.com/ws/geocoder/v1/?"
        this.baseUrl = "https://restapi.amap.com/v3/geocode/regeo?"
        // this.key = "535BZ-66IKK-SETJP-A7W32-T4RMO-PNFNR"
        this.key = "e3d8674c72aa842bad71acfa8238cf2e"
    }

    /**
     * 传入内容规则：经度在前，纬度在后，经纬度间以“,”分割，经纬度小数点后不要超过 6 位。
     * 如果需要解析多个经纬度的话，请用"|"进行间隔，
     * 并且将 batch 参数设置为 true，最多支持传入 20 对坐标点。每对点坐标之间用"|"分割。
     */
    _getAddress(_param) {
        let url = this.baseUrl + `key=${this.key}` + "&" + `location=${_param}`
        //所有参数均使用和号字符(&)进行分隔
        return new Promise((resolve, reject) => {
            const self = this;
            wx.request({
                url,
                method: "GET",
                success: res => {
                    if (res.data && res.data.status == 1) {
                        resolve(res.data.regeocode)
                    } else {
                        reject("格式错误或网络错误")
                    }
                }
            })
        })
    }
}

export {getLocation}