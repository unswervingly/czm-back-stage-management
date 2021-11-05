const path = require('path')

module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',

  // 修改加载资源对应的路径，这样打包之后index.html的路径是对的,  但是部署服务器的时候不要用
  // publicPath: './',

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        // pathRewrite  对请求路径进行重定向以匹配到正确的请求地址，
        pathRewrite: {
          '^/api': '' // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
          // '^/api': '/api' // 这种接口配置出来     http://XX.XX.XX.XX:5000/api/login
        },
        // 意味着host设置成target
        changeOrigin: true
      }
    }
  },

  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        src: '@',
        views: '@/views'
      }
    }
    // }
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     views: '@/views'
    //   }
    // },

    // 3.配置方式三:
    // chainWebpack: (config) => {
    //   config.resolve.alias
    //     .set('@', path.resolve(__dirname, 'src'))
    //     .set('views', '@/views')
    // }
  }
}
