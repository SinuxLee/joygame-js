const parse = require('parse/node')

parse.initialize("joygame","clientKey");
parse.serverURL = 'http://localhost:1337/parse'

// 如果校验code，可以通过cloud函数通过codejssession
// 自定义登录方式
authInfo = {
    authData: {
        id: 'libz1',    // id参数必填，玩家的标识
        jsCode: 'wcCode123'
    }
};

const GameInfoTable = 'GameInfo'
class GameInfo extends parse.Object {
    constructor() {
        super(GameInfoTable);
        this.sound = 'Rawr';
    }
}

parse.Object.registerSubclass(GameInfoTable, GameInfo);

async function launch() {
    // 微信认证

    // 登录
    const user = await parse.User.logInWith('wechatgame', authInfo)

    // 初始化游戏数据
    const query = new parse.Query(GameInfoTable)
    query.equalTo("owner", user);
    const list = await query.find()
    if(list.length == 0) {
        info = new GameInfo()
        info.set("owner", user);
        const result = await info.save()
        console.log(result)
    }


}

launch()


// 记录userid或者通过关联user表

/*
// 1.注册
const user = new parse.User();
user.set("username", "libz");
user.set("password", "admin123");
user.set("phone", "415-392-0202");

user.signUp().then(user =>{
    console.log(user)
}).catch(error =>{
    console.log(error.message);
})

// 2.登录
parse.User.logIn("libz", "admin123").then(user => {
    console.log(user.id, user.getSessionToken(), user.isCurrent())
}).catch((error) => {
    console.log(error.code);
})
*/
