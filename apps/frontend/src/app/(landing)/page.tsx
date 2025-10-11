import { apiAuthClient } from '@/features/auth/api/auth';
import AlarmIcon from '@mui/icons-material/Alarm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { AdvantageCard, TAdvantageCard } from './AdvantageCard';
import { ESectionID } from './sections';

export const metadata: Metadata = {
  title: 'Habbins — Привычки в вашем распоряжении',
};

const howItWorks: TAdvantageCard[] = [
  {
    title: 'Создай привычку',
    description: 'Определи цель, настрой периодичность и получай напоминания',
    image: <EditNoteIcon sx={{ width: 75, height: 75 }} />,
  },
  {
    title: 'Отмечай выполнение',
    description: 'Отмечай выполнение каждой привычки, чтобы не забыть',
    image: <PlaylistAddCheckIcon sx={{ width: 75, height: 75 }} />,
  },
  {
    title: 'Отслеживай результаты',
    description: 'Получай аналитику и прогресс по каждой привычке',
    image: <QueryStatsIcon sx={{ width: 75, height: 75 }} />,
  },
];

const benefits: TAdvantageCard[] = [
  {
    title: 'Минимализм и фокус',
    description: 'Интерфейс без отвлекающих элементов',
    image: <PsychologyIcon sx={{ width: 75, height: 75 }} />,
  },
  {
    title: 'Умные напоминания',
    description: 'Настраиваемые уведомления в нужное время',
    image: <AlarmIcon sx={{ width: 75, height: 75 }} />,
  },
  {
    title: 'Аналитика и прогресс',
    description: 'Наглядные графики и отчёты по привычкам',
    image: <QueryStatsIcon sx={{ width: 75, height: 75 }} />,
  },
];

export default async function Home() {
  const headersStore = await headers();

  const authInfo = await apiAuthClient.getSession({
    fetchOptions: { headers: headersStore },
  });

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
          {!authInfo.data?.user && <>Попробовать бесплатно</>}
          {authInfo.data?.user && <>Войти в личный кабинет</>}
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
          {howItWorks.map((c, index) => (
            <AdvantageCard {...c} key={index} />
          ))}
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
          {benefits.map((c, index) => (
            <AdvantageCard {...c} key={index} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
