import React, { useState } from "react";

import { motion } from "framer-motion";
import MusicPreferences from "../MusicPreferences/MusicPreferences";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./styles.module.css";

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
    }
  };

  return (
    <div className={styles.formStyles}>
      <div
        className={signUpCompleted ? `${styles.hide}` : `${styles.no_hide} `}
      >
        <motion.div
          className={
            hideUserNameInput
              ? `${styles.hide} `
              : `${styles.no_hide} ${styles.form_div}`
          }
        >
          <input
            type="text"
            onChange={(e) => {
              getUserName(e);
            }}
            placeholder="Introduce your username"
            className={styles.inputs}
          />
          <button
            onClick={(e) => {
              changeInputUserName(e);
            }}
            className={styles.nextButton}
          >
            <ArrowForwardIosIcon />
          </button>
        </motion.div>
        <motion.div
          className={
            !hideEmailInput
              ? `${styles.no_hide} ${styles.form_div}`
              : `${styles.hide}`
          }
        >
          <input
            type="email"
            onChange={(e) => {
              getEmail(e);
            }}
            placeholder="Introduce your email"
            className={styles.inputs}
          />
          <button
            onClick={(e) => {
              changeInputEmail(e);
            }}
            className={styles.nextButton}
          >
            <ArrowForwardIosIcon />
          </button>
        </motion.div>
        <motion.div
          className={
            !hidePasswordInput
              ? `${styles.no_hide} ${styles.form_div}`
              : `${styles.hide}`
          }
        >
          <input
            type="password"
            onChange={(e) => {
              getPassword(e);
            }}
            placeholder="Introduce your password"
            className={styles.inputs}
          />
          <button
            onClick={(e) => {
              changeInputPassword(e);
            }}
            className={styles.nextButton}
          >
            <ArrowForwardIosIcon />
          </button>
        </motion.div>
      </div>
      <MusicPreferences signUpCompleted={signUpCompleted} />
    </div>
  );
};

export default SignUpComponents;
