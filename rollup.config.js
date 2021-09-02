import typescript from '@rollup/plugin-typescript';
import {typescriptPaths} from "rollup-plugin-typescript-paths";

export default {
  input: 'src/index.ts', // 源文件入口
  output: [
    {
      file: 'lib/index.esm.js', // package.json 中 "module": "dist/index.esm.js"
      format: 'esm', // es module 形式的包， 用来import 导入， 可以tree shaking
      sourcemap: true
    }, {
      file: 'lib/index.cjs.js', // package.json 中 "main": "dist/index.cjs.js",
      format: 'cjs', // commonjs 形式的包， require 导入 
      sourcemap: true
    }, {
      file: 'lib/index.umd.js',
      name: 'crackpot',
      format: 'umd', // umd 兼容形式的包， 可以直接应用于网页 script
      sourcemap: true
    }
  ],
  plugins: [typescript({typescript:require("typescript"),module:"ESNext"}),typescriptPaths()]
}