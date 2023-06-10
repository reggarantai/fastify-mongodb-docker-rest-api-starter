import {
  onRequestUser as onRequest,
  isValidObjectIdPreValidation,
  isUserAlreadyExists,
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import {
  userSchemaPost,
  userSchemaLogin,
  userSchemaPut,
  userSchemaDelete,
} from '../models/userSchema.js';

const userRoutes = [
  {
    method: 'POST',
    url: '/users/register',
    schema: userSchemaPost,
    preHandler: isUserAlreadyExists,
    handler: registerUser,
  },
  {
    method: 'POST',
    url: '/users/login',
    schema: userSchemaLogin,
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
    schema: userSchemaPut,
    onRequest,
    preValidation: isValidObjectIdPreValidation,
    preHandler: isUserAlreadyExists,
    handler: updateUser,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    schema: userSchemaDelete,
    onRequest,
    preValidation: isValidObjectIdPreValidation,
    handler: deleteUser,
  },
];

export default userRoutes;
