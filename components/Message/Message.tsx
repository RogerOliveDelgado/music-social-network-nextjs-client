import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';

type Props = {
  image: string;
  text: string;
  user?: boolean;
  currentRoom: string;
};

const Message = ({ image, text, user, currentRoom }: Props) => {
  console.log(currentRoom)
  return (
    <div
      className={`${currentRoom != text.split(':')[0] ? styles.message_container_right : styles.message_container_left} ${
        user && styles.message_container_user
      }`}
    >
      <Image src={image} alt="contact" width={40} height={40} layout="fixed" />
      <div
        className={`${styles.message_info} ${user && styles.message_info_user}`}
      >
        <p className={styles.text}>{text.split(':')[1]}</p>
      </div>
    </div>
  );
};

export default Message;
