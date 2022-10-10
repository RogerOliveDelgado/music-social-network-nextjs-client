import Layout from '../../components/Layout/Layout';
import Row from '../../components/Row/Row';
import { getGreetings } from '../../utils/getGreetings';

import styles from './styles.module.css';

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Layout>
        <div className={styles.home_container}>
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
