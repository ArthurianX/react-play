import { Action } from "redux";

/** TodoMVC model definitions **/

export interface TodoModel {
  id: number;
  text: string;
  completed: boolean;
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}

export interface CustomAction extends Action {
  type: string;
  payload?: any;
}


