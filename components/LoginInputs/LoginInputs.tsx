import React, { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useCookies } from "react-cookie";

import styles from "./styles.module.css";
import { useI18N } from "../../context/i18";

type Props = {};

const LoginInputs = (props: Props) => {
  const { t } = useI18N();

  const router = useRouter();

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const [seePassword, setSeePassword] = useState<boolean>();

  const [cookies, setCookie] = useCookies(["userToken", "username", "userID"]);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const showPassword = () => {
    seePassword ? setSeePassword(false) : setSeePassword(true);
  };

  const logIn = async (
    email: String,
    password: String,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.status === 400) {
        const result = await response.json();
        toast.error(t('toast').error);
      }

      if (response.ok) {
        const result = await response.json();

        setCookie("userToken", result.data.token, { path: "/" });
        setCookie("username", result.data.username, { path: "/" });
        setCookie("userID", result.data.id, { path: "/" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={(e) => {
        logIn(email, password, e);
      }}
    >
      <input
        placeholder={`${t("login").email}`}
        type="email"
        className={styles.loginInput}
        onChange={getEmail}
      />
      {/* <input
        type="email"
        placeholder="Introduce your email"
        className={styles.loginInput}
      /> */}
      <div className={` ${styles.loginDivInput}`}>
        <input
          placeholder={`${t("login").password}`}
          onChange={getPassword}
          type={seePassword ? "text" : "password"}
          className={styles.passwordInput}
        />
        {/* <input
          type={seePassword ? "text" : "password"}
          onChange={getPassword}
          placeholder="Introduce your password"
          className={`${styles.loginInput} ${styles.noBorder}`}
        /> */}

        {seePassword ? (
          <VisibilityOffIcon onClick={showPassword} />
        ) : (
          <VisibilityIcon onClick={showPassword} />
        )}
      </div>

      <Toaster />

      <button className={styles.buttonLogin}>
        <span className={styles.label}>{`${t("login").login}`}</span>
        <span className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </span>
      </button>

      {/* <button className={styles.loginButton}>Log In</button> */}
    </form>
  );
};

export default LoginInputs;
