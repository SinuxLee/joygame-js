// 自定义函数
// curl -X POST "http://localhost:1337/joygame/functions/hello" \
// -d "{ \"_method\": \"POST\", \"_ApplicationId\": \"joygame\",\"_JavaScriptKey\":\"clientKey\" }"
// -H "Content-Type: application/json"
Parse.Cloud.define('hello', async function(req) {
  return 'hello world'
});

// data handle hook
Parse.Cloud.beforeSave("player", function(request) {
  if (request.object.get("stars") < 1) {
    return new error("少于1星，不能获取");
  } else if (request.object.get("stars") > 5) {
    return new error("多余5星，不能获取");
  }
});
