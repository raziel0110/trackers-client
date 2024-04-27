import { ChangeEvent, ReactElement } from "react";

type InputProps = {
  type: "text" | "password" | "email";
  field: string;
  onChange: (field: string, value: string) => void;
  userInput: string;
  required: boolean;
}

const Input = ({type, field, onChange, userInput, required = false}: InputProps): ReactElement => {

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.name, e.target.value)
  }

  return (
    <div className="w-full">
      <label htmlFor={field.toLowerCase()} className="block font-bold text-xl py-2 text-orange-500">{field}</label>
      <input 
        type={type} 
        name={field.toLowerCase()}
        value={userInput}
        onChange={handleOnChange}
        required={required}
        className="w-full h-10 bg-gray-50 leading-5 text-lg mb-1 pl-2 border-2 border-orange-500 rounded"
      />
    </div>
  );
}

export default Input;