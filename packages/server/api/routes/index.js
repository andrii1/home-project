const express = require('express');

const router = express.Router();

const exampleResources = require('./exampleResources.router');
const prompts = require('./prompts.router');
const categories = require('./categories.router');
const topics = require('./topics.router');
const users = require('./users.router');
const favorites = require('./favorites.router');
const ratings = require('./ratings.router');
const stripe = require('./stripe.router');
const comments = require('./comments.router');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0',
      title: 'Final project',
      description: 'API documentation for the final project',
      contact: {},
    },
    host: '',
    basePath: '/api',
  },
  securityDefinitions: {},
  apis: ['./api/routes/*.js'],
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

// Route for Swagger API Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/exampleResources', exampleResources);
router.use('/prompts', prompts);
router.use('/categories', categories);
router.use('/topics', topics);
router.use('/users', users);
router.use('/favorites', favorites);
router.use('/ratings', ratings);
router.use('/stripe', stripe);
router.use('/comments', comments);

module.exports = router;
