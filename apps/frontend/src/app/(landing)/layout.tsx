import { Header } from '@/widgets/Header/ui/Header';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { ESectionID } from './sections';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';

const headerLinks = [
  { hash: ESectionID.About, label: 'О нас' },
  { hash: ESectionID.HowItWorks, label: 'Как это работает' },
  { hash: ESectionID.Benefits, label: 'Преимущества' },
] as const;

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <Stack gap={2} margin="auto" flexDirection="row">
          {headerLinks.map(({ hash, label }) => (
            <MuiLink
              component={Link}
              href={{ pathname: '/', hash }}
              key={hash}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {label}
            </MuiLink>
          ))}
        </Stack>
      </Header>
      {children}
    </>
  );
}
