// theme.js
"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3490dc',
    },
    secondary: {
      main: '#ffed4a',
    },
    // Thêm các tùy chọn màu khác nếu cần
  },
});

export default theme;
