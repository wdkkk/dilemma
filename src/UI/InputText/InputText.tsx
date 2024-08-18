import s from "./InputText.module.scss";

type Props = {
  placeholder: string;
  value: string;
  changeHandler: (value: string) => void;
};

const InputText = (props: Props) => {
  return (
    <input
      type="text"
      className={s.input}
      value={props.value}
      onChange={(e) => props.changeHandler(e.target.value)}
      placeholder={props.placeholder}
    />
  );
};

export default InputText;
