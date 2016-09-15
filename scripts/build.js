var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var json = require('rollup-plugin-json');
var nodeResolve = require('rollup-plugin-node-resolve');
var rollup = require('rollup');
var uglify = require('rollup-plugin-uglify');

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

rollup.rollup({
  entry: 'src/browser/main.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    babel(),
    uglify()
  ]
}).then(function (bundle) {
  bundle.write({
    format: 'cjs',
    dest: 'dist/_assets/browser/main.js'
  })
}).catch(function (err) {
  console.log(err);
});
