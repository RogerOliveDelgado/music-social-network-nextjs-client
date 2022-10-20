import Image from 'next/image';
import styles from './styles.module.css';

type Props = {
  name: string;
  image: string;
  active: boolean;
};

const Contact = ({ name, image, active }: Props) => {
  return (
    <div
      className={`${styles.contact_container} ${
        active && styles.contact_container_active
      }`}
    >
      <div className={styles.contact_image}>
        <Image
          src={image}
          alt="contact_default"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
      <p className={styles.contact_name}>{name}</p>
      <p>2:30PM</p>
    </div>
  );
};

export default Contact;
