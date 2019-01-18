import {storageController} from "../utils/storageController";

const sC = new storageController()

class subscriptionModel {
    setTagList(value) {
        sC.setStorage('tagList', value, 'sync')
    }

    getTagList() {
        return sC.getStorage('tagList', 'sync') || []
    }

    addTagList(_item) {
        let tagList = this.getTagList();
        let flag = false
        tagList.forEach((item, index) => {
            if (item.tag == _item.tag) {
                flag = true
                return
            }
        })
        if (!flag) {
            tagList.unshift(_item)
            this.setTagList(tagList)
        }
    }

    removeTagList(_item) {
        let tagList = this.getTagList();
        let _index = 0;
        tagList.forEach((item, index) => {
            if (item.tag == _item.tag) {
                _index = index
                return
            }
        })
        tagList.splice(_index, 1)
        this.setTagList(tagList)
    }
}

export {subscriptionModel}