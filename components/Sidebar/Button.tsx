import React, { ReactNode, HTMLAttributes } from "react";
import sidebarStyles from "../../styles/sidebar/Sidebar.module.css";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  primary?: any;
}

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button className={sidebarStyles.link} {...props} />
    </>
  );
};
