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
import Select from "../../UI/Select/Select";

type Drag = {
  active: boolean;
  x: number;
};

const TasksDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state: State) => state.tasks.tasks);
  const settings = useSelector((state: State) => state.tasks.settings);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [settingsModalStatus, setSettingsModalStatus] =
    useState<boolean>(false);
  const [confirmDeleteModalStatus, setConfirmDeleteModalStatus] =
    useState<boolean>(false);

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
        <div className={s.settingsWrapper}>
          <div
            className={s.settingsButton}
            onClick={() => {
              setSettingsModalStatus(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              className={s.settingsIcon}
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </g>
            </svg>
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

      <Modal status={settingsModalStatus} setStatus={setSettingsModalStatus}>
        <div className={s.settingsTitle}>Settings</div>
        <div className={s.settingsModalContent}>
          {(() => {
            const options = [];

            for (const key in settings) {
              options.push(
                <div
                  className={s.settingsModalElement}
                  key={settings[key].name}
                >
                  <div className={s.settingsModalOptionTitle}>
                    {settings[key].name}:
                  </div>
                  <div className={s.settingsModalOptionValue}>
                    <Select
                      onChangeHandler={(e) => {
                        const obj = {
                          name: settings[key].name,
                          value: e.target.value,
                        };

                        dispatch(
                          tasksSlice.actions.handleSettingsValueChange({
                            option: obj,
                            key: key,
                          })
                        );
                      }}
                      defaultValue={settings[key].value}
                      options={settings[key].options}
                    />
                  </div>
                </div>
              );
            }

            return options;
          })()}
        </div>
        <div className={s.settingsModalResetButtonWrapper}>
          <Button
            clickFunction={() => {
              setSettingsModalStatus(false);
              setConfirmDeleteModalStatus(true);
            }}
          >
            Delete localStorage data
          </Button>
        </div>
      </Modal>

      <Modal
        status={confirmDeleteModalStatus}
        setStatus={setConfirmDeleteModalStatus}
      >
        <div className={s.modalText}>
          You are sure you want to delete all tasks and settings data?
        </div>

        <div className={s.modalButtonRow}>
          <div className={s.modalButtonWrapper}>
            <Button
              clickFunction={() => {
                setConfirmDeleteModalStatus(false);

                dispatch(tasksSlice.actions.deleteLocalStorageData());
                dispatch(tasksSlice.actions.initSettings());
              }}
            >
              Yes
            </Button>
          </div>
          <div className={s.modalButtonWrapper}>
            <Button
              clickFunction={() => {
                setSettingsModalStatus(false);
                setConfirmDeleteModalStatus(false);
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksDisplay;
