import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

export default function SignUpPage() {
  const [localUser, setlocalUser] = useState({
    email: "",
    password: "",
    user_identity: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlocalUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localUser.email || !localUser.password || !localUser.user_identity) {
      setErrorMsg("請填寫所有欄位！");
      setOpenSnackbar(true);
      return;
    }
    try {
      // 發送 POST 請求到 API (使用相對路徑)
      const response = await axios.post('/api/create_user', localUser);
      navigate('/signin');
    } catch (error) {
      setErrorMsg(error.response?.data?.error || error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
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
                <PersonAddIcon color="secondary" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  加入 LMS 學習管理平台
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={localUser.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={localUser.password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel>User Identity (身分)</InputLabel>
                  <Select
                    name="user_identity"
                    value={localUser.user_identity}
                    onChange={handleChange}
                    label="User Identity (身分)"
                  >
                    <MenuItem value="Teacher">Teacher (老師)</MenuItem>
                    <MenuItem value="Student">Student (學生)</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="secondary" size="large" fullWidth sx={{ py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}>
                  Sign Up (註冊)
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body1">
                  Already have an account?{" "}
                  <a href="/signin" style={{ color: "#9c27b0", fontWeight: 'bold', textDecoration: 'none' }}>
                    Sign in
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
