const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭语法检测
  lintOnSave: false,
  transpileDependencies: true,

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.hdr$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/hdr/'
              }
            }
          ]
        }
      ]
    }
  }
});
