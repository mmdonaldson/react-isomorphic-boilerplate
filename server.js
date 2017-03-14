import routes from './src/routes';

// Babel ES6/JSX Compiler
require('babel-register');

const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const config = require('./webpack.config.dev');

const RouterContext = require('./RouterContext.jsx');

const app = express();
const compiler = webpack(config);

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
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
    modules: false
  }
});

app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
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

      // generate the React markup for the current route
      let markup;
      if (props) {
        // if the current route matched we have renderProps
        markup = ReactDOMServer.renderToString(RouterContext(props));
      } else {
        // otherwise we can render a 404 page
        return res.render('error');
      }
      // render the index template with the embedded React markup
      return res.render('home', { markup });
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
