var rollup = require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var json = require('rollup-plugin-json');

rollup.rollup({
  entry: 'src/server/main.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
}).then(function (bundle) {
  bundle.write({
    format: 'cjs',
    dest: 'dist/server/main.js'
  })
}).catch(function (err) {
  console.log(err);
});
