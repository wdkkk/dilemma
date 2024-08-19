import "./index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./reducers/tasks";
import { State } from "./types";
import { store } from "./store/store";

import TasksDisplay from "./components/TasksDisplay/TasksDisplay";
import { Outlet } from "react-router";

function App() {
  type AppDispatch = typeof store.dispatch;
  const dispatch: AppDispatch = useDispatch();
  const queryStatus = useSelector((state: State) => state.tasks.status);

  useEffect(() => {
    if (queryStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [queryStatus, dispatch]);

  return (
    <div className="container">
      <TasksDisplay />
      <Outlet />
    </div>
  );
}

export default App;
