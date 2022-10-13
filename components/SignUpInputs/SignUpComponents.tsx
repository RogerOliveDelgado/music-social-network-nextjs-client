import { useState } from "react";
import SignUpInputs from "./SignUpInputs";

type Props = {};

const SignUpComponents = (props: Props) => {
  const [hideUserNameInput, setHideUserNameInput] = useState(false);
  const [hideEmailInput, setHideEmailInput] = useState(true);
  const [hidePasswordInput, setHidePasswordInput] = useState(true);

  const [username, setUserName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const getUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const getEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const getPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const changeInputUserName = (e: any) => {
    e.preventDefault();
    setHideUserNameInput(true);
    setHideEmailInput(false);
  };
  const changeInputEmail = (e: any) => {
    e.preventDefault();
    setHideEmailInput(true);
    setHidePasswordInput(false);
  };
  const changeInputPassword = (e: any) => {
    e.preventDefault();
    setHidePasswordInput(true);

    if (username.length !== 0 && email.length !== 0 && password.length !== 0) {
      return setSignUpCompleted(true);
    } else {
      return setSignUpCompleted(false);
    }
  };

  return (
    <SignUpInputs
      hideUserNameInput={hideUserNameInput}
      hideEmailInput={hideEmailInput}
      hidePasswordInput={hidePasswordInput}
      signUpCompleted={signUpCompleted}
      getUserName={getUserName}
      getEmail={getEmail}
      getPassword={getPassword}
      changeInputUserName={changeInputUserName}
      changeInputEmail={changeInputEmail}
      changeInputPassword={changeInputPassword}
    />
  );
};

export default SignUpComponents;
