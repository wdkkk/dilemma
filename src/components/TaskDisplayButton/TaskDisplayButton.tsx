import s from "./TaskDisplayButton.module.scss";

import { State, Task } from "../../types";
import { tasksSlice } from "../../reducers/tasks";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";

type Props = {
  task: Task;
};

type ButtonState = "default" | "selected";

const TaskDisplayButton = ({ task }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedTaskId = useSelector(
    (state: State) => state.tasks.openedTaskId
  );
  const [buttonType, setButtonType] = useState<ButtonState>("default");
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTaskId === task.id) setButtonType("selected");
    else setButtonType("default");
  }, [selectedTaskId]);

  const getTaskIdFromUrl = (url: string): number => parseInt(url.split("/")[2]);

  return (
    <div
      className={`${buttonType === "default" ? s.default : s.selected}`}
      onClick={() => {
        setTimeout(() => {
          dispatch(tasksSlice.actions.openTask({ openedTaskId: task.id }));
          navigate(`/tasks/${task.id}`);
        }, 200);
      }}
    >
      <div>{task.title}</div>

      <div
        className={s.deleteButton}
        onClick={(e) => {
          e.stopPropagation();

          setModalStatus(true);
        }}
      >
        <div className={s.deleteButtonChild}></div>
        <div className={s.deleteButtonChild}></div>
      </div>
      <Modal status={modalStatus} setStatus={setModalStatus}>
        <div className={s.modalText}>
          You are sure you want to delete task <span>"{task.title}"</span>?
        </div>

        <div className={s.modalButtonRow}>
          <div className={s.modalButtonWrapper}>
            <Button
              clickFunction={() => {
                const id = task.id;
                const openedTaskId = getTaskIdFromUrl(location.pathname);

                if (id === openedTaskId) {
                  navigate("/");
                  dispatch(tasksSlice.actions.deleteTask({ id }));
                } else {
                  dispatch(tasksSlice.actions.deleteTask({ id }));
                }
              }}
            >
              Yes
            </Button>
          </div>
          <div className={s.modalButtonWrapper}>
            <Button clickFunction={() => setModalStatus(false)}>No</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDisplayButton;
