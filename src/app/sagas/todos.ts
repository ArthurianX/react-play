import { takeEvery/* , call, put, takeLatest */ } from 'redux-saga/effects'
import { TodoActions } from '../actions/todos';
import { CustomAction, TodoModel } from '../models/TodoModel';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* exportTODOs(action: CustomAction): any {
   try {
      // const user = yield call(Api.fetchUser, action.payload.userId);
      const rows = action.payload.map( (row: TodoModel) => {
        return [row.id, row.completed, row.text];
      })

      rows.unshift(['id', 'complete', 'text']);

      let csvContent = "data:text/csv;charset=utf-8,"
          + rows.map((e: any) => e.join(",")).join("\n");

      console.log('rows', rows, 'csvContent', csvContent);
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
      // const user = {name: 'mumu'}
      // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* myExportSaga() {
  yield takeEvery(TodoActions.exportAll, exportTODOs);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default myExportSaga;