import Image from "next/image";
import React from "react";

import mobilePic from "../../public/Images/movil.png";

import styles from "../../styles/Home.module.css";

type Props = {};

const DemoAppComponent = (props: Props) => {
  return (
    <div className={styles.mobileWrapper}>
      <Image src={mobilePic} alt="iphone-demo" className={styles.mobileImg} />
    </div>
  );
};

export default DemoAppComponent;
