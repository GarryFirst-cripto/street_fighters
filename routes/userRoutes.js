const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', UserService.get, responseMiddleware);

router.get('/:id', UserService.getId, responseMiddleware);

router.delete("/:id", UserService.delete, responseMiddleware);

router.use('/', createUserValid);

router.post('/', UserService.post, responseMiddleware);

router.use('/:id', updateUserValid);

router.put("/:id", UserService.put, responseMiddleware);

module.exports = router;