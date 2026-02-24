import React from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, SvgIcon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTheme } from '@mui/material/styles';
import { useApp } from './store';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function TopNavbar() {
  const { user, sign_out, mode, toggleMode, togglesidemenu, toggleLang, lang, t } = useApp();
  const theme = useTheme();
  const navigate = useNavigate();

  const handelsidemenu = () => {
    togglesidemenu();
    navigate('/TmaPage')
  }

  return (
    <AppBar position="sticky" elevation={1} sx={{
      bgcolor: theme.palette.surface.main || 'grey.100',
      color: theme.palette.onSurface.main || 'grey.900',
      borderRadius: '0 0 16px 16px',
      mb: 4,
    }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <HomeIcon sx={{ fontSize: 40 }}
          onClick={() => navigate('/index')}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 6, fontWeight: 500 }}>
          {t('appName')}
        </Typography>

        {user.email ? (
          <Button variant="outlined" color="primary" onClick={sign_out} sx={{
            borderRadius: 28, textTransform: 'none', px: 2,
          }}>
            {t('signOut')}
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={() => navigate('/signin')} sx={{
            borderRadius: 28, textTransform: 'none', px: 2,
          }}>
            {t('signIn')}
          </Button>
        )}

        {/* 語言切換按鈕 */}
        <IconButton onClick={toggleLang} sx={{ ml: 0.5 }} title={lang === 'zh' ? 'Switch to English' : '切換中文'}>
          <TranslateIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" onClick={toggleLang} sx={{ cursor: 'pointer', fontWeight: 'bold', minWidth: 24 }}>
          {lang === 'zh' ? 'EN' : '中'}
        </Typography>

        {/* 主題切換按鈕 */}
        <IconButton onClick={toggleMode}>
          {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {/* 側邊選單按鈕 */}
        {user.email ? (
          <IconButton onClick={handelsidemenu}>
            <MenuIcon />
          </IconButton>) : ('')}
      </Toolbar>
    </AppBar>
  );
}
