const path = require('path');
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const WechatGame = require('./auth/wechatgame')

// load env var
require('dotenv-safe').config({
    allowEmptyValues: true,
});

const api = new ParseServer({
    databaseURI: process.env.MONGODB_URI,
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'joygame',
    javascriptKey: process.env.CLIENT_KEY || '',
    masterKey: process.env.MASTER_KEY || '', //master key ，打死也不要告诉别人！
    serverURL: process.env.SERVER_URL, // 如果使用https不要忘了修改它
    customPages: 'parseFrameURL',
    liveQuery: {
        classNames: ["Posts", "Comments"] // 配置支持实时请求的class表
    },
    filesAdapter: {
        module: '@parse/fs-files-adapter',
        options: {
            'filesSubDirectory': ''
        }
    },
    publicServerURL: process.env.SERVER_URL,
    auth: {
        wechatgame: {
            module: WechatGame,
            option1: 'jsCode',
        }
    }
});

const app = express();

// 静态资源目录
app.use('/public', express.static(path.join(__dirname, '/parse')));

//仪表盘可配置多应用以及访问权限，还可以作为单独的Node项目运行，参考https://github.com/parse-community/parse-dashboard
const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": process.env.SERVER_URL,
        "appId": process.env.APP_ID || 'myAppId',
        "masterKey": process.env.MASTER_KEY || '',
        "appName": "MyApp"
    }],
    "users": [{
        "user": '123456',
        "pass": '123456',
        "apps": [{ "appId": "myAppId" }]
    }],
});

app.use('/dashboard', dashboard);

// 设置Parse服务地址
const mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
    res.status(200).send('嗨，很高兴见到你~');
});

// 配置一个用来测试是否成功运行的路由
app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('game server running on port ' + port + '.');
});

// 启用实时请求
ParseServer.createLiveQueryServer(httpServer);
