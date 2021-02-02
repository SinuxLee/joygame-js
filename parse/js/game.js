
const NAME = "huanhuan2";
const PASS = "admin123";

async function signup() {
  query = new Parse.Query(Parse.User);
  query.equalTo("username", NAME); // 可以用 openid作为名字，md5(openid)作为密码
  query.find().then((results) => {
    console.log("found user", results[0].id);
  }).catch(async (error) => {
    console.log("user does't exiest, will creating....");
    await create();
  });
}

async function create() {
  // 初始化游戏数据
  let gameId = "";
  query = new Parse.Query(PLAYER_TABLE);
  query.equalTo("name", NAME);

  await query.find().then((results) => {
    console.log("player found", results);
    gameId = results[0].id;
  }).catch(async (error) => {
    let info = new Player();
    const result = await info.save();
    console.log(result);
    gameId = result.id;
  });

  const user = new Parse.User();
  user.set("username", NAME);
  user.set("password", PASS);
  user.set("gameId", gameId);

  await user.signUp().then((user) => {
    console.log(user);
  }).catch((error) => {
    console.log(error.message);
  });
}

async function login() {
  await Parse.User.logIn(NAME, PASS).then(async (user) => {
    console.log(user.id, user.getSessionToken(), user.isCurrent());
    const query = new Parse.Query(PLAYER_TABLE);
    // query.equalTo("name", NAME);
    await query.find().then((results) => {
      console.log("player found", results);
    }).catch(async (error) => {
      console.log("can't find player");
    });
  }).catch((error) => {
    console.log(error.code);
  });
}