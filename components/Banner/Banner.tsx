import styles from './styles.module.css';
import Image from 'next/image';
import { useI18N } from '../../context/i18';

type Props = {
  user: string;
  total: number;
};

const Banner = ({ user, total }: Props) => {
  const { t } = useI18N();
  return (
    <div className={styles.banner_container}>
      <div className={styles.banner_front}>
        <Image
          className={styles.banner_image}
          src="/Images/likeTracks.png"
          alt={'bombay'}
          width={200}
          height={200}
          layout="fixed"
        />
        <div className={styles.banner_content}>
          <h1 className={styles.banner_text}>{t('headers').headerFavorites}</h1>
          <h4 className={styles.banner_user_details}>
            {/* <InterpreterModeIcon /> */}
            {user && `${user} - ${total} ${t('additional').tracks}`}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Banner;
