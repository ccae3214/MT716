import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import paperClasses from '@mui/material/Paper';
import listClasses from '@mui/material/List';
import dividerClasses from '@mui/material/Divider/dividerClasses'
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useApp } from '../../store'; // 導入 useApp
import Lesson from './Lesson'

const data = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];
export default function TmaPage() {
  const { sidemenu } = useApp();
  const theme = useTheme();
  ///DASHBOARD主畫面排版
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        sx={{
          display: 'grid',
          gridTemplateColumns: sidemenu ? 'auto 1fr' : '1fr',
        }}>
        <Box>
          <SideMenu />
        </Box>
        {/* Main content */}
        <Box>
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 10, md: 10 },
            }}
          >
            <Maingrid />
            <Maingrid />

          </Stack>
        </Box>
      </Grid >
    </React.Fragment>

  );
}
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: '64px', // 假設 AppBar 高度為 64px，根據實際情況調整
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    top: '64px', // 確保 Drawer 的紙張從 AppBar 下方開始
    height: 'calc(100% - 64px)', // 調整高度，避免超出視窗
  },
});

function SideMenu() {
  const { user, sidemenu, togglesidemenu, selectedindex } = useApp(); // 使用 useApp
  const navigate = useNavigate(); // 
  const theme = useTheme();
  // 根據 selectedindex 選擇內容
  const currentContent = pageComponents[mainListItems[selectedindex]?.text] || <div>Default Content</div>;
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidemenu}
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        {currentContent}
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
        <CardAlert />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >

        <Button variant="contained" size="small" fullWidth>
          contact teacher
        </Button>
      </Stack>
    </Drawer>
  );
}
function Maingrid() {
  const theme = useTheme();

  return (
    <Box sx={{
      width: '100%', maxWidth: '100%',
    }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Lesson {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
///SelectContent
const SiteAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));
const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

const mainListItems = [
  { text: 'Lesson', icon: <SchoolIcon /> },
  { text: 'Calendar', icon: <CalendarMonthIcon /> },
  { text: 'Friends', icon: <EmojiPeopleIcon /> },
  { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];
const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];
///MenuContent
function MenuContent() {
  const { selectedindex, setselectedindex } = useApp();
  const listItemRefs = useRef([]); // 用於存儲每個 ListItemButton 的 ref
  const allItems = mainListItems; //
  // 初始化 refs 陣列大小
  useEffect(() => {
    listItemRefs.current = listItemRefs.current.slice(0, allItems.length);
  }, [allItems.length]);

  // 設置初始焦點
  useEffect(() => {
    listItemRefs.current[selectedindex]?.focus();
  }, []);

  // 處理點擊事件，更新 selectedindex 和焦點
  const handleListItemClick = (event, index) => {
    setselectedindex(index);
    listItemRefs.current[index]?.focus(); // 移動焦點
  };

  // 處理鍵盤事件
  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (selectedindex > 0) {
          const newIndex = selectedindex - 1;
          setselectedindex(newIndex);
          listItemRefs.current[newIndex]?.focus(); // 移動焦點
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (selectedindex < allItems.length - 1) {
          const newIndex = selectedindex + 1;
          setselectedindex(newIndex);
          listItemRefs.current[newIndex]?.focus(); // 移動焦點
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setselectedindex(index);
        listItemRefs.current[index]?.focus(); // 確保焦點在當前項目
        break;
      default:
        break;
    }
  };



  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedindex === index}
              onClick={(event) => handleListItemClick(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              tabIndex={0} // 確保可聚焦
              ref={(el) => (listItemRefs.current[index] = el)} // 設置 ref
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* 顯示內容 */}
    </Stack>
  );
}
///CardAlert
function CardAlert() {
  return (
    <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Follow the schedule
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          learning step by step
        </Typography>

      </CardContent>
    </Card>
  );
}

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});
function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null); // 移除類型定義
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVertRoundedIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add another account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              marginLeft: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
// 內容映射
const pageComponents = {
  Lesson: <div>Lesson </div>,
  Calendar: <div>Calendar </div>,
  Friends: <div>Friends </div>,
  Tasks: <div>Tasks </div>,
};