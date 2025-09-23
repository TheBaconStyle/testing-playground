'use client';
import { Close, ExpandMore } from '@mui/icons-material';
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
import { ExternalToast, toast } from 'sonner';

export type TNotification = ExternalToast & {
  color?: AlertColor;
  toastIcon?: AlertProps['icon'];
  title?: string;
  message?: string;
  content?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  onCloseAction?: (id: TNotification['id']) => void;
};

const MoutionAlert = motion.create(Alert);

export function Notification({
  content,
  title,
  message,
  toastIcon,
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
        icon={toastIcon}
        severity={color}
        variant="filled"
        sx={{ alignItems: 'center', color: 'inherit' }}
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
              <IconButton
                color="inherit"
                onClick={() => {
                  onCloseAction?.(id);
                  toast.dismiss(id);
                }}
              >
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
