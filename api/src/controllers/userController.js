import slug from 'slug';
import boom from '@hapi/boom';
import bcryptjs from 'bcryptjs';
import { User } from '../models/index.js';

// To check token validity
async function checkTokenValidity(decodedToken) {
  try {
    // Check the token's expiration time
    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      return false; // Token has expired
    }

    // Optionally, check the token against a blacklist or revocation list
    // Implement your blacklist/revocation logic here

    // Return true if the token is valid
    return true;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
}

// onRequest Protection
const onRequestUser = async (request, reply) => {
  try {
    // Check if the token is still valid
    await request.jwtVerify({
      maxAge: '1h',
    });
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized!' });
    return;
  }

  // Check if the token has been invalidated or expired
  const isTokenValid = await checkTokenValidity(request.user);

  if (!isTokenValid) {
    reply.status(401).send({ message: 'Token has been revoked or expired!' });
    return;
  }

  // Add secure HTTP headers
  reply.header('Content-Security-Policy', "default-src 'self'");
  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('X-Frame-Options', 'DENY');
  reply.header('X-XSS-Protection', '1; mode=block');
};

// preValidation for check if it's a valid ObjectId
const isValidObjectIdPreValidation = async (request, reply) => {
  try {
    const { id } = request.params;

    // If it's not a valid ObjectId
    const validObjectId = await id.match(/^[0-9a-fA-F]{24}$/);
    if (!validObjectId) {
      reply.status(400).send({ message: 'Invalid user!' });
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Check if user exists
const isUserAlreadyExists = async (request, reply) => {
  try {
    const { username } = request.body;
    const usernameExists = await User.findOne({
      username: slug(username),
    });
    if (usernameExists) {
      if (request.params.id) {
        if (usernameExists._id.valueOf() !== request.params.id) {
          reply.status(400).send({
            message: 'Username already exists!',
          });
        }
      } else {
        reply.status(400).send({
          message: 'Username already exists!',
        });
      }
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Register a new user
const registerUser = async (request, reply) => {
  try {
    const { username, password } = request.body;

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(
      password,
      bcryptjs.genSaltSync(10),
    );

    // Create a new user
    const user = new User({
      username: slug(username),
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    reply.send({
      id: user._doc._id,
      username: user._doc.username,
      message: 'User registered successfully!',
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Login user
const loginUser = async (request, reply) => {
  const { username, password } = request.body;

  // Fetch the user from the database based on the provided username
  const user = await User.findOne({ username: slug(username) });

  // Check if user exists
  if (user) {
    // Validate the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      reply.status(400).send({ message: 'Invalid credentials' });
    }
  } else {
    reply.status(400).send({ message: 'Invalid credentials' });
  }

  // If authentication is successful, generate a JWT
  const token = await reply.jwtSign(
    { username },
    { expiresIn: '1h' },
  );

  // Return the token in the response
  reply.send({ token });
};

// Get all users
async function getUsers() {
  try {
    const users = await User.find();
    const response = users.map((user) => ({
      id: user._doc._id,
      username: user._doc.username,
    }));
    return response;
  } catch (err) {
    throw boom.boomify(err);
  }
}

// Get single user by ID
const getSingleUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    if (user) {
      reply.send({
        id: user._doc._id,
        username: user._doc.username,
      });
    }
    reply.status(400).send({ message: 'Invalid user!' });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing user
const updateUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const { username, password } = request.body;
    const updateData = {
      username: slug(username),
    };
    if (password) {
      const hashedPassword = bcryptjs.hashSync(
        password,
        bcryptjs.genSaltSync(10),
      );
      updateData.password = hashedPassword;
    }
    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (updated) {
      reply.send({
        message: 'User updated successfully!',
      });
    }
    reply.status(400).send({ message: 'Invalid user!' });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a user
const deleteUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const deleted = await User.findByIdAndRemove(id);
    if (deleted) {
      reply.send({
        message: 'User deleted successfully!',
      });
    }
    reply.status(400).send({ message: 'Invalid user!' });
  } catch (err) {
    throw boom.boomify(err);
  }
};

export {
  onRequestUser,
  isValidObjectIdPreValidation,
  isUserAlreadyExists,
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
