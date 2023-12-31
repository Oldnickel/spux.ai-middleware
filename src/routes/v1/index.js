const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const visitorRoute = require('./visitor.route');
const emailCollectorRoute = require('./emailCollector.route');
const rasaRoute = require('./rasa.route');
const metadataRoute = require('./metadata.route');
const websitesRoute = require('./websites.route');
const planRoute = require('./plan.route');
const paypalRoute = require('./paypal.route');
const captureRoute = require('./capture.route');
const chatRoute = require('./chat.route');
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
  {
    path: '/plan',
    route: planRoute,
  },
  {
    path: '/paypal',
    route: paypalRoute,
  },
  {
    path: '/capture',
    route: captureRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
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
