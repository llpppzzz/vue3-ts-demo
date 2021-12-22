'use strict'
// webstorm 适应webpack别名alias添加的配置文件
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {

  context: path.resolve(__dirname, './'),

  // 解析
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'views': resolve('src/views'),
      'utils': resolve('src/utils'),
      'api': resolve('src/api'),
      'mock': resolve('src/api/mock')
    }
  }
}
