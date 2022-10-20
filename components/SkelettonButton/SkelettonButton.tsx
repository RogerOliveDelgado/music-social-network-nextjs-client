import styles from "./styles.module.css";
import { Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Props = {
};

const SkelettonButton = (props: Props) => {

    return (
    <Button
      className={styles.skeletton_button}
      variant="contained"
      color="inherit"
    >
    </Button>
  );
};

export default SkelettonButton;