import { Schema } from 'mongoose';

// Create a User schema
const headersAuth = {
  type: 'object',
  properties: {
    Authorization: { type: 'string' },
  },
  required: ['Authorization'],
};

const defaultBody = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 5,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const defaultParams = {
  type: 'object',
  properties: {
    par1: { type: 'string' },
  },
};

const defaultResponse = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
    },
  },
};

const bodyPost = {
  ...defaultBody,
  required: ['username', 'password'],
};
const bodyPut = {
  ...defaultBody,
  required: ['username'],
};

const userSchemaPost = {
  headers: headersAuth,
  params: defaultParams,
  body: bodyPost,
  response: defaultResponse,
};

const userSchemaLogin = {
  body: bodyPost,
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
};

const userSchemaPut = {
  headers: headersAuth,
  params: defaultParams,
  body: bodyPut,
};

const userSchemaDelete = {
  headers: headersAuth,
  params: defaultParams,
};

const userMongooseSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Username required!'],
  },
  password: {
    type: String,
    trim: true,
  },
});

export {
  userSchemaLogin,
  userSchemaPost,
  userSchemaPut,
  userSchemaDelete,
  userMongooseSchema,
};
