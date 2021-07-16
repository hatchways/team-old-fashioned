import { CardContent, CardMedia, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';

interface Props {
  imageSrc: string;
  title: string;
  description: string;
  priceAmount: string;
}

export default function ContestCard(contest: Props): JSX.Element {
  return (
    <Card>
      <div className={'contestImage'}>
        <CardMedia className={'contestImage'} image="${contest.imageSrc}" title="" />
      </div>
      <div>
        <CardContent>
          <Typography>{contest.title}</Typography>

          <Typography>{contest.description}</Typography>

          <Typography>{contest.priceAmount}</Typography>
        </CardContent>
      </div>
    </Card>
  );
}
