import Image from "next/image";
import React from "react";

import styles from "../../styles/Home.module.css";

type Props = {};

const DemoAppComponent = (props: Props) => {
  return (
    <div className={styles.mobileImg}>
      <Image
        src={"/images/movil.png"}
        alt="iphone-demo"
        width={280}
        height={570}
      />
    </div>
  );
};

export default DemoAppComponent;
