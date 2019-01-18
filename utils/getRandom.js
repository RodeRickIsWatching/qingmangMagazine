/**
 * 在加载更多时的标志位，使用random太low，symbol目前无法使用（1.16测试）
 * */

const strArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let randomStr = function () {
    let len = strArr.length;
    let str = ``;
    for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * len)
        str += strArr[index]
    }
    return str
}

export {randomStr}