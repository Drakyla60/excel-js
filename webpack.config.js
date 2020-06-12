const path = require('path');


const APP_DIR = path.resolve(__dirname, 'src');
const APP_DIST = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: APP_DIST
  }
}