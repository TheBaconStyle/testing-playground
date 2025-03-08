import { Header } from "@/widgets/Header/ui/Header";
import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";
export default async function GeneralLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Box component="main" sx={{ height: 1000, pt: 1 }}>
        {children}
      </Box>
    </>
  );
}
