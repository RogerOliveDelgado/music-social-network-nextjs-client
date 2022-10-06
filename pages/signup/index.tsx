import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SignUpComponents from "../../components/SignUpInputs/SignUpComponents";
import styles from "../../styles/Home.module.css";

const SignUp: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <SignUpComponents />
      </div>
    </div>
  );
};

export default SignUp;
