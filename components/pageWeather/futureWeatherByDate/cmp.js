// components/pageWeather/futureWeatherByDate/cmp.js
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        futureByDate: {
            type: Array,
            //使用observer是为了判断是否取到值
            observer: "renderCanvas"
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        _width: 0,
        _height: 50
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getSize() {
            wx.getSystemInfo({
                success: res => {
                    this.setData({
                        _width: res.windowWidth + 'px'
                    })
                }
            })
        },
        getDis({_max, _min, _x}) {
            //计算温度在y轴上的百分比
            let _res = 100 / (_max - _min) * (_x - _min) / 100
            return _res
        },
        adaption(_px) {
            //适配，所有手机宽度统一是375rpx，获取到的屏幕宽度/375 = k
            //px = k* rpx
            console.log(_px)
            let k = _px / 375
            return +k
        },
        calPercent(_tempArr, _status) {
            //取值范围0~100，即0%~100%
            //先获取所有高温的值
            let tempArr = [],
                _res = [];
            _tempArr.forEach((item, index) => {
                tempArr.push(+item[_status].split("℃")[0])
            })
            //取出最大值最小值，用于确定y轴的点
            let _max = Math.max.apply(null, tempArr),
                _min = Math.min.apply(null, tempArr);
            //获取每个点对应的坐标位置，由于是获取5天数据，x恒定20%不变
            //因此只要获得y轴距离即可
            tempArr.forEach(item => {
                _res.push(+this.getDis({_max: _max, _min: _min, _x: item}))
            })
            return _res
        },
        drawCanvas(_context, _percentArr, _color) {
            //获取适配比
            let k = this.adaption(this.data._width.split("p")[0])
            //注意单位是px，x恒定75px 75*5=375
            //(0,0)是左上角顶点
            //_x和_y单位是px，_y=0.5*_height
            let _x = 75 * k,
                _y = this.data._height / 2 * k;
            //偏移量y轴，为了使图在中间显示
            let b = 10
            let len = _percentArr.length
            //用于存放转折点的坐标
            let _circle = [];
            _context.setStrokeStyle(_color)
            _context.setLineWidth(2)
            let hTempX = _x / 2,
                hTempY = (1 - _percentArr[0]) * _y + b;
            _context.moveTo(hTempX, hTempY)
            //记录转折点的位置，用于后面画圆点
            _circle.push({x: hTempX, y: hTempY})
            for (let i = 1; i < len; i++) {
                let tempX = _x / 2 + _x * (i),
                    tempY = (1 - _percentArr[i]) * _y + b;
                _context.lineTo(tempX, tempY)
                //记录转折点的位置，用于后面画圆点
                _circle.push({x: tempX, y: tempY})
            }
            //画出折线
            _context.stroke()
            //画圆点，一定要先画出折线，再画原点
            for (let i = 0; i < len; i++) {
                _context.fillStyle = _color
                _context.beginPath()
                _context.arc(_circle[i]["x"], _circle[i]["y"], 5, 0, 2 * Math.PI, 1)
                _context.fill();
            }
            _context.draw()
        },

        renderCanvas() {
            //获取窗口宽度
            this.getSize()
            //获得百分比值
            let hRes = this.calPercent(this.properties.futureByDate, 'high')
            let lRes = this.calPercent(this.properties.futureByDate, 'low')

            let contextH = wx.createCanvasContext('highTempCanvas', this)
            let contextL = wx.createCanvasContext('lowTempCanvas', this)
            this.drawCanvas(contextH, hRes, '#ff4f14')
            this.drawCanvas(contextL, lRes, '#1554ff')
        }
    }
})
