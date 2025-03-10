// src/SignInPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from 'axios';
import { useApp } from '../../store'; // 導入 useUser Hook
import { useTheme } from '@mui/material/styles';

export default function SignInPage() {
  const navigate = useNavigate();
  const { user, setUser } = useApp(); // 使用 useUser 獲取全域使用者狀態和 setUser 方法
  const [localUser, setLocalUser] = useState({ email: '1@1', password: '1' }); // 本地表單狀態
  const theme = useTheme();
  // 檢查用戶是否已登入
  useEffect(() => {
    if (user.email) {
      // 如果全域使用者狀態中有 email，視為已登入，跳轉到 IndexPage
      navigate('/index');
    }
  }, [user, navigate]);

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表單默認提交行為
    try {
      // 發送 POST 請求到後端 API
      const response = await axios.post('http://localhost:3001/api/sign_in', localUser);
      // 更新全域使用者狀態
      setUser(response.data.user);
    } catch (error) {
      alert("sever no respon")
      console.error('登入使用者時發生錯誤:', error);
    }
  };

  // 處理表單輸入變化
  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setLocalUser(prevUser => ({
      ...prevUser,
      [id]: value
    }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'background.paper'
      }}
    >
      <Box
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 300,
          bgcolor: theme.palette.surface.main,
          color: theme.palette.onSurface.main,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom >
          Sign In
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Enter your credentials
        </Typography>
        <Box component="form" onSubmit={handleSubmit} 
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={localUser.email}
            onChange={handleOnChange}
            placeholder="email@example.com"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={localUser.password}
            onChange={handleOnChange}
            placeholder="password"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>
        <Typography variant="body2" align="center">
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#1976d2" }}>
            Sign up
          </a>
        </Typography>
      </Box>
    </Container>
  );
}