const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com"
  },
})