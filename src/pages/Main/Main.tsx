import TasksDisplay from "../../components/TasksDisplay/TasksDisplay";
import s from "./Main.module.scss";

const Main = () => {
  return (
    <div className={s.wrapper}>
      <TasksDisplay />
    </div>
  );
};

export default Main;
