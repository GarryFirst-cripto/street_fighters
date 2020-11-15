const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', FighterService.get, responseMiddleware);

router.get('/:id', FighterService.getId, responseMiddleware);

router.delete("/:id", FighterService.delete, responseMiddleware);

router.use('/', createFighterValid);

router.post('/', FighterService.post, responseMiddleware);

router.use('/:id', updateFighterValid);

router.put("/:id", FighterService.put, responseMiddleware);

module.exports = router;