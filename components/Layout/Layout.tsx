import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.css";
import { Children } from "../../interfaces/interfaces";
import { useCookies } from "react-cookie";

function Layout({ children }: Children) {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
    'username',
  ]);
  const [userMessage, setUserMessage] = useState<number>(0)
  return (
    <>
      <Navbar userMessage={userMessage}/>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main} userMessage={setUserMessage}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
