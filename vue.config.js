// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

let target = 'http://localhost:8080' // 기본 설정값

let changeOrigin = false // 기본 설정값

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/v1': {
        // target: "https://ocp-ops2server-sandbox.dev.opsnow.com/",
        target: target,
        changeOrigin: true,
      },
      /*  '/acl': {
          target: "https://ocp-ops2-acl-server-sandbox.dev.opsnow.com/",
          changeOrigin: true
        }*/
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 4000
  },
}


