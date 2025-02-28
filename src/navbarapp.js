import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Nav, NavLink, NavbarBrand, NavbarToggler, NavItem, Collapse, Navbar } from 'reactstrap';
import api from './api';

const Navbarapp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [response, setResponse] = useState("");
  const user = localStorage.getItem('user')
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const toggleNavbar = () => {
    setCollapsed(prevState => !prevState);
  };

  const navlink = { color: '#337AB7' };
  const sign_in = { color: '#28A745' };
  const sign_out = { color: '#DC3545' };
  const navbar = { 'background-color': '#e3f2fd' };

  return (
    <div>
      <Navbar color="light" light expand="md" style={navbar} fixed="top" container="xl" >
        <NavbarBrand>
          <NavLink onClick={() => navigate('IndexPage')} style={navlink}>Match Trend</NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => navigate('biodata')} style={navlink}>
                Biodata
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => navigate('Students')} style={navlink}>
                Students
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('Processing')} style={navlink}>
                Processing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('Training')} style={navlink}>
                Training
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('Payment')} style={navlink}>
                Payment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('IntTest')} style={navlink}>
                IntTest
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <Nav navbar>
          <NavItem>
            <NavLink onClick={() => navigate('UserPage')} style={navlink}>
              UserProfile
            </NavLink>
          </NavItem>
          {user?
            <NavItem>
              <NavLink style={sign_out} onClick={() => { localStorage.removeItem('user'); navigate('SigninPage'); }}>Sign Out</NavLink>
            </NavItem>
            :<NavItem>
              <NavLink onClick={() => navigate('SigninPage')} style={sign_in}>
                Sign In
              </NavLink>
            </NavItem>}
        </Nav>

      </Navbar>

      {/* 子路由內容在這裡渲染 */}
      <div
        style={{
          margin: 'auto',
          width: '50%',
          position: 'absolute',
          top: '10%',
          left: '23%',
          textAlign: 'center'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Navbarapp;