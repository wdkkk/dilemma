import { ReactNode } from "react";
import s from "./Button.module.scss";

type Props = {
  children: ReactNode;
  clickFunction: () => void;
};

const Button = (props: Props) => {
  return (
    <div className={s.button} onClick={props.clickFunction}>
      {props.children}
    </div>
  );
};

export default Button;
