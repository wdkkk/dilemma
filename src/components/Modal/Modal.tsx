import { Dispatch, ReactNode, SetStateAction } from "react";
import s from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
};

const Modal = (props: Props) => {
  return (
    <>
      {props.status ? (
        <div className={s.wrapper} onClick={() => props.setStatus(false)}>
          <div className={s.content} onClick={(e) => e.stopPropagation()}>
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
