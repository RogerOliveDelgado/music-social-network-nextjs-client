import React, { useState } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import MusicPreferences from "../MusicPreferences/MusicPreferences";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.css";
type Props = {
  username: string;
  email: string;
  password: string;
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
  username,
  email,
  password,
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
  //validation
  const validUsername = username.length < 5;
  const emailCheck =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const validEmail = emailCheck.test(email);
  const passwordExpression =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
  const validPassword = passwordExpression.test(password);

  //react hooks
  const [signUpFailed, setSignUpFailed] = useState(true);

  //next router
  const router = useRouter();

  //*Sign up function/
  const signUp = (
    username: String,
    email: String,
    password: String,
    likedMusic: string[],
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (likedMusic.length < 5) {
      toast.error("Please select 5 genres or more.");
    } else {
      toast.promise(router.push("/home"), {
        loading: "Goooing...",
        success: <b>Here we are!</b>,
        error: <b>Oops, something goes bad :(</b>,
      });
    }
  };

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
          <section className={styles.section_div}>
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
              className={validUsername ? styles.hide : styles.nextButton}
            >
              <ArrowForwardIosIcon />
            </button>
          </section>
          <p className={validUsername ? styles.pHint : styles.hide}>
            Username must be at least 5 characters long
          </p>
        </motion.div>
        <motion.div
          className={
            !hideEmailInput
              ? `${styles.no_hide} ${styles.form_div}`
              : `${styles.hide}`
          }
        >
          <section className={styles.section_div}>
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
              className={!validEmail ? styles.hide : styles.nextButton}
            >
              <ArrowForwardIosIcon />
            </button>
          </section>
          <p className={!validEmail ? styles.pHint : styles.hide}>
            Email must be valid
          </p>
        </motion.div>
        <motion.div
          className={
            !hidePasswordInput
              ? `${styles.no_hide} ${styles.form_div}`
              : `${styles.hide}`
          }
        >
          <section className={styles.section_div}>
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
              className={!validPassword ? styles.hide : styles.nextButton}
            >
              <ArrowForwardIosIcon />
            </button>
          </section>
          <p className={!validPassword ? styles.pHint : styles.hide}>
            Password must have a minimum of 8 characters, 1 upper case, 1 number
            and 1 special character
          </p>
        </motion.div>
      </>
      <MusicPreferences
        getUserName={getUserName}
        getEmail={getEmail}
        getPassword={getPassword}
        signUpCompleted={signUpCompleted}
        signUpFailed={signUpFailed}
        username={username}
        email={email}
        password={password}
        signUp={signUp}
      />
      <Toaster />
    </>
  );
};

export default SignUpInputs;
