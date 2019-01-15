/**
 * storage工具方法
 */

class storageController {
    setStorage(key, data, status = '') {
        if (status.toLowerCase() != "sync") {
            wx.setStorage({
                key,
                data
            })
        } else if (status.toLowerCase() == "sync") {
            wx.setStorageSync(key, data);
        }
    }

    getStorage(key, status = '') {
        if (status.toLowerCase() != "sync") {
            return wx.getStorage({
                key
            })
        } else if (status.toLowerCase() == "sync") {
            return wx.getStorageSync(key)
        }
    }

    removeStorage(key, status = '') {
        if (status.toLowerCase() != "sync") {
            wx.removeStorage({
                key
            })
        } else if (status.toLowerCase() == "sync") {
            wx.removeStorageSync(key)
        }
    }
}


export {storageController}