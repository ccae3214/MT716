import React from 'react'
import { Navigate, Route,Routes,BrowserRouter,useParams,Outlet  } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap';
import Navbarapp from './navbarapp'
import IndexPage from './Component/IndexPage'
import LoginPage from './Component/LoginPage'

import UserPage from './Component/UserPage/UserPage'

import Undev from './Component/Undev'
import HomePage from './Component/HomePage'


import NoEmpolyerBIOdata from './Component/StudentPage/NoEmpolyerBIOdata'

import Students from './Component/StudentPage/Students'
import Biodata from './Component/BiodataPage/Biodata'

import StudentPage from './Component/StudentPage/StudentPage'
import DocumentPage from './Component/ProcessingPage/DocumentPage'
import TrainingGradePage from './Component/StudentPage/TrainingGradePage'
import PaymentPage from './Component/PaymentPage/PaymentPage'

import Processing from './Component/ProcessingPage/Processing'
import SchedulePage from './Component/ProcessingPage/SchedulePage'
import BackOutPage from './Component/ProcessingPage/BackOutPage'

import Training from './Component/TrainingPage/Training'

import Payment from './Component/PaymentPage/Payment'

import IntTest from './Component/IntTest'

function NavbarWrapper() {
  const navigate = useNavigate();
  return <Navbarapp navigate={navigate}  />;
}

export const makeMainRoutes = () => (
  <Container>
    <BrowserRouter basename="/">
    <Routes >
        <Route path="/"  element={<NavbarWrapper/>}>
        <Route index path="/IndexPage" element={<IndexPage/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/Biodata" element={<Biodata/>}/>

        <Route path="/Log_in" element={<LoginPage/>}/>
        <Route path="/Undev" element={<Undev/>}/>
        <Route path="/NoEmpolyerBIOdata" element={<NoEmpolyerBIOdata/>} />
        <Route path="/UserPage" element={<UserPage/>}/>
        <Route path="/Students" element={<Students/>}/>
        <Route path="/StudentPage" element={<StudentPage/>}/>
        <Route path="/DocumentPage" element={<DocumentPage/>}/>
        <Route path="/TrainingGradePage" element={<TrainingGradePage/>} />
        <Route path="/PaymentPage" element={<PaymentPage/>}/>
        <Route path="/Processing" element={<Processing />}/>
        <Route path="/SchedulePage" element={<SchedulePage/>}/>
        <Route path="/BackOutPage" element={<BackOutPage/>}/>
        <Route path="/Training" element={<Training/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/IntTest" element={<IntTest/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  </Container>
);
