import path from 'path';
import {exec, spawn} from 'child_process';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import rollup from 'rollup';

const devOption = {
  input: path.resolve(__dirname, '../example/index.js'),
  output: {
    file: path.resolve(__dirname, '../dest/main.js'),
    format: 'cjs'
  },
  plugins: [
    commonjs(
      {
        include:path.resolve(__dirname, '../node_modules/**'),
      }
    ),
    resolve({
      customResolveOptions: {
        moduleDirectory: path.resolve(__dirname, '../node_modules/')
      }
    }),
    babel({
      exclude: path.resolve(__dirname, '../node_modules/**'),
      runtimeHelpers: true
    })
  ],
  external: ['koa']
}

const watcher = rollup.watch(devOption);

const appFile = path.resolve(__dirname, '../dest/main.js');

let pid = null;

async function command(val) {
  return await exec(val, {}, (err, stdout, stderr) => {
    if(err) {
      console.log(`err ${err} ${val}`);
    }
    console.log(`stdout: ${stdout} ${val}`);
    console.log(`stderr: ${stderr} ${val}`);
  });
}

watcher.on('event', async (event) => {
  if (event.code == 'END') {
    if (pid) {
      await command(`kill -9 ${pid}`);
      pid = null;
    }
    let child = await spawn('node', [appFile]);
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    }); 
    child.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    pid = child.pid;
  }
})

export default devOption;