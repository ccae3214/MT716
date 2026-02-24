// src/SignInPage.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Card, CardContent, Snackbar, Alert } from "@mui/material";
import { useApp } from '../../store'; // 導入 useUser Hook
import CssBaseline from '@mui/material/CssBaseline';
import SchoolIcon from '@mui/icons-material/School';

export default function SignInPage() {
  const { sign_in } = useApp();
  const [localUser, setLocalUser] = useState({ email: '', password: '' }); // 本地表單狀態
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sign_in(localUser);
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : "登入失敗");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setLocalUser(prevUser => ({
      ...prevUser,
      [id]: value
    }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' // Modern gradient background
      }}>
        <Container maxWidth="xs" sx={{ mt: -8 }}>
          <Card sx={{ borderRadius: 4, boxShadow: 6, p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <SchoolIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  登入您的 LMS 平台帳號
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={localUser.email}
                  onChange={handleOnChange}
                  placeholder="name@example.com"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={localUser.password}
                  onChange={handleOnChange}
                  placeholder="Your password"
                />
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}>
                  Sign In (登入)
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body1">
                  Don’t have an account?{" "}
                  <a href="/signup" style={{ color: "#1976d2", fontWeight: 'bold', textDecoration: 'none' }}>
                    Sign up
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* 錯誤提示小視窗 */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', borderRadius: 2 }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}