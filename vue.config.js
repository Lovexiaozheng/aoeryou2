const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
 
  publicPath: './',
  lintOnSave: true,
  configureWebpack: {
      //关闭 webpack 的性能提示
      performance: {
          hints:false
      }
  
  },
  devServer: {

      proxy: {
          '/api': {
              target: 'http://47.115.209.249:8080/',//后端接口地址
                changeOrigin: true,//是否允许跨越 
              ws: true, // proxy websockets
              pathRewrite: { //重写路径
                  '^/api': '/api'

          }
        } 
      }
  }
})
