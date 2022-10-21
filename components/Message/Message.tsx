import Image from 'next/image';
import React from 'react';
import styles from './styles.module.css';

type Props = {
  image: string;
  text: string;
  user?: boolean;
};

const Message = ({ image, text, user }: Props) => {
  return (
    <div
      className={`${styles.message_container} ${
        user && styles.message_container_user
      }`}
    >
      <Image src={image} alt="contact" width={40} height={40} layout="fixed" />
      <div
        className={`${styles.message_info} ${user && styles.message_info_user}`}
      >
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
