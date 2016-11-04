/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  var child_process = require('child_process');
  child_process.exec("webpack -p --config webpack.production.config.babel.js", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
