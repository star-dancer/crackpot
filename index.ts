import { MD5 } from "./src/algo/md5";
import { Utf8 } from "./src/enc/utf8";

const test = MD5("1");

console.log("res: " + test.toString());
console.log("err: c23c15034ac59d8bbff68a34376e02ac");
console.log("suc: c4ca4238a0b923820dcc509a6f75849b");

const tests = Utf8.parse("1");
console.log(tests);
