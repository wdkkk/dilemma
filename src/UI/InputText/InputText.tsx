import s from "./InputText.module.scss";

type Props = {
  placeholder: string;
};

const InputText = (props: Props) => {
  return (
    <input type="text" className={s.input} placeholder={props.placeholder} />
  );
};

export default InputText;
