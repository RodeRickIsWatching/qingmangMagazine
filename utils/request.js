/**
 * 发送请求的工具函数
 */
class ajaxRequest {
    constructor() {
        this.baseUrl = "https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine"
    }
    _request({ url, data = {}, method = "GET" }) {
        return new Promise((resolve, reject) => {
            // 注意异步使用self
            const self = this;
            wx.request({
                url: self.baseUrl + url,
                method,
                data,
                success(res) {
                    if (res.statusCode == 200 && res.data && res.data.code == 0) {
                        resolve(res)
                    } else {
                        self._showErr()
                    }
                },
                fail(err) {
                    self._showErr()
                }
            })
        })
    }
    _showErr() {
        // 提示框
        wx.showToast({
            title: "请求错误或网络错误，请稍后再试",
            icon: "none"
        })
    }
}

export { ajaxRequest }