import React, { useState, useMemo } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbarapp from './navbarapp'
import TopNavbar from './TopNavbar'
import IndexPage from './Component/IndexPage'
import SignInPage from './Component/SignPage/SignInPage'
import SignUpPage from './Component/SignPage/SignUpPage'
import HomePage from './Component/HomePage'
import IntTest from './Component/IntTest'
import { useApp,AppProvider } from './store'

export const makeMainRoutes = () => (
  <BrowserRouter basename="/" >
    <AppProvider >
        <TopNavbar />
        <Routes >
          <Route path="/" >
            <Route index path="/index" element={<IndexPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/intTest" element={<IntTest />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
    </AppProvider >
  </BrowserRouter>
);