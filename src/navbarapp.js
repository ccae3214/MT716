import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Nav, NavLink, NavbarBrand, NavbarToggler, NavItem, Collapse, Navbar } from 'reactstrap';
import api from './api';

class Navbarapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      response: "",
      err: "",
      profile: "userProfile",
      employer: ""
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  toggleNavbar() {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }));
  }

  goTo(route) {
    this.props.navigate(`/${route}`); // 使用傳入的 navigate prop 進行導航
  }

  render() {
    const { profile } = this.state;
    const navlink = { color: '#337AB7' };
    const login = { color: '#28A745' };
    const logout = { color: '#DC3545' };
    const navbar = { 'background-color': '#e3f2fd' };

    return (
      <div>
        <Navbar color="light" light expand="md" style={navbar}>
          <NavbarBrand>
            <NavLink onClick={() => this.goTo('IndexPage')} style={navlink}>Match Trend</NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <NavLink onClick={() => this.goTo('biodata')} style={navlink}>
                Biodata
                </NavLink>
              </NavItem>
            </Nav>
            
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={() => this.goTo('Students')} style={navlink}>
                  Students
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.goTo('Processing')} style={navlink}>
                  Processing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.goTo('Training')} style={navlink}>
                  Training
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.goTo('Payment')} style={navlink}>
                  Payment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.goTo('IntTest')} style={navlink}>
                  IntTest
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>

          <Nav navbar>
            <NavItem>
              <NavLink onClick={() => this.goTo('UserPage')} style={navlink}>
                UserProfile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={logout}>Sign Out</NavLink>
            </NavItem>
            <NavItem style={login}>
              <NavLink onClick={() => this.goTo('Log_in')} style={login}>
              Sign In
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* 子路由內容在這裡渲染 */}
        <div margin="auto" width="50%" overflow-x="hidden" overflow-y="hidden" position="absolute" top="25%" left="22%" text-align="center">
        <Outlet />
        </div>
      </div>
    );
  }
}

export default Navbarapp;