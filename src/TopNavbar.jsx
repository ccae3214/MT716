import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useApp } from './store'; // 導入 useApp

export default function TopNavbar() {
  const { user,setUser,sign_in, sign_out, mode, toggleMode, setMode } = useApp(); // 使用 useApp
  const theme = useTheme();
  const navigate = useNavigate(); // 

  const handleThemeChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode); // 設置模式
  };
  // 檢查用戶是否已登入
  useEffect(() => {
    if (user.email) {
      // 如果 cookie 中有用戶資訊，視為已登入，跳轉到 Index
      navigate('/index');
    }
  }, [navigate]); // 依賴 navigate，確保路由功能可用
  const handlesign_out = () => {
    sign_out();
    navigate('/signin');
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: theme.palette.surface?.main || 'grey.100',
        color: theme.palette.onSurface?.main || 'grey.900',
        borderRadius: '0 0 16px 16px',
        mb: 4,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
          MyApp
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleMode} // 點擊按鈕切換模式
          sx={{
            borderRadius: 28,
            textTransform: 'none',
            px: 2,
          }}
        >
          {mode}
        </Button>
        {user.email ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={handlesign_out}
            sx={{
              borderRadius: 28,
              textTransform: 'none',
              px: 2,
            }}
          >
            sign_out
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            href="/signin"
            sx={{
              borderRadius: 28,
              textTransform: 'none',
              px: 2,
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}