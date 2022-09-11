const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateUserId,
  validateAvatar,
  validateUser,
} = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUser);
userRouter.get('/users/:userId', auth, validateUserId('userId'), getUserId);
userRouter.patch('/users/me', auth, validateUser, updateUser);
userRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = userRouter;
