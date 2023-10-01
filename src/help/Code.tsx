import { Box, BoxProps } from '@mui/material';
import React from 'react';

interface CodeProps extends BoxProps {
  children: React.ReactNode;
}

const Code: React.FC<CodeProps> = ({ children, ...rest }) => {
  return (
    <Box
      component="code"
      sx={{
        fontFamily: 'monospace',
        backgroundColor: (theme) => theme.palette.grey[200],
        padding: (theme) => theme.spacing(0.5),
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Code;