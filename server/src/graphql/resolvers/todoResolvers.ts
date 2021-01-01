import { errorClg } from '../../utils/loggers';
import { IDelArgs, IDelResp, IEditArgs, ITodo } from '../../interfaces/todoInterfaces';
import { IContext } from '../../interfaces/gqlInterfaces';
import { ICreateTodoArgs } from '../../interfaces/todoInterfaces';
import { ApolloError } from 'apollo-server-express';

export default {
  Query: {
    getAllTodos: async (
      _: any,
      __: any,
      { auth, User }: IContext
    ): Promise<ITodo[] | ApolloError> => {
      try {
        if (!auth.isAuth) {
          throw new Error('User not authenticated!');
        }

        const user = await User.findById(auth.userId);
        if (!user) {
          return new ApolloError('User not found!');
        }

        await user.populate('todos').execPopulate();
        const todos: ITodo[] = [];
        user.todos.forEach((value: any) => {
          todos.push(value);
        });

        return todos;
      } catch (error) {
        errorClg(error.message);
        return new ApolloError(error.message);
      }
    },
  },

  Mutation: {
    createTodo: async (
      _: any,
      { desc }: ICreateTodoArgs,
      { auth, User, Todo }: IContext
    ): Promise<ITodo | ApolloError> => {
      try {
        if (!auth.isAuth) {
          return new ApolloError('User not authenticated!');
        }

        const user = await User.findById(auth.userId);
        if (!user) {
          return new ApolloError('User not found!');
        }

        const todo = await Todo.create({ desc, isCompleted: false, user: user._id });
        if (!todo) {
          throw new Error('Unable to create a todo.');
        }

        user.todos.push(todo._id);
        await user.save();

        return todo;
      } catch (error) {
        errorClg(error.message);
        return new ApolloError(error.message);
      }
    },

    deleteTodo: async (
      _: any,
      { id }: IDelArgs,
      { auth, Todo }: IContext
    ): Promise<IDelResp | ApolloError> => {
      try {
        if (!auth.isAuth || !auth.userId) return new ApolloError('User not authenticated!');

        const todo = await Todo.findById(id);
        if (!todo) {
          return new ApolloError('Unable to find a todo with the given ID.');
        }

        if (!todo.user.equals(auth.userId)) {
          return new ApolloError('Access Denied!');
        }

        await Todo.deleteOne({ _id: id });
        return {
          success: true,
          message: 'Todo was successfully deleted!',
        };
      } catch (error) {
        errorClg(error.message);
        return new ApolloError(error.message);
      }
    },

    editTodo: async (
      _: any,
      { id, desc, isCompleted }: IEditArgs,
      { auth, Todo }: IContext
    ): Promise<ITodo | ApolloError> => {
      try {
        if (!auth.isAuth || !auth.userId) return new ApolloError('User not authenticated!');

        const todo = await Todo.findById(id);
        if (!todo) {
          return new ApolloError('Unable to find a todo with the given ID.');
        }

        if (!todo.user.equals(auth.userId)) {
          return new ApolloError('Access Denied!');
        }

        if (desc) todo.desc = desc;
        if (isCompleted) todo.isCompleted = isCompleted;

        await todo.save();

        return todo;
      } catch (error) {
        errorClg(error.message);
        return new ApolloError(error.message);
      }
    },
  },
};
