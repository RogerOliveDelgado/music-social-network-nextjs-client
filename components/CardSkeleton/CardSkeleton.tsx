import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardContent } from '@mui/material';

type Props = {
  width: number;
  height: number;
};

const CardSkeleton = ({ width, height }: Props) => {
  return (
    <>
      <Card sx={{ width: width, m: 2, padding: 1 }}>
        <CardMedia>
          <Skeleton
            sx={{ height: height }}
            animation="wave"
            variant="rectangular"
          />
        </CardMedia>
        <CardContent>
          <Skeleton animation="wave" height={20} style={{ marginBottom: 2 }} />
          <Skeleton animation="wave" height={20} width="80%" />
        </CardContent>
      </Card>
    </>
  );
};

export default CardSkeleton;
