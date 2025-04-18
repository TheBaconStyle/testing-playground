'use client';
import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  AlertProps,
  Box,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
import { closeSnackbar } from 'notistack';
import { ReactNode, Ref, useState } from 'react';

export type TComplexNotification = {
  color?: AlertColor;
  icon?: AlertProps['icon'];
  title?: string;
  content?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string;
};

const MoutionAlert = motion.create(Alert);

export function ComplexNotification({
  content = <Typography>SUCCESS!</Typography>,
  title = 'success',
  icon = <Check fontSize="inherit" />,
  color = 'success',
  ref,
  id,
}: TComplexNotification) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Box ref={ref}>
      <MoutionAlert
        component={motion.div}
        animate={{
          borderBottomLeftRadius: isOpen ? 0 : undefined,
          borderBottomRightRadius: isOpen ? 0 : undefined,
        }}
        icon={icon}
        severity={color}
        variant="filled"
        sx={{ alignItems: 'center' }}
        action={
          <Box>
            <IconButton onClick={() => setOpen(!isOpen)} color="inherit">
              <ExpandMore
                fontSize="small"
                component={motion.svg}
                animate={{ rotateX: Number(isOpen) * -180 }}
                initial={{ rotate: 0 }}
              />
            </IconButton>
            <IconButton color="inherit" onClick={() => closeSnackbar(id)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        {title}
      </MoutionAlert>
      <Collapse in={isOpen}>
        <Paper
          component={motion.div}
          sx={{ p: 2 }}
          animate={{
            borderTopLeftRadius: isOpen ? 0 : undefined,
            borderTopRightRadius: isOpen ? 0 : undefined,
          }}
        >
          {content}
        </Paper>
      </Collapse>
    </Box>
  );
}
