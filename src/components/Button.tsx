import { ReactElement } from "react";
import Loader from "./Loader";

type ButtonProps = {
  children: string;
  loading: boolean;
  type: "submit" | "button" | "reset" | undefined;
  disabled: boolean
}

const Button = (props: ButtonProps): ReactElement => {
  const {children, type, loading, disabled} = props;
  return (
    <div>
      <button 
        type={type} 
        disabled={disabled} 
        className="bg-orange-400 h-12 p-2 text-center text-base mt-8 w-full rounded flex justify-center hover:bg-orange-500 transition-all ease-in">
        <span className="block text-white text-lg font-bold">
          {loading && (
            <span className="spinner mr-2 text-center mt-1">
              <Loader />
            </span>
          )}
          {children}
        </span>
      </button>
    </div>
  )
}

export default Button;