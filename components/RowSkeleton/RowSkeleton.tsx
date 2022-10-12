import styles from './styles.module.css';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Row from '../Row/Row';

type Props = {};

const RowSkeleton = (props: Props) => {
  return (
    <div className={styles.skeleton_container}>
      <Row>
        <CardSkeleton width={175} height={155} />
        <CardSkeleton width={175} height={155} />
        <CardSkeleton width={175} height={155} />
        <CardSkeleton width={175} height={155} />
        <CardSkeleton width={175} height={155} />
      </Row>
    </div>
  );
};

export default RowSkeleton;
