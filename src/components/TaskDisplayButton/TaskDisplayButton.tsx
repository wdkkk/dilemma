import s from "./TaskDisplayButton.module.scss";
import { useNavigate } from "react-router";
import { State, Task } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { tasksSlice } from "../../reducers/tasks";
import { useEffect, useState } from "react";

type Props = {
  task: Task;
  // ref: RefObject<unknown>;
};

type ButtonState = "default" | "selected";

const TaskDisplayButton = ({ task }: Props) => {
  const dispatch = useDispatch();

  const selectedTaskId = useSelector(
    (state: State) => state.tasks.openedTaskId
  );
  const [buttonType, setButtonType] = useState<ButtonState>("default");

  useEffect(() => {
    if (selectedTaskId === task.id) setButtonType("selected");
    else setButtonType("default");
  }, [selectedTaskId]);

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        dispatch(tasksSlice.actions.openTask({ openedTaskId: task.id }));
        navigate(`/tasks/${task.id}`);
      }}
      className={`${buttonType === "default" ? s.default : s.selected}`}
    >
      {task.title}
    </div>
  );
};

export default TaskDisplayButton;
