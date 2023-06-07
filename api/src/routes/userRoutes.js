import {
  onRequestUser as onRequest,
  isValidObjectIdPreValidation,
  isValidUserInputPreValidation,
  isUserAlreadyExists,
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const userRoutes = [
  {
    method: 'POST',
    url: '/users/register',
    preValidation: isValidUserInputPreValidation,
    preHandler: isUserAlreadyExists,
    handler: registerUser,
  },
  {
    method: 'POST',
    url: '/users/login',
    preValidation: isValidUserInputPreValidation,
    handler: loginUser,
  },
  {
    method: 'GET',
    url: '/users',
    // onRequest,
    handler: getUsers,
  },
  {
    method: 'GET',
    url: '/users/:id',
    onRequest,
    preValidation: isValidObjectIdPreValidation,
    handler: getSingleUser,
  },
  {
    method: 'PUT',
    url: '/users/:id',
    onRequest,
    preValidation: isValidObjectIdPreValidation,
    preHandler: isUserAlreadyExists,
    handler: updateUser,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    onRequest,
    preValidation: isValidObjectIdPreValidation,
    handler: deleteUser,
  },
];

export default userRoutes;
