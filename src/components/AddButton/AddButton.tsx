import { Dispatch, SetStateAction } from "react";
import s from "./AddButton.module.scss";

type Props = {
  setModalStatus: Dispatch<SetStateAction<boolean>>;
};

const AddButton = (props: Props) => {
  return (
    <div className={s.button} onClick={() => props.setModalStatus(true)}>
      <div></div>
      <div></div>
    </div>
  );
};

export default AddButton;
