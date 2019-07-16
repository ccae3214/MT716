import React from 'react'
import { Redirect, Route, Router, HashRouter } from 'react-router-dom'
import { Container } from 'reactstrap';
import App from './App'
import IndexPage from './Component/IndexPage'
import LoginPage from './Component/LoginPage'
import UserPage from './Component/UserPage/UserPage'

import Undev from './Component/Undev'
import Auth from './Auth/Auth'
import history from './history'
import HomePage from './Component/HomePage'

import Students from './Component/StudentPage/Students'
import StudentPage from './Component/StudentPage/StudentPage'
import DocumentPage from './Component/ProcessingPage/DocumentPage'
import TrainingGradePage from './Component/StudentPage/TrainingGradePage'
import PaymentPage from './Component/PaymentPage/PaymentPage'

import Processing from './Component/ProcessingPage/Processing'
import SchedulePage from './Component/ProcessingPage/SchedulePage'
import AirTicketPage from './Component/ProcessingPage/AirTicketPage'
import BackOutPage from './Component/ProcessingPage/BackOutPage'

import Training from './Component/TrainingPage/Training'

import Payment from './Component/PaymentPage/Payment'

import IntTest from './Component/IntTest'

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => (
  <Container>
    <Router exact path="/" history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth}{...props} />} />
        <Route path="/IndexPage" render={props => <IndexPage auth={auth}{...props} />} />
        <Route path="/HomePage" render={props => <HomePage {...props} />} />
        <Route path="/Log_in" render={props => <LoginPage auth={auth}{...props} />} />
        <Route path="/Undev" render={props => <Undev auth={auth}{...props} />} />


        <Route path="/UserPage" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <UserPage auth={auth}{...props} />} />

        <Route path="/Students" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <Students auth={auth}{...props} />} />

        <Route path="/StudentPage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <StudentPage auth={auth}{...props} id={props.match.params.id} />} />
        <Route path="/DocumentPage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <DocumentPage auth={auth}{...props} id={props.match.params.id} />} />
        <Route path="/TrainingGradePage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <TrainingGradePage auth={auth}{...props} id={props.match.params.id} />} />
        <Route path="/PaymentPage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <PaymentPage auth={auth}{...props} id={props.match.params.id} />} />

        <Route path="/Processing" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <Processing auth={auth}{...props} />} />

        <Route path="/SchedulePage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <SchedulePage auth={auth}{...props} id={props.match.params.id} />} />
        <Route path="/BackOutPage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <BackOutPage auth={auth}{...props} id={props.match.params.id} />} />
        <Route path="/AirTicketPage/:id" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <AirTicketPage auth={auth}{...props} id={props.match.params.id} />} />

        <Route path="/Training" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <Training auth={auth}{...props} />} />

        <Route path="/Payment" render={props => !auth.isAuthenticated() ? <Redirect to="/HomePage" />
          : <Payment auth={auth}{...props} />} />

        <Route path="/IntTest" render={props => <IntTest auth={auth}{...props} />} />
      </div>
    </Router>
  </Container>
);
