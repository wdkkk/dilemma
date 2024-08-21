import "./index.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tasksSlice } from "./reducers/tasks";
import { store } from "./store/store";

import TasksDisplay from "./components/TasksDisplay/TasksDisplay";
import { Outlet } from "react-router";

type AppDispatch = typeof store.dispatch;

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksSlice.actions.getTasks());
  }, []);

  return (
    <div className="container">
      <TasksDisplay />
      <Outlet />
    </div>
  );
}

export default App;
