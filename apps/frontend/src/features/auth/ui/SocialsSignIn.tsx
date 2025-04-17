'use client';
import { Button, Icon, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiVk } from 'react-icons/si';
import { SiDiscord } from 'react-icons/si';

export function SocialsSignIn() {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <Stack gap={2}>
      <Button
        variant="contained"
        onClick={() =>
          router.push(`/api/auth/signin/discord?${searchParams.toString()}`)
        }
      >
        Войти через <Icon component={SiDiscord} sx={{ ml: 2 }} />
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          router.push(`/api/auth/signin/vk?${searchParams.toString()}`);
        }}
      >
        Войти через <Icon component={SiVk} sx={{ ml: 2 }} />
      </Button>
    </Stack>
  );
}
