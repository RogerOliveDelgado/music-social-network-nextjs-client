import React from "react";
import styles from "./styles.module.css";
import SearchAppBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import NavbarIcons from "../NavbarIcons/NavbarIcons";

type Props = {
  userMessage:number
};

function Navbar({userMessage}: Props) {
  return (
    <>
      <div className={styles.navbar}>
        <Logo Height={100} Width={100} ClassName={"logoNavbar"} />
        <SearchAppBar />
        <NavbarIcons userMessage={userMessage}/>
      </div>
    </>
  );
}

export default Navbar;
