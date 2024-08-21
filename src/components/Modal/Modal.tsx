import { Dispatch, ReactNode, SetStateAction } from "react";
import s from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  status: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
};

const Modal = (props: Props) => {
  return (
    <>
      {props.status ? (
        <div className={s.wrapper} onClick={() => props.setModalStatus(false)}>
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
