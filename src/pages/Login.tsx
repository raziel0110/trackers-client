import React, { ReactElement, useState } from "react";
import './Login.css';
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

type UserProp = {
  email: string;
  password: string;
}

const Login = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userInputs, setUserInputs] = useState<UserProp>({
    email: '',
    password: '',
  });

  const isDisabled = loading || !(userInputs.email && userInputs.password);
  const navigate = useNavigate();
  const {onLogin, authState, error}: any = useAuth();

  const handleChange = (field: string, value:string): void => {
    setUserInputs((prevInput) => {
      return {
        ...prevInput,
        [field]: value
      }
    });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    onLogin(userInputs.email, userInputs.password);
    setLoading(false);
  }

  return (
    <main className="bg-white w-2/4 h-2/3 p-12 relative mt-32 left-1/4">
      <h1 className="text-3xl font-semibold text-center">Login</h1>
      {error && <p>{error}</p>}
      <div className="p-3 w-full">
        <form onSubmit={handleSubmit}>
          <Input type="email" field="Email" onChange={handleChange} userInput={userInputs.email} required={true}/>
          <Input type="password" field="Password" onChange={handleChange} userInput={userInputs.password} required={true}/>
          <Button loading={loading} disabled={isDisabled} type="submit">
            LOGIN
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;