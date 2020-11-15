const { Router } = require('express');
const controlsService = require('../services/controlsService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get('/', controlsService.get, responseMiddleware);

router.post('/', controlsService.post, responseMiddleware);

module.exports = router;
