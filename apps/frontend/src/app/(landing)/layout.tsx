import { Header } from '@/widgets/Header/ui/Header';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default async function GeneralLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>
        <Stack gap={2} margin="auto" flexDirection="row">
          {[
            { href: '#1', label: 'Home' },
            { href: '#2', label: 'How it works' },
            { href: '#3', label: 'Benefits' },
          ].map(({ href, label }) => (
            <MuiLink
              component={Link}
              href={href}
              key={href}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              {label}
            </MuiLink>
          ))}
        </Stack>
      </Header>
      <Box component="main" sx={{ height: 1000, p: 2 }}>
        {children}
      </Box>
    </>
  );
}
