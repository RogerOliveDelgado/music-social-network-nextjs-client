import React, { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { logIn } from "../../services/user";

import { useAuthContext } from "../../context/AuthContext";

import styles from "./styles.module.css";

type Props = {};

const LoginInputs = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkData = async (
    email: any,
    password: any,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data = await logIn(email, password, e);

    if (data.ok) {
      toast.promise(router.push("/home"), {
        loading: "Goooing...",
        success: <b></b>,
        error: <b></b>,
      });
    } else {
      toast.error("Oops, something went wrong!");
    }
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

      <Toaster />

      <button
        className={styles.loginButton}
        onClick={(e) => {
          checkData(email, password, e);
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginInputs;
