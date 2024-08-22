import "./index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksSlice } from "./reducers/tasks";
import { store } from "./store/store";

import TasksDisplay from "./components/TasksDisplay/TasksDisplay";
import { Outlet } from "react-router";

import { State } from "./types";

type AppDispatch = typeof store.dispatch;

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksSlice.actions.getTasks());
  }, []);

  const tasks = useSelector((state: State) => state.tasks.tasks);

  return (
    <div className="container">
      {tasks.length !== 0 ? (
        <>
          <TasksDisplay />
          <Outlet />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default App;
