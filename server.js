import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import webpack from 'webpack';
import Server from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';
import config from './webpack.config';
import routes from './src/routes';
import reducers from './src/reducers';

const ReactRouter = require('react-router');

const app = express();
const compiler = webpack(config);

// handlebars helpers
const hbs = exphbs.create({
  helpers: {
    stringify: function (something) { return JSON.stringify(something).replace(/</g, '\\u003c'); },
  },
  defaultLayout: 'main',
  extname: '.hbs',
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

const middleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
}));

// universal routing and rendering
app.get('*', (req, res) => {
  ReactRouter.match(
    { routes, location: req.url },
    (err, redirect, props) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirect) {
        return res.redirect(302, redirect.pathname + redirect.search);
      }
      // Set the initial state from our Redux store
      const preloadedState = {};

      // Create a new Redux store instance
      const store = createStore(reducers, preloadedState);

      // Render the component to a string
      const html = Server.renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      // render the index template with the embedded React markup
      return res.render('home', { markup: html, preloadedState });
    },
  );
});


app.use(express.static(path.join(__dirname, '/dist')));

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Listening on port %s.', 3000);
});
