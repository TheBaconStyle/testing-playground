import AlarmIcon from '@mui/icons-material/Alarm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { ESectionID } from './sections';

export const metadata: Metadata = {
  title: 'Habbins — Привычки в вашем распоряжении',
};

export default function Home() {
  return (
    <Box
      sx={{
        px: 2,
        mb: 2,
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <Box
        component="section"
        id={ESectionID.About}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 12,
          gap: 4,
        }}
      >
        <Typography variant="h3" textTransform="uppercase" textAlign="center">
          Возьми под контроль совои привычки
        </Typography>

        <Typography variant="h5" textAlign="center">
          Habbins это умный трекер, который поможет Вам развивать и поддерживать
          здоровые и полезные привычки
        </Typography>

        <Button component={Link} href="/dashboard" variant="contained">
          Попробовать бесплатно
        </Button>
      </Box>
      <Box
        component="section"
        id={ESectionID.HowItWorks}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 12,
          gap: 4,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Как Habbins помогает формировать привычки
        </Typography>

        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          От планирования до анализа — всё под контролем
        </Typography>

        <Stack gap={2} flexDirection="row" justifyContent="space-around">
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <EditNoteIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Создай привычку
              </Typography>
              <Typography>
                Определи цель, настрой периодичность и получай напоминания
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <PlaylistAddCheckIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Отмечай выполнение
              </Typography>
              <Typography>
                Просто отмечай галочкой каждый выполненный шаг
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <QueryStatsIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Следи за прогрессом
              </Typography>
              <Typography>
                Аналитика, графики и серии помогут сохранить мотивацию
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box
        component="section"
        id={ESectionID.Benefits}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 12,
          gap: 4,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Почему стоит выбрать Habbins
        </Typography>

        <Stack gap={2} flexDirection="row" justifyContent="space-around">
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <PsychologyIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Минимализм и фокус
              </Typography>
              <Typography>
                Интерфейс без отвлекающих элементов — только ты и твои цели
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <AlarmIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Умные напоминания
              </Typography>
              <Typography>
                Настраиваемые уведомления в нужное время, чтобы не забывать
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: '400px' }}>
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              <QueryStatsIcon sx={{ width: 75, height: 75 }} />
            </CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign="center"
              >
                Аналитика и прогресс
              </Typography>
              <Typography>
                Наглядные графики и отчёты по твоим привычкам
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
