import React, { useReducer, createContext, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import translations from "./i18n";
import { useNavigate } from 'react-router-dom';

// 定義初始狀態
// 從 localStorage 讀取之前儲存的登入資訊
const savedUser = (() => {
  try {
    const raw = localStorage.getItem('lms_user');
    return raw ? JSON.parse(raw) : { email: '', password: '' };
  } catch { return { email: '', password: '' }; }
})();

const initialAppState = {
  user: savedUser, // 載入儲存的登入狀態
  mode: 'dark',
  sidemenu: true,
  selectedindex: 0,
  lang: 'zh',
};

// 定義 reducer 函數
const appReducer = (state, action) => {
  switch (action.type) {
    // 使用者相關的 action
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SELECTEDINDEX':
      return { ...state, selectedindex: action.payload };
    case 'SIGN_OUT':
      return { ...state, user: { email: null, password: null } };

    // 模式相關的 action
    case 'TOGGLE_MODE':
      return { ...state, mode: state.mode == 'light' ? 'dark' : 'light' };
    case 'TOGGLE_SIDEMENU':
      return { ...state, sidemenu: !state.sidemenu };
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'TOGGLE_LANG':
      return { ...state, lang: state.lang === 'zh' ? 'en' : 'zh' };

    default:
      return state;
  }
};

// 創建 Context
const AppContext = createContext();

// 創建 Provider 組件
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.mode, // 根據 state.mode 設置 light 或 dark 模式
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
  // 更新選擇的側菜單路由
  const setselectedindex = (index) => {
    dispatch({ type: 'SET_SELECTEDINDEX', payload: index });
  };
  // 切換主題模式
  const toggleMode = () => {
    dispatch({ type: 'TOGGLE_MODE' });
  };
  const togglesidemenu = () => {
    dispatch({ type: 'TOGGLE_SIDEMENU' });
  };

  const setMode = (mode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };

  const toggleLang = () => {
    dispatch({ type: 'TOGGLE_LANG' });
  };

  // 翻譯函式：傳入翻譯 key，回傳對應語言的文字
  const t = (key) => translations[state.lang]?.[key] || key;
  // 登入函數（使用 Axios）
  const sign_in = async (localUser) => {
    try {
      const response = await axios.post("/api/sign_in", localUser);
      if (response.data.success) {
        const userData = response.data.user;
        // 將登入資訊儲存到 localStorage，方便重整頁面後復原
        localStorage.setItem('lms_user', JSON.stringify(userData));
        dispatch({ type: "SET_USER", payload: userData });
        navigate('TmaPage');
      } else {
        throw new Error(response.data.message || "signin failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      throw err.response?.data?.error || err.response?.data?.message || err.message || "登入發生錯誤";
    }
  };
  // 登出函數
  const sign_out = async () => {
    try {
      await axios.post("/api/sign_out");
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      // 無論伺服器回應如何，客戶端一律清除狀態
      localStorage.removeItem('lms_user');
      dispatch({ type: "SET_USER", payload: { email: '', password: '' } });
      navigate('/signin');
    }
  };
  // App 啟動時：如果 localStorage 有資料則不需要再呼叫 API
  useEffect(() => {
    const savedRaw = localStorage.getItem('lms_user');
    if (savedRaw) {
      try {
        const saved = JSON.parse(savedRaw);
        if (saved?.email) {
          // 已有儲存的登入資訊，直接復原（initialAppState 已寫入，這裡不需再 dispatch）
          console.log('從 localStorage 復原登入狀態:', saved.email);
        }
      } catch { }
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        theme,
        user: state.user,
        setUser,
        selectedindex: state.selectedindex,
        setselectedindex,
        sign_in,
        sign_out,
        mode: state.mode,
        toggleMode,
        setMode,
        sidemenu: state.sidemenu,
        togglesidemenu,
        lang: state.lang,
        toggleLang,
        t,
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