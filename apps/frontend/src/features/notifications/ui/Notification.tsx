'use client';
import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  AlertProps,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
  Paper,
} from '@mui/material';
import { motion } from 'motion/react';
import { ReactNode, Ref, useState } from 'react';

export type TNotification = {
  color?: AlertColor;
  icon?: AlertProps['icon'];
  title?: string;
  message?: string;
  content?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string | number;
  onClose?: () => void;
  onCloseAction?: (id: TNotification['id']) => void;
};

const MoutionAlert = motion.create(Alert);

export function Notification({
  content,
  title,
  message,
  icon = <Check fontSize="inherit" />,
  color = 'success',
  ref,
  onCloseAction,
  id,
}: TNotification) {
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
            {content && (
              <IconButton onClick={() => setOpen(!isOpen)} color="inherit">
                <ExpandMore
                  fontSize="small"
                  component={motion.svg}
                  animate={{ rotateX: Number(isOpen) * -180 }}
                  initial={{ rotate: 0 }}
                />
              </IconButton>
            )}
            {onCloseAction && (
              <IconButton color="inherit" onClick={() => onCloseAction(id)}>
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </MoutionAlert>
      {content && (
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
      )}
    </Box>
  );
}
