import s from "./Select.module.scss";

type Props = {
  options: Array<string | number>;
  defaultValue: string | number;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ options, defaultValue, onChangeHandler }: Props) => {
  return (
    <select
      onChange={onChangeHandler}
      defaultValue={defaultValue}
      className={s.Select}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
