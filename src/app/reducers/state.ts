import { TodoModel } from 'app/models';

export interface RootState {
  todos: RootState.TodoState;
  theme: RootState.ThemeState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type ThemeState = boolean | 1 | 0;
}
