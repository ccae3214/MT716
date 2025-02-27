import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Nav, NavLink, NavbarBrand, NavbarToggler, NavItem, Collapse, Navbar } from 'reactstrap';
import api from './api';

const Navbarapp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [response, setResponse] = useState("");
  const [err, setErr] = useState("");
  const [profile, setProfile] = useState("userProfile");
  const [employer, setEmployer] = useState("");

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const toggleNavbar = () => {
    setCollapsed(prevState => !prevState);
  };

  const goTo = (route) => {
    navigate(`/${route}`); // Navigate to the specified route
  };

  const navlink = { color: '#337AB7' };
  const login = { color: '#28A745' };
  const logout = { color: '#DC3545' };
  const navbar = { 'background-color': '#e3f2fd' };

  return (
    <div>
      <Navbar color="light" light expand="md" style={navbar} fixed="top" container="xl" >
        <NavbarBrand>
          <NavLink onClick={() => goTo('IndexPage')} style={navlink}>Match Trend</NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => goTo('biodata')} style={navlink}>
                Biodata
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => goTo('Students')} style={navlink}>
                Students
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => goTo('Processing')} style={navlink}>
                Processing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => goTo('Training')} style={navlink}>
                Training
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => goTo('Payment')} style={navlink}>
                Payment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => goTo('IntTest')} style={navlink}>
                IntTest
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <Nav navbar>
          <NavItem>
            <NavLink onClick={() => goTo('UserPage')} style={navlink}>
                UserProfile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={logout}>Sign Out</NavLink>
          </NavItem>
          <NavItem style={login}>
            <NavLink onClick={() => goTo('SigninPage')} style={login}>
              Sign In
            </NavLink>
          </NavItem>
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