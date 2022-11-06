const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  editUser,
  editAvatar,
  getProfileInfo,
} = require('../controllers/user');
const {
  validGetByIdData,
  validEditUserData,
  validEditAvatarData,
} = require('../utils/validation/validUserData');

userRouter.get('/', getUsers);
userRouter.get('/me', getProfileInfo);
userRouter.get('/:userId', validGetByIdData, getUserById);
userRouter.patch('/me', validEditUserData, editUser);
userRouter.patch('/me/avatar', validEditAvatarData, editAvatar);

module.exports = userRouter;
