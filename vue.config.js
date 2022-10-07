const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     "api/*": {
  //       // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
  //       target: "http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
