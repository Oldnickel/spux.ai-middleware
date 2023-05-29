const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const visitorRoute = require('./visitor.route');
const emailCollectorRoute = require('./emailCollector.route');
const rasaRoute = require('./rasa.route');
const metadataRoute = require('./metadata.route');
const websitesRoute = require('./websites.route');
const docsRoute = require('./docs.route');
const renderRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/renderer',
    route: renderRoute,
  },
  {
    path: '/rasa',
    route: rasaRoute,
  },
  {
    path: '/visitors',
    route: visitorRoute,
  },
  {
    path: '/emailCollector',
    route: emailCollectorRoute,
  },
  {
    path: '/metadata',
    route: metadataRoute,
  },
  {
    path: '/websites',
    route: websitesRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
