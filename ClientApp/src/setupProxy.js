const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:16780';

const context =  [
    "/weatherforecast",
    "/api/producto",
    "/api/cliente",
    "/api/usuarios",
    "/api/ventas",
    "/api/ventasdetalle",
    "/api/salidas",
    "/api/entradas",
    "/api/creditos",
    "/api/cuotas",

];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
