import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { logIn } from "../../services/user";

import styles from "./styles.module.css";

type Props = {};

const LoginInputs = (props: Props) => {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className={styles.loginForm}>
      <input
        type="email"
        onChange={getEmail}
        placeholder="Introduce your email"
        className={styles.loginInput}
      />
      <div className={` ${styles.loginDivInput}`}>
        <input
          type="password"
          onChange={getPassword}
          placeholder="Introduce your password"
          className={`${styles.loginInput} ${styles.noBorder}`}
        />
        <VisibilityIcon />
      </div>

      <button
        className={styles.loginButton}
        onClick={(e) => {
          logIn(email, password, e);
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginInputs;
