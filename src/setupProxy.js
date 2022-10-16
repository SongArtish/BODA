// [PROJECT_ROOT]/src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 호출하는 URL
    createProxyMiddleware({
      target: "http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com", // 대상 URL
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
