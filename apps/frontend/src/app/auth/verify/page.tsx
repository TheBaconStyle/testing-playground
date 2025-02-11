import { Stack, Typography } from "@mui/material";

export default function EmailVerifyPage() {
  return (
    <Stack sx={{ margin: "auto", gap: 3 }} width={600}>
      <Typography variant="h5">Вход в учетную запись</Typography>
      <Typography>
        На указанный адрес электронной почты было было выслано письмо с
        инструкциями для входа в учетную запись.
      </Typography>
      <Typography>Вы можете закрыть эту страницу.</Typography>
    </Stack>
  );
}
