import { useState } from "react";

import { State } from "../../types";

import InputText from "../../UI/InputText/InputText";
import TaskDisplayButton from "../TaskDisplayButton/TaskDisplayButton";

import { useSelector } from "react-redux";

import s from "./TasksDisplay.module.scss";
const TasksDisplay = () => {
  const tasks = useSelector((state: State) => state.Tasks.tasks);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<string[]>(tasks);

  const searchChangeHandler = (value: string) => {
    setSearchQuery(value);

    if (value === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) =>
          task.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.contentWrapper}>
        <div className={s.searchWrapper}>
          <InputText
            placeholder="Search"
            value={searchQuery}
            changeHandler={searchChangeHandler}
          />
        </div>

        <div className={s.taskListWrapper}>
          {filteredTasks.map((task) => (
            <TaskDisplayButton>{task}</TaskDisplayButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksDisplay;
