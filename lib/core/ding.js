const crypto = require('crypto');
const MiniRequest = require('../toolkit/mini_request')

class Ding extends MiniRequest {
    constructor(options) {
        super()
        this.SECRET = options.SECRET
        this.DING_ROOT_URL = options.DING_ROOT_URL
    }


    /**
     * 自定义机器人消息
     * @param {*} access_token 
     * @param {*} params 
     * @returns 
     */
    async customSendMsg(access_token, params) {
        const {
            timestamp,
            sign
        } = this.encrypt();
        const URL = `${this.DING_ROOT_URL}/robot/send?access_token=${access_token}&timestamp=${timestamp}&sign=${sign}`;
        return await this.doRequest(URL, 'POST', params, {});
    }


    /**
     * 加密
     * @returns
     */
    encrypt() {
        const timestamp = Date.now();
        const str = timestamp + '\n' + this.SECRET;

        const sign = crypto.createHmac('sha256', this.SECRET).update(str).digest('base64');
        const sign_encodeUrl = encodeURIComponent(sign);

        return {
            timestamp: timestamp,
            sign: sign_encodeUrl
        };
    }
}

module.exports = Ding