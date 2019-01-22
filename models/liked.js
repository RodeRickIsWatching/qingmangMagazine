/**
 * 喜欢按钮的构造函数
 * 由于没有数据库，微信小程序也不支持indexDB，因此走storage
 */

import {storageController} from "../utils/storageController";

let sc = new storageController();


class likeModel {
    _setLikeList(value) {
        sc.setStorage('likeList', value, 'sync')
    }

    getLikeList() {
        return sc.getStorage('likeList', 'sync') || []
    }

    removeLikeList(_item) {
        //找到目标索引，移除，再重新set
        const likeList = this.getLikeList()
        let myIndex = 0
        likeList.forEach((item, index) => {
            if (item.artId == _item.artId) {
                myIndex = index
                return
            }
        })
        likeList.splice(myIndex, 1)
        this._setLikeList(likeList)
    }

    addLikeList(_item) {
        const likeList = this.getLikeList()
        let flag = false
        likeList.forEach((item, index) => {
            // 查重操作
            if (item.artId == _item.artId) {
                flag = true
                return
            }
        })
        if (!flag) {
            likeList.unshift(_item)
            this._setLikeList(likeList)
        }
    }
}


export {likeModel}