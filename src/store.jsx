import React, { useReducer, createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
// 定義初始狀態
const initialAppState = {
  user: { email: '', password: '' }, // 使用者狀態
  mode: 'light', // 模式狀態，預設為日間模式
};

// 定義 reducer 函數
const appReducer = (state, action) => {
  switch (action.type) {
    // 使用者相關的 action
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SIGN_OUT':
      return { ...state, user: { email: null, password: null } };

    // 模式相關的 action
    case 'TOGGLE_MODE':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
    case 'SET_MODE':
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

// 創建 Context
const AppContext = createContext();

// 創建 Provider 組件
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.mode||'light', // 根據 state.mode 設置 light 或 dark 模式
          primary: {
            main: state.mode === 'light' ? '#000000' : '#FFFFFF', // 主色：light 為黑色，dark 為白色
          },
          secondary: {
            main: state.mode === 'light' ? '#666666' : '#CCCCCC', // 輔色：light 為深灰色，dark 為淺灰色
          },
          surface: {
            main: state.mode === 'light' ? '#FFFFFF' : '#000000', // 表面色：light 為白色，dark 為黑色
          },
          onSurface: {
            main: state.mode === 'light' ? '#000000' : '#FFFFFF', // 表面上的文字色：light 為黑色，dark 為白色
          },
          outline: {
            main: state.mode === 'light' ? '#DDDDDD' : '#444444', // 邊框色：light 為淺灰色，dark 為深灰色
          },
          background: {
            default: state.mode === 'light' ? '#FFFFFF' : '#000000', // 全局背景色：light 為白色，dark 為黑色
            paper: state.mode === 'light' ? '#FFFFFF' : '#1A1A1A', // 紙張背景色（例如卡片）：light 為白色，dark 為深灰色
          },
        },
        shape: {
          borderRadius: 12, // M3 圓角設置
        },
        typography: {
          fontFamily: 'Roboto, sans-serif', // M3 推薦字體
          h6: { fontWeight: 500 }, // 標題字重
        },
        components: {
          // 自定義 AppBar 樣式，符合 M3 淺陰影
          MuiAppBar: {
            styleOverrides: {
              root: { boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)' },
            },
          },
          // 自定義 Button 樣式，移除陰影以符合 M3
          MuiButton: {
            styleOverrides: { root: { boxShadow: 'none' } },
          },
        },
      }),
    [state.mode] // 依賴 mode，當 mode 改變時重新生成 theme
  )
  // 更新使用者
  const setUser = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };
  // 切換主題模式
  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_MODE' });
  };

  const setMode = (mode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };
  // 登入函數（使用 Axios）
  const sign_in = async (localUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/sign_in", localUser,
        { withCredentials: true } // 包含 Cookie
      );
      if (response.data.success) {
        dispatch({ type: "SET_USER", payload: response.data.user });
        return true;
      } else {
        throw new Error(response.data.message || "signin failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      throw err.response?.data?.message || err.message || "An error occurred";
    }
  };
  // 登出函數（使用 Axios）
  const sign_out = async () => {
    try {
      await axios.get("http://localhost:3001/api/sign_out", {
        withCredentials: true, // 包含 Cookie
      });
      dispatch({ type: "SIGN_OUT" });
    } catch (err) {
      console.error("Signout error:", err);
    }
  };
  // 啟動時驗證 token（使用 Axios）
  useEffect(() => {
    const verify_token = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/verify_token", {
          withCredentials: true, // 包含 Cookie 
        });
        if (response.data.user) {
          dispatch({ type: "SET_USER", payload: response.data.user });
          console.log('email=' + response.data.user.email)
        }
        if (!response.data.user) {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (err) {
        console.log("Token verification error:", err);
        dispatch({ type: "LOGOUT" });
      }
    };
    if (!state.user.email) {
      verify_token();
    }
  }, [state.user.email]);
  return (
    <AppContext.Provider
      value={{
        user: state.user,
        setUser,
        sign_in,
        sign_out,
        mode: state.mode,
        toggleMode,
        setMode,
        theme
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

// 自定義 Hook，方便在組件中使用 Context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};