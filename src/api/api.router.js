const router = require('express').Router();
const methodNotAllowed = require('../errors/methodNotAllowed');
const controller = require('./api.controller');

/*  ADDING METHODS TO A ROUTE
To extend the request accepted on a specific route, 
just chain the method before the error handler
*/
router.route('/ping').get(controller.ping).all(methodNotAllowed);

router.route('/posts').get(controller.list).all(methodNotAllowed);

module.exports = router;