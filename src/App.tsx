import "./index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksSlice } from "./reducers/Tasks";

import { store } from "./store/store";

import TasksDisplay from "./components/TasksDisplay/TasksDisplay";
import { Outlet } from "react-router";

import { State } from "./types";

type AppDispatch = typeof store.dispatch;

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksSlice.actions.initSettings());

    dispatch(tasksSlice.actions.getTasks());
    dispatch(tasksSlice.actions.getSettings());
  }, []);

  const tasks = useSelector((state: State) => state.tasks.tasks);
  const theme = useSelector((state: State) => {
    const settings = state.tasks.settings;

    for (const index in settings) {
      if (settings[index].name === "theme") return settings[index].value;
    }
  });

  useEffect(() => {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="container">
      <>
        <TasksDisplay />
        {tasks.length !== 0 ? <Outlet /> : <></>}
      </>
    </div>
  );
}

export default App;
