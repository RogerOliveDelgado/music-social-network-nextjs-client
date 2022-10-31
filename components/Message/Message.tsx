import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";

type Props = {
  image: string;
  text: string;
  user?: boolean;
  currentRoom: string;
};

const Message = ({ image, text, user, currentRoom }: Props) => {
  return (
    <div
      className={`${
        currentRoom != text.split("-")[0]
          ? styles.message_container_right
          : styles.message_container_left
      } ${user && styles.message_container_user}`}
    >
      {/* <Image src={image} alt="contact" width={40} height={40} layout="fixed" /> */}
      <div
        className={`${styles.message_info} ${user && styles.message_info_user}`}
      >
        {text.split("-")[1].split(":")[0] === "https" ||
        text.split("-")[1].split(":")[0] === "http" ? (
          <p
            className={`${styles.text} ${
              currentRoom != text.split("-")[0]
                ? styles.text_right
                : styles.text_left
            }`}
          >
            <a href={text.split("-")[1]} target="_blank" rel="noreferrer">
              {text.split("-")[1]}
            </a>
          </p>
        ) : (
          <p
            className={`${styles.text} ${
              currentRoom != text.split("-")[0]
                ? styles.text_right
                : styles.text_left
            }`}
          >
            {text.split("-")[1]}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
