import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./styles.module.css";

type Props = {};

const LoginInputs = (props: Props) => {
  return (
    <form className={styles.loginForm}>
      <input
        type="email"
        placeholder="Introduce your email"
        className={styles.loginInput}
      />
      <div className={` ${styles.loginDivInput}`}>
        <input
          type="password"
          placeholder="Introduce your password"
          className={`${styles.loginInput} ${styles.noBorder}`}
        />
        <VisibilityIcon />
      </div>

      <button type="submit" className={styles.loginButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginInputs;
