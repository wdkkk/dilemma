import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { CSSProperties } from "react";

import s from "./Alert.module.scss";

type Props = {
  children: ReactNode;
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
};

const Alert = ({ children, status, setStatus }: Props) => {
  const [opacity, setOpacity] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(status);

  const styles: CSSProperties = {
    opacity: opacity,
  };

  useEffect(() => {
    if (status) {
      setIsVisible(true);
      setTimeout(() => {
        setOpacity(1);
      }, 300);

      setTimeout(() => {
        setOpacity(0);
      }, 2000);
      setTimeout(() => {
        setStatus(false);
        setIsVisible(false);
      }, 2500);
    }
  }, [status]);

  return isVisible ? (
    <div className={s.wrapper}>
      <div style={styles} className={s.content}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
