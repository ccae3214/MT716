
import React, { Component } from 'react'
import { Nav, NavLink, NavbarBrand, NavbarToggler, NavItem, Collapse, Navbar } from 'reactstrap'
import { Button, SVGIcon } from 'react-md'
/*this is  navbar controller  */
import api from './api'
class App extends Component {
  constructor(props, context) {
    super(props, context)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.QCStoggle = this.QCStoggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      collapsed: false,
      response: "",
      err: "",
      profile: this.props.auth.userProfile,
      empolyer: ""
    }
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getprofile } = this.props.auth;
    if (!userProfile) {
      var rr = this.props.auth.getprofile()
      this.setState({ profile: JSON.parse(rr) });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  logout() {
    this.props.auth.logout()
  }
  handleChange(event) {
    const name = this.state.name
    name[event.target.name] = event.target.value
    this.setState({ name })
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  QCStoggle() {
    this.setState({
      QCSdropdownOpen: !this.state.QCSdropdownOpen,
    })
  }


  goTo(route) {
    this.props.history.push(`/${route}`)
  }

  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout()
  }

  renewToken() {
    this.props.auth.renewToken()
  }

  /*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */


  render() {
    const { profile } = this.state;
    const navlink = {
      color: '#337AB7',

    }
    const login = {
      color: '#28A745',

    }
    const logout = {
      color: '#DC3545',
    }
    const navbar = {
      'background-color': '#e3f2fd'
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand ><NavLink onClick={this.goTo.bind(this, 'indexPage')}>Match Trend </NavLink></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar >
              <NavItem >
                <NavLink><a href='https://1drv.ms/f/s!Aka-YIHxDxfFvyAWbXA5tDyCxgJc' target="_blank" style={navlink}>無雇主工人資料ondrive連結</a></NavLink>
              </NavItem>
            </Nav>
            {this.props.auth.isAuthenticated() ? this.props.auth.istma() ?
              <Nav className="ml-auto" navbar >
                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'Empolyers')} style={navlink}>Empolyers</NavLink>
                </NavItem>
              </Nav>
              : null : null}
            {this.props.auth.isAuthenticated() ? this.props.auth.ismt() ?
              <Nav className="ml-auto" navbar >
                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'Students')} style={navlink}>Students</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'Processing')} style={navlink}>Processing</NavLink>
                </NavItem>

                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'Training')} style={navlink}>Training</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'Payment')} style={navlink}>Payment</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink onClick={this.goTo.bind(this, 'IntTest')} style={navlink}>Intelligence TEST</NavLink>
                </NavItem>
              </Nav>
              : null : null}
          </Collapse>
          <Nav navbar>
            {this.props.auth.isAuthenticated() ?
              <NavItem >
                <NavLink onClick={this.goTo.bind(this, 'UserPage')} style={navlink}>
                  {this.props.auth.userProfile ? this.props.auth.userProfile.name : this.state.profile.name}
                </NavLink>
              </NavItem>
              : null}
            {this.props.auth.isAuthenticated() ?
              <NavItem >

                <NavLink onClick={this.logout.bind(this)} style={logout}>登出log_out </NavLink>
              </NavItem>
              :
              this.state.collapsed ?
                null
                :
                <NavItem style={login}>
                  <NavLink onClick={this.goTo.bind(this, 'LOG_IN')} style={login}>登入LOG_IN</NavLink>
                </NavItem>
            }
          </Nav>
        </Navbar>
      </div>

    )
  }
}

export default App
