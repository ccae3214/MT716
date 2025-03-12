import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, SvgIcon } from '@mui/material';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import { useTheme } from '@mui/material/styles';
import { useApp } from './store'; // 導入 useApp
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function TopNavbar() {
  const { user, sign_out, mode, toggleMode,togglesidemenu} = useApp(); // 使用 useApp
  const theme = useTheme();
  const navigate = useNavigate(); // 
  // 檢查用戶是否已登入
  useEffect(() => {
    if (!user.email) {
      // 如果全域使用者狀態中有 email，視為已登入，跳轉到 signin
      navigate('/signin');
    }
  }, [user, navigate]);
  return (
    <AppBar position="fixed" elevation={1} sx={{
      bgcolor: theme.palette.surface.main || 'grey.100',
      color: theme.palette.onSurface.main || 'grey.900',
      borderRadius: '0 0 16px 16px',
      mb: 4,
    }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <HomeIcon sx={{ fontSize: 40 }} 
        onClick={() => navigate('/index')} //點擊按鈕會到主頁
        /> 
        <Typography variant="h6" component="div" sx={{
          flexGrow: 6, fontWeight: 500
        }}>
          MyApp
        </Typography>
        {user.email ?(
        <IconButton
        onClick={togglesidemenu}// 點擊按鈕打開左菜單
       
        >
          <MenuIcon sx={{
          display: { xs: 'none', md: 'block' }}} />
        </IconButton >):('')}
        {user.email ? (
          <Button variant="outlined" color="primary" onClick={sign_out} sx={{
            borderRadius: 28, textTransform: 'none', px: 2,
          }}>
            sign out
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={() => navigate('/signin')} sx={{
            borderRadius: 28, textTransform: 'none', px: 2,
          }}>
            Sign In
          </Button>
        )}
        <IconButton
          onClick={toggleMode} // 點擊按鈕切換模式
        >
          {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}