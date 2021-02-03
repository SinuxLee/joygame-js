const NAME = "libz2";
const PASS = "admin123";

async function signup() {
  const query = new Parse.Query(Parse.User);
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
  const query = new Parse.Query(PLAYER_TABLE);
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
    user.set('init',true); // 根据标识判定是否初始化了玩家
    user.set('jobTitle', 'no job');
    // Saves the user with the updated data
    user.save().then((response) => {
      console.log('Updated after signUp user', response);
    }).catch((error) => {
      console.error('Error while updating user', error);
    });
  }).catch((error) => {
    console.log(error.message);
  });
}

async function login() {
  await Parse.User.logIn(NAME, PASS).then(async (user) => {
    let gameId = user.get("gameId");
    console.log(user.id, user.getSessionToken(), user.isCurrent(),gameId);
    const query = new Parse.Query(PLAYER_TABLE);
    await query.get(gameId).then((player) => {
      console.log("player found", player);
    }).catch(async (error) => {
      console.log("can't find player");
    });

    // 登录后处理正常业务


  }).catch((error) => {
    console.log(error.code);
  });
}

async function change() {
  const query = new Parse.Query(Parse.User);
  query.get('6fR0440ywX').then((user) => {
    // Updates the data we want
    user.set('firstName', 'A string');
    user.set('lastName', 'A string');
    user.set('birthDate', new Date());
    user.set('avatarPicture', new Parse.File("resume.txt", { base64: btoa("My file content") }));
    user.set('name', 'biubiu');
    user.set('imageUrl', 'www.baidu.com');
    user.set('nativeFirstName', 'A string');
    user.set('nativeLastName', 'A string');
    user.set('mobilePhoneNumber', 'A string');
    user.set('role', 'admin');
    user.set('jobTitle', 'A string');
    // Saves the user with the updated data
    user.save().then((response) => {
      console.log('Updated user', response);
    }).catch((error) => {
      console.error('Error while updating user', error);
    });
  });
}
