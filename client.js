const parse = require('parse/node')

parse.initialize("joygame","clientKey");
parse.serverURL = 'http://localhost:1337/parse'

// 自定义登录方式
authInfo = {
    authData: {
        id: 123,    // id参数必须有
        jsCode: 'wcCode'
    }
};

parse.User.logInWith('wechatgame',authInfo).then(data=>{
    console.log(data)
}).catch(error=>{
    console.log(error.message)
})

