import { AES } from "../src";
const key = "123";

const test = AES.encrypt("123", key);
const result = test.toString();
console.log(result);
console.log(AES.decrypt(result, key).toString());
