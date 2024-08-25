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

type Drag = {
  active: boolean;
  x: number;
};

const TasksDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state: State) => state.tasks.tasks);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [newTaskName, setNewTaskName] = useState<string>("");

  const [drag, setDrag] = useState<Drag>({
    active: false,
    x: 0,
  });

  const [dims, setDims] = useState({
    width: 440,
  });

  const boxStyle = {
    width: `${dims.width}px`,
  };
  const componentStyle = {
    cursor: "w-resize",
    userSelect: "none",
  };

  const startResize = (e: { clientX: number }) => {
    setDrag({
      active: true,
      x: e.clientX,
    });
  };

  const resizeFrame = (e: { clientX: number }) => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newW = x > e.clientX ? dims.width - xDiff : dims.width + xDiff;

      if (dims.width >= 1000) {
        if (newW < dims.width) {
          setDrag({ ...drag, x: e.clientX });
          setDims({ width: newW });
        }
      } else if (dims.width <= 440) {
        if (newW > dims.width) {
          setDrag({ ...drag, x: e.clientX });
          setDims({ width: newW });
        }
      } else {
        setDrag({ ...drag, x: e.clientX });
        setDims({ width: newW });
      }
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

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
    <div
      className={s.wrapper}
      style={drag.active ? componentStyle : undefined}
      onMouseMove={resizeFrame}
      onMouseLeave={stopResize}
      onMouseUp={stopResize}
    >
      <div className={s.content} style={boxStyle}>
        <div className={s.resizeLineWrapper} onMouseDown={startResize}>
          <div className={s.resizeLine}></div>
        </div>
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
      </div>
      <Modal status={modalStatus} setStatus={setModalStatus}>
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
