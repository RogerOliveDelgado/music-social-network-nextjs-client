import React from "react";
import styles from "./styles.module.css";
import SearchAppBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import NavbarIcons from "../NavbarIcons/NavbarIcons";

type Props = {};

function Navbar({}: Props) {
  return (
    <>
      <div className={styles.navbar}>
        <Logo />
        <SearchAppBar />
        <NavbarIcons />
      </div>
    </>
  );
}

export default Navbar;
