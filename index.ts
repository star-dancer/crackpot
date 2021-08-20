import { MD5 } from "./src/algo/md5";

const test = MD5("asdfasdf", { blockSize: 512 / 32 }).toString();
console.log(test);
