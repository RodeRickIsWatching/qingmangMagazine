// components/pageIndex/articleLists/childCmps/video2/cmp.js
import {myBeh} from "../../../../behaviors/behaviors";

Component({
    behaviors: [myBeh],
    /**
     * 组件的属性列表
     */
    properties: {},
    /**
     * 生命周期
     * */
    lifetimes: {
        attached() {
            this._getVideoObj();
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        ifPlayed: false,
        ifPosterShow: true
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            this._togglePlayingSignal();
            this.video.play();
        },
        onEnd() {
            this._togglePlayingSignal();
        },
        onPause() {
            this._togglePlayingSignal();
            this.video.pause();
        },
        onTap() {
            if (!this.data.ifPlayed) {
                this.onPlay();
            } else {
                this.onPause();
            }
        },
        _togglePlayingSignal() {
            this.setData({
                ifPlayed: !this.data.ifPlayed,
                //由于poster只需要出现一次，因此点击一次后让其保持false
                ifPosterShow: false
            })
        },
        _getVideoObj() {
            let id = "myVideo";
            this.video = wx.createVideoContext(id, this);
        }
    }
})
