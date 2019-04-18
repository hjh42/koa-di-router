import path from 'path';

export default {
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    file: path.resolve(__dirname, '../lib/koa-di-router.js'),
    format: 'esm'
  }
}