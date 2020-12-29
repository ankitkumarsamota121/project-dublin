import { errorClg } from '../../utils/loggers';
import { ITodo } from '../../interfaces/todoInterfaces';
import { IContext } from '../../interfaces/gqlInterfaces';
import { ICreateTodoArgs } from '../../interfaces/todoInterfaces';

export default {
  Query: {
    getAllTodos: async (_: any, __: any, { auth, User }: IContext): Promise<ITodo[] | Error> => {
      try {
        if (!auth.isAuth) {
          return new Error('User not authenticated!');
        }

        const user = await User.findById(auth.userId);
        if (!user) {
          return new Error('User not found!');
        }

        await user.populate('todos').execPopulate();
        const todos: ITodo[] = [];
        user.todos.forEach((value: any) => {
          todos.push(value);
        });

        return todos;
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },
  },

  Mutation: {
    createTodo: async (
      _: any,
      { desc }: ICreateTodoArgs,
      { auth, User, Todo }: IContext
    ): Promise<ITodo | Error> => {
      try {
        if (!auth.isAuth) {
          return new Error('User not authenticated!');
        }

        const user = await User.findById(auth.userId);
        if (!user) {
          return new Error('User not found!');
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
        return error;
      }
    },
  },
};
