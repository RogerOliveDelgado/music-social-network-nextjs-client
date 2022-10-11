import Layout from '../../components/Layout/Layout';
import Row from '../../components/Row/Row';
import { getGreetings } from '../../utils/getGreetings';
import { useRouter } from 'next/router';

import en from '../../locales/en';
import es from '../../locales/es';
import fr from '../../locales/fr';

import styles from './styles.module.css';

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();
  const { locale } = router;
  const languages = {
    en: en,
    es: es,
    fr: fr,
  };
  const t = languages[locale];

  return (
    <>
      <Layout>
        <div className={styles.home_container}>
          <h2>{t.home.home}</h2>
          <h1 className={styles.greetings}>{getGreetings()}</h1>
          <Row title="Trending Now" />
          <Row title="Albums" />
          <Row title="Artists" />
        </div>
      </Layout>
    </>
  );
};

export default Home;
