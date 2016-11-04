import express from 'express';
import webpack from 'webpack';
import path from 'path';
import httpProxy from 'http-proxy';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.babel';

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

if (!isProduction) {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  app.all('/public/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
