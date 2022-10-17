import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

import styles from "./styles.module.css";

type Props = {
  signUpFailed: boolean;
  username: string;
  email: string;
  password: string;
  getUserName: Function;
  getEmail: Function;
  getPassword: Function;
};

const SignUpFailed = ({
  signUpFailed,
  username,
  email,
  password,
  getUserName,
  getEmail,
  getPassword,
}: Props) => {
  //validation
  const validUsername = username.length < 5;
  const emailCheck =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const validEmail = emailCheck.test(email);
  const passwordExpression =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
  const validPassword = passwordExpression.test(password);

  return (
    <form className={signUpFailed ? styles.formFailed : styles.hide}>
      <section className={styles.sectionInputs}>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            getUserName(e);
          }}
          // value={username}
          placeholder="Introduce your username"
        />
        <label className={validUsername ? styles.label : styles.hide}>
          Username must be at least 5 characters long
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            getEmail(e);
          }}
          placeholder="Introduce your email"
        />
        <label className={validEmail ? styles.hide : styles.label}>
          Email must be valid
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            getPassword(e);
          }}
          placeholder="Introduce your password"
        />
        <label className={validPassword ? styles.hide : styles.label}>
          Password must have a minimum of 8 characters, 1 upper case, 1 number
          and 1 special character
        </label>
      </section>

      <section className={styles.googleLogin}>
        <GoogleIcon />
        <span>Continue with Google</span>
      </section>

      <button className={styles.googleLogin}>Sign Up</button>
    </form>
  );
};

export default SignUpFailed;
