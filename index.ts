import { HmacMD5, MD5 } from "./src/algo/md5.algo";

const test = HmacMD5("123", "123");

console.log(test.toString());
console.log("b2a1ec0f3e0607099d7f39791c04e9a4");
