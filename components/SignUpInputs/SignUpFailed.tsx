import React from "react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import toast, { Toaster } from "react-hot-toast";

import styles from "./styles.module.css";
import { createUser } from "../../services/user";

type Props = {
  signUpFailed: boolean;
  username: string;
  email: string;
  password: string;
  likedMusic: string[];
  getUserName: Function;
  getEmail: Function;
  getPassword: Function;
  failedMsg: string;
  setCookie: Function;
  setSignUpFailed: Function;
  setFailedMsg: Function;
};

const SignUpFailed = ({
  signUpFailed,
  username,
  email,
  password,
  likedMusic,
  getUserName,
  getEmail,
  getPassword,
  failedMsg,
  setCookie,
  setSignUpFailed,
  setFailedMsg,
}: Props) => {
  //validation
  const validUsername = username.length < 5;
  const emailCheck =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  const validEmail = emailCheck.test(email);
  const passwordExpression =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
  const validPassword = passwordExpression.test(password);

  const router = useRouter();

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
      <form className={signUpFailed ? styles.formFailed : styles.hide}>
        <span>{failedMsg}</span>
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

        <button
          className={styles.googleLogin}
          onClick={(e) => {
            signUp(username, email, password, likedMusic, e);
          }}
        >
          Sign Up
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default SignUpFailed;
