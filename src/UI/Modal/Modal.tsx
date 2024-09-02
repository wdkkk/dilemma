import {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import s from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
};

const Modal = (props: Props) => {
  const [opacity, setOpacity] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(props.status);

  const styles: CSSProperties = {
    opacity: opacity,
  };

  useEffect(() => {
    if (props.status) {
      setIsVisible(true);
      setTimeout(() => {
        setOpacity(1);
      }, 100);

    } else {
      setOpacity(0);
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [props.status]);

  return (
    <>
      {isVisible ? (
        <div className={s.wrapper} onClick={() => props.setStatus(false)}>
          <div
            style={styles}
            className={s.content}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
