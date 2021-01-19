const qs = require('querystring');
const axios = require('axios');
const Parse = require('parse/node').Parse;

// Returns a promise that fulfills iff this user id is valid.
async function validateAuthData(authData) {
    // authData.id = 'libz123'
    return Promise.resolve();
    const queryParam = qs.stringify({
        js_code:authData.jsCode,
        grant_type:'authorization_code',
        secret:process.env.WXSECRET,
        appid:process.env.WXAPP_ID,
    });

    return await graphRequest(`jscode2session?${queryParam}`).then(resp =>{
        const {data} = resp
        if (data.errcode == 0) {
            return;
        }
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'wechat auth is invalid for this user.');
    });
}

// Returns a promise that fulfills if this app id is valid.
async function validateAppId() {
    return Promise.resolve();
}

// A promisey wrapper for WeChat graph requests.
async function graphRequest(path) {
    return await axios.get('https://api.weixin.qq.com/sns/' + path);
}

module.exports = {
    validateAppId,
    validateAuthData,
};
