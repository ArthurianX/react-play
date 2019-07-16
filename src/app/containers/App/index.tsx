import * as React from 'react';
import * as style from './style.css';
// import { connect } from 'react-redux';
// @ts-ignore
import { connect } from 'beautiful-react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { Header, TodoList, Footer } from 'app/components';
import { ThemeSwitcher } from 'app/components/ThemeSwitcher';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    theme: RootState.ThemeState;
    actions: TodoActions;
    filter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState, ownProps: any): Pick<App.Props, 'todos' | 'filter' | 'theme'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, filter, theme: state.theme };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleExportAll = this.handleExportAll.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleExportAll(): void {
    // const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    this.props.actions.exportAll(this.props.todos);
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    console.log(this.props);
    const { todos, actions, filter, theme } = this.props;
    const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div>
        <div className={style.normal}>
          <Header addTodo={actions.addTodo} />
          <TodoList todos={filteredTodos} actions={actions} />
          <Footer
            filter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClickClearCompleted={this.handleClearCompleted}
            onClickExportAll={this.handleExportAll}
            onClickFilter={this.handleFilterChange}
          />
        </div>
        <ThemeSwitcher switchTheme={actions.toggleTheme} theme={theme} />
      </div>
    );
  }
}
