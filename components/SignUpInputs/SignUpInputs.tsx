import React, { useState } from "react";

import { motion } from "framer-motion";
import MusicPreferences from "../MusicPreferences/MusicPreferences";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./styles.module.css";
type Props = {
  hideUserNameInput: boolean;
  hideEmailInput: boolean;
  hidePasswordInput: boolean;
  signUpCompleted: boolean;
  getUserName: Function;
  getEmail: Function;
  getPassword: Function;
  changeInputUserName: Function;
  changeInputEmail: Function;
  changeInputPassword: Function;
};

const SignUpInputs = ({
  hideUserNameInput,
  hideEmailInput,
  hidePasswordInput,
  signUpCompleted,
  getUserName,
  getEmail,
  getPassword,
  changeInputUserName,
  changeInputEmail,
  changeInputPassword,
}: Props) => {
  return (
    <>
      <>
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
      </>
      <MusicPreferences signUpCompleted={signUpCompleted} />
    </>
  );
};

export default SignUpInputs;
