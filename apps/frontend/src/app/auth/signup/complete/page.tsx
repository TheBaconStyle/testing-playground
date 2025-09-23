import { Stack, Typography } from '@mui/material';

export default function SignUpCOmplete() {
  return (
    <Stack gap={4} margin="auto" width={600}>
      <Typography variant="h5">Регистрация прошла успешно!</Typography>
      <Typography>
        На указанный адрес электронной почты отправлено сообщение инструкциями
        по активации учетной записи.
      </Typography>
      <Typography>Вы можете закрыть эту страницу.</Typography>
    </Stack>
  );
}
