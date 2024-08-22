import { State, Task } from "../../types";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { tasksSlice } from "../../reducers/tasks";

import AddButton from "../AddButton/AddButton";
import Modal from "../Modal/Modal";
import Button from "../../UI/Button/Button";
import InputText from "../../UI/InputText/InputText";
import TaskDisplayButton from "../TaskDisplayButton/TaskDisplayButton";

import s from "./TasksDisplay.module.scss";

const TasksDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state: State) => state.tasks.tasks);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [newTaskName, setNewTaskName] = useState<string>("");

  const searchChangeHandler = (value: string) => {
    setSearchQuery(value);

    if (value === "") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const newTaskNameHandler = (value: string) => {
    setNewTaskName(value);
  };

  const addTaskButtonHandler = () => {
    if (newTaskName) {
      const obj = {
        id: Date.now(),
        title: newTaskName,
        content: "",
      };

      dispatch(tasksSlice.actions.addTask({ obj }));

      setNewTaskName("");

      setModalStatus(false);
      dispatch(tasksSlice.actions.openTask({ openedTaskId: obj.id }));
      navigate(`/tasks/${obj.id}`);
    } else {
      alert("Empty name");
    }
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className={s.wrapper}>
      <div className={s.contentWrapper}>
        <div className={s.searchWrapper}>
          <div className={s.inputTextWrapper}>
            <InputText
              placeholder="Search"
              value={searchQuery}
              changeHandler={searchChangeHandler}
            />
          </div>
          <div className={s.addButtonWrapper}>
            <AddButton setModalStatus={setModalStatus} />
          </div>
        </div>

        <div className={s.taskListWrapper}>
          {filteredTasks.map((task) => (
            <TaskDisplayButton task={task} key={task.id} />
          ))}
        </div>
      </div>

      <Modal status={modalStatus} setModalStatus={setModalStatus}>
        <InputText
          value={newTaskName}
          placeholder="New task name"
          changeHandler={newTaskNameHandler}
        />
        <div className={s.modalButtonWrapper}>
          <Button clickFunction={addTaskButtonHandler}>Create new task</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TasksDisplay;
