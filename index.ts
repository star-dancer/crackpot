import { MD5 } from "./src/algo/md5";

const test = MD5("1");

console.log("res: " + test.toString());
console.log("err: c23c15034ac59d8bbff68a34376e02ac");
console.log("suc: c4ca4238a0b923820dcc509a6f75849b");
