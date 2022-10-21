import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { motion } from "framer-motion";
import MusicPreferences from "../MusicPreferences/MusicPreferences";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.css";
import { createUser } from "../../services/user";
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
  signUpFailed: boolean;
  setSignUpFailed: Function;
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
  setSignUpFailed,
  signUpFailed,
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

  const [failedMsg, setFailedMsg] = useState(String);
  const [cookies, setCookie] = useCookies(["userToken"]);

  const [seePassword, setSeePassword] = useState<boolean>();
  const showPassword = () => {
    seePassword ? setSeePassword(false) : setSeePassword(true);
  };

  //next router
  const router = useRouter();

  //*Sign up function/
  const signUp = async (
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
      const result = await createUser(
        username,
        email,
        password,
        likedMusic,
        setCookie,
        e
      );

      if (!result.ok) {
        if (result.msg === "User already exists") {
          setSignUpFailed(true);
          setFailedMsg("Email is in use");
          router.push("/signup");
        }

        if (
          result.msg === "Username is already used. Please select a new one."
        ) {
          setSignUpFailed(true);
          setFailedMsg("Username is in use");
          router.push("/signup");
        }
      } else {
        toast.promise(router.push("/"), {
          loading: "Goooing...",
          success: <b>Here we are!</b>,
          error: <b>Oops, something goes bad :(</b>,
        });
      }
    }
  };

  return (
    <>
      <div className={signUpFailed ? styles.hide : styles.none}>
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
              type={seePassword ? "text" : "password"}
              onChange={(e) => {
                getPassword(e);
              }}
              placeholder="Introduce your password"
              className={styles.inputs}
            />
            {seePassword ? (
              <VisibilityOffIcon onClick={showPassword} />
            ) : (
              <VisibilityIcon onClick={showPassword} />
            )}
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
      </div>
      <MusicPreferences
        getUserName={getUserName}
        getEmail={getEmail}
        getPassword={getPassword}
        signUpCompleted={signUpCompleted}
        signUpFailed={signUpFailed}
        setSignUpFailed={setSignUpFailed}
        username={username}
        email={email}
        password={password}
        signUp={signUp}
        failedMsg={failedMsg}
        setCookie={setCookie}
        setFailedMsg={setFailedMsg}
      />
      <Toaster />
    </>
  );
};

export default SignUpInputs;
