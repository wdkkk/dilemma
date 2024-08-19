import { ReactNode } from "react";
import s from "./TaskDisplayButton.module.scss";
import { useNavigate } from "react-router";
import { Task } from "../../types";

type Props = {
  task: Task;
  // ref: RefObject<unknown>;
};

type ButtonState = "default" | "selected";

const buttonType: ButtonState = "default";

const TaskDisplayButton = ({ task }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className={`${buttonType === "default" ? s.default : s.selected}`}
    >
      {task.title}
    </div>
  );
};

export default TaskDisplayButton;
