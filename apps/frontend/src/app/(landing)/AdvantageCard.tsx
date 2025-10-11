import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export type TAdvantageCard = {
  image: React.ReactNode;
  title: string;
  description: string;
};

export function AdvantageCard({ description, image, title }: TAdvantageCard) {
  return (
    <Card sx={{ width: '400px' }}>
      <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
        {image}
      </CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography textAlign="center">{description}</Typography>
      </CardContent>
    </Card>
  );
}
