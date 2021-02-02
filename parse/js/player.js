// 自定义数据类型
const PLAYER_TABLE = "player";
class Player extends Parse.Object {
  constructor() {
    super(PLAYER_TABLE);
    this.name = NAME;
    this.age = 30;
  }
}
Parse.Object.registerSubclass(PLAYER_TABLE, Player);
