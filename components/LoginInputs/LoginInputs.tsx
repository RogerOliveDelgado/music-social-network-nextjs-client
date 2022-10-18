import React, { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCookies } from "react-cookie";

import styles from "./styles.module.css";

type Props = {};

const LoginInputs = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const [cookies, setCookie] = useCookies(["userToken"]);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const logIn = async (
    email: String,
    password: String,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 400) {
        const result = await response.json();
        console.log("aqui", result);
        toast.error("Oops, something went wrong!");
      }

      if (response.ok) {
        const result = await response.json();
        setCookie("userToken", result.data, { path: "/" });
        toast.promise(router.push("/es"), {
          loading: "Goooing...",
          success: <b></b>,
          error: <b></b>,
        });
      }
    } catch (error) {
      console.error("klk", error);
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
          logIn(email, password, e);
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginInputs;
