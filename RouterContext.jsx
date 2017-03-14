const React = require('react');
const RouterContext = require('react-router').RouterContext;

module.exports = (renderProps) => (
  <RouterContext {...renderProps} />
);
