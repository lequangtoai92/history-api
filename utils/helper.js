/**
 * @author Toailq - 23/04/2018
*/

'use strict'
const cons = require('../config/Constant'),
    CryptoJS = require("crypto-js"),
    md5 = require('md5')

module.exports = class Helper {

    constructor() {
        this.AES_KEY = 'fjk393shs323fh2j'
        this.AES_IV = 'zxcmjasdhksahd33'
    }

    _csLg() {
        piepme._ENABLE_LOG && console.log(arguments)
    }

    createSignApi(nameFunction, fo100) {
        let str = 'key=PIEPMEMD5' + nameFunction + '&v=1.0' + '&PO100=' + fo100
        return md5(str)
    }

    //Định dạng tiền tệ
    formatMoney(moneyInput) {
        return moneyInput.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    //Tao token cho request
    createToken(input, keysIgnor) {
        keysIgnor = !!keysIgnor ? keysIgnor : []
        input.v = 'v1'
        input.keyToken = 'Piepme2017'//remove at webservice.js
        let paramStr = ''
        Object.keys(input).sort().forEach(v => {
            if (keysIgnor.indexOf(v) === -1)
                paramStr += v + '=' + input[v] + '&'
        })
        paramStr = paramStr.slice(0, -1)
        return md5(paramStr)
    }

    //merge 2 array
    extend(target) {
        let sources = [].slice.call(arguments, 1)
        sources.forEach((source) => {
            for (let prop in source)
                target[prop] = source[prop]
        })
        return target
    }

    getSerectKey(fo100, nv102) {
        //NV102 -> cắt 16 ký tự => tempKey1
        let tempKey1 = nv102.substr(0, 16),
            //FO100 -> thêm 0 ở trước fo100 cho tới khi đủ -> 16 ký tự => tempKey2
            tempKey2 = '0'.repeat(16).slice(('' + fo100).length) + fo100,
            //mã hóa AES  tempKey1 bằng key và iv là tempKey2 => tempKey3
            tempKey3 = this.aesEncryptWithKey(tempKey1, tempKey2)
        //tempKey3 -> cắt 16 ký tự -> key đã mã hóa
        return tempKey3.substr(0, 16)
    }

    aesDecryptWithKey(cipherData, $key) {
        try {//remove special character
            if ($key === 'OFF')
                return cipherData
            let rtVal = ''
            if (!!cipherData) {
                cipherData = cipherData.replace(/\n|\r|\t/g, "")
                let key = CryptoJS.enc.Utf8.parse($key),
                    decrypted = CryptoJS.AES.decrypt(cipherData, key, { iv: key })
                try {
                    rtVal = decrypted.toString(CryptoJS.enc.Utf8)
                } catch (err) {
                    if (err) rtVal = decrypted.toString()
                }
            }
            return rtVal.trim()
        } catch (error) {
            console.log('-->cipherData', cipherData, '-->key', $key)
            console.log('descrypt->', error)
        }
    }
    aesEncryptWithKey(message, $key) {
        if ($key === 'OFF')
            return message

        let key = CryptoJS.enc.Utf8.parse($key),
            cipherData = CryptoJS.AES.encrypt(message, key, {
                iv: key
            })
        return cipherData.toString()
    }

    aesDecryptDef(cipherData) {
        let key = CryptoJS.enc.Utf8.parse(this.AES_KEY),
            iv = CryptoJS.enc.Utf8.parse(this.AES_IV),
            decrypted = CryptoJS.AES.decrypt(cipherData, key, {
                iv: iv
            }), rtVal = ''
        try {
            rtVal = decrypted.toString(CryptoJS.enc.Utf8)
        } catch (err) {
            if (err)
                rtVal = decrypted.toString()
        }
        return rtVal.trim()
    }
    aesEncryptDef(message) {
        let key = CryptoJS.enc.Utf8.parse(this.AES_KEY),
            iv = CryptoJS.enc.Utf8.parse(this.AES_IV),
            cipherData = CryptoJS.AES.encrypt(message, key, {
                iv: iv
            })
        return cipherData.toString()
    }

    getRandomStr(len = 16) {
        let $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            chars = $chars.split(''),
            str = "",
            size = chars.length

        for (let i = 0; i < len; i++) {//for get size
            let lastNumber = Math.floor(Math.random() * size)
            str += chars[lastNumber]
        }
        return str
    }

    b64EncodeUnicode(str) { return new Buffer(str, 'utf8').toString('base64') }

    b64DecodeUnicode(str) { return new Buffer(str, 'base64').toString('utf8') }

    get_ddMMyyyy_hhmmss(date) {
        let self = this,
            dformat = [
                self.padLeft(date.getDate()),
                self.padLeft((date.getMonth() + 1)),
                date.getFullYear()].join('/') +
                ' ' +
                [self.padLeft(date.getHours()),
                self.padLeft(date.getMinutes()),
                self.padLeft(date.getSeconds())].join(':');
        return dformat;
    }

    padLeft(num, base, chr) {//return num < 10 ? '0'+num
        var len = (String(base || 10).length - String(num).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + num : num;
    }

    convertpvSearch(pvSearch) {
        return self.convertUnicode(pvSearch).replace(/[^a-zA-Z0-9 ]/g, "")
    }
    removeUnicode(str) {
        str = str.toLowerCase()
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        str = str.replace(/đ/g, "d")
        return str
    }
    createSignApiDemo(object) {
        !!object.token &&
            delete object.token

        object.v = cons._VERSION_TOKEN
        object.keyToken = cons._KEY_TOKEN
        let obj = JSON.stringify(object)

        console.log('From Util createSignApi', obj, md5(obj))
        return md5(obj)
    }

    createSignApi(object, keysIgnor) {
        keysIgnor = !!keysIgnor ? keysIgnor : []
        !!object.token &&
            delete object.token

        object.v = cons._VERSION_TOKEN
        object.keyToken = cons._KEY_TOKEN

        var b = ""
        var len = Object.keys(object).length - 1
        Object.keys(object).sort().forEach(function (v, i) {
            if (keysIgnor.indexOf(v) === -1) {
                if (i < len) {
                    b += v + "=" + object[v] + "&"
                } else {
                    b += v + "=" + object[v]
                }
            }
        })
        let sign = md5(b)
        return sign
    }

    /**
     * Hàm mã hóa AES (AES/CBC/PKCS5PADDING)
     * @param message
     * @param aesKEY
     * @param aesIV
     * @returns {string}
     */
    aesEncryptWithKey(message, aesKEY, aesIV) {
        let key = CryptoJS.enc.Utf8.parse(aesKEY),
            iv = CryptoJS.enc.Utf8.parse(aesIV),
            cipherData = CryptoJS.AES.encrypt(message, key, {
                iv: iv
            })
        return cipherData.toString()
    }

    /**
     * Hàm mã hóa AES (AES/CBC/PKCS5PADDING)
     * @param message
     * @returns {string}
     */
    aesEncrypt(message) {
        return self.aesEncryptWithKey(message, cons._AES_KEY, cons._AES_IV)
    }

    /**
     * Hàm giải mã AES (AES/CBC/PKCS5PADDING)
     * @param cipherData
     * @param aesKEY
     * @param aesIV
     * @returns {string}
     */
    aesDecryptWithKey(cipherData, aesKEY, aesIV) {
        let key = CryptoJS.enc.Utf8.parse(aesKEY),
            iv = CryptoJS.enc.Utf8.parse(aesIV),
            decrypted = CryptoJS.AES.decrypt(cipherData, key, {
                iv: iv
            }), rtVal = ''
        try {
            rtVal = decrypted.toString(CryptoJS.enc.Utf8)
        } catch (err) {
            if (err)
                rtVal = decrypted.toString()
        }
        return rtVal.trim()
    }

    /**
     * Hàm giải mã AES (AES/CBC/PKCS5PADDING)
     * @param cipherData
     * @returns {string}
     */
    aesDecrypt(cipherData) {
        return self.aesDecryptWithKey(cipherData, cons._AES_KEY, cons._AES_IV)
    }

    /**
     * Xử lý UUID không đủ 16 ký tự
     * @param uuid
     * @returns {*}
     */
    preProcessUUID(uuid) {
        if (uuid.length < 16) {
            let k = 16 - uuid.length
            for (let i = 0; i < k; i++) {
                uuid = uuid.concat("0")
            }
        }
        return uuid
    }


    /**
     * Hàm tạo KEY cho piepme
     * @param uuid
     * @param FO100
     * @returns {*|string}
     */
    createPiepmeKey(uuid, FO100) {
        let tempKey = uuid.substr(0, 16)
        let fn100Length = FO100.toString().length
        let key2 = ""
        for (let i = 0; i < 16 - fn100Length; i++) {
            key2 = key2.concat("0")
        }
        key2 = key2.concat(FO100)
        return self.aesEncryptWithKey(tempKey, key2, key2)
    }


    /**
     *
     * @param req
     */
    getParams(req) {
        return (req.method == "GET") ? req.query : req.body
    }

    /**
     * Hàm chỉnh lại dữ liệu mảng là số
     * @param arr
     * @returns {*}
     */
    reBuildArrNumber(arr) {
        if (Array.isArray(arr)) {
            arr = arr.map((elem) => {
                elem = +elem
                return elem
            })
        } else if (arr.length > 0) {
            arr = [+arr]
        }
        return arr
    }
}

