import { Grid2 as Grid, Paper } from "@mui/material";
import Image from "next/image";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{ display: { xs: "none", md: "block", position: "relative" } }}
        container
        flexDirection="column"
      >
        <Image src={"images/cheggy.png"} alt="qwe" fill quality={100} />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        container
        flexDirection="column"
        component={Paper}
      >
        {children}
      </Grid>
    </Grid>
  );
}
