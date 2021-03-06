import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { successClg, errorClg } from './src/utils/loggers';
import resolvers from './src/graphql/resolvers';
import typeDefs from './src/graphql/typeDefs';

// Models
import User from './src/models/userModel';
import Todo from './src/models/todoModel';

import { protect } from './src/middlewares/auth';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: NODE_ENV !== 'production',
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const auth = protect(token);

    return { auth, User, Todo };
  },
});

const startServer = () => {
  try {
    if (MONGO_URI) {
      mongoose.connect(MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      });
    } else {
      throw new Error('Unable to connect to Database!');
    }

    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      successClg(`🚀Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    errorClg(error.message);
  }
};

// Start the Server
startServer();
