import { Button, TextField } from '@mui/material';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { formContext, fieldContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});
