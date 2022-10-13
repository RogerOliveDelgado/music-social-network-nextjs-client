import styles from './styles.module.css';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Row from '../Row/Row';

type Props = {};

const RowSkeleton = (props: Props) => {
  return (
    <div className={styles.skeleton_container}>
      <Row>
        {Array.from(Array(10).keys()).map((item, index) => {
          return (
            <div key={index}>
              <CardSkeleton width={175} height={155} />
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default RowSkeleton;
