import React from "react";
import Navbar from "../Navbar/Navbar";
import Player from "../Player/Player";
import SearchAppBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./styles.module.css";
import { Children } from "../../interfaces/interfaces";

function Layout({ children }: Children) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Sidebar />
        <SearchAppBar />
        <Navbar />
      </div>
      {children}
    </div>
  );
}

export default Layout;
