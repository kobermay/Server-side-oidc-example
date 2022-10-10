const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
        '/auth/login',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      xfwd: true,
    }),
  );
  app.use(
    '/auth/callback',
createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  xfwd: true,
}),
);
app.use(
    '/auth/logout',
createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  xfwd: true,
}),
);
app.use(
    '/auth/user',
createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  xfwd: true,
}),
);
};