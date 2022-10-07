import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.css";
import { Children } from "../../interfaces/interfaces";

function Layout({ children }: Children) {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
