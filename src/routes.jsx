import React from "react";
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import Navbarapp from './navbarapp'
import TopNavbar from './TopNavbar'
import IndexPage from './Component/IndexPage'
import SignInPage from './Component/SignPage/SignInPage'
import SignUpPage from './Component/SignPage/SignUpPage'
import HomePage from './Component/HomePage'
import IntTest from './Component/IntTest'
import {AppProvider } from './store'
import TmaPage from './Component/TmaPage/TmaPage'
import tools from './tools'
export const makeMainRoutes = () => (
  <BrowserRouter basename="/" >
    <AppProvider >
        <TopNavbar />
        <Routes >
          <Route path="/" >
          <Route path="*" element={<SignInPage />} />
            <Route index path="/index" element={<IndexPage />} />
            <Route path="/TmaPage" element={<TmaPage />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/intTest" element={<IntTest />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
    </AppProvider >
  </BrowserRouter>
);