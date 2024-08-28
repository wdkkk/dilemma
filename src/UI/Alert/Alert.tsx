import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import s from "./Alert.module.scss";

type Props = {
  children: ReactNode;
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
};

const Alert = ({ children, status, setStatus }: Props) => {
  if (status) {
    setTimeout(() => {
      setStatus(false);
    }, 2000);
  }

  return status ? (
    <div className={s.wrapper}>
      <div className={s.content}>{children}</div>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
