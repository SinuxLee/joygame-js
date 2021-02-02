  // https://dashboard.back4app.com/apidocs/eh0U2RtrhpEctTNX489AIFG7LZIwZYZ7AkgC9nBP#user-api
  // https://www.back4app.com/docs/javascript/javascript-facebook-login
  // https://parse-zh.buzhundong.com/
  // https://parseplatform.org/parse-server/api/4.2.0/ParseServerOptions.html
  // https://parseplatform.org/Parse-SDK-JS/api/master/

  // 初始化 parse SDK
  Parse.serverURL = "http://localhost:1337/joygame"; // This is your Server URL
  Parse.initialize(
    "joygame", // This is your Application ID
    "clientKey" // This is your Javascript key
  );
