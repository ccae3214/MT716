import React, { Component } from 'react'
import { Button, Form, Label, Input } from 'reactstrap'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      show: false,
      notify: {},
      user: { name: "arch", password: "ryanarch" }
    }

  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  login() {
    this.props.auth.login(this.state.user)
  }
  handelonchange(event) {
    const { id, value } = event.target
    const user = this.state.user
    user[id] = value
    this.setState({ user })
  }
  uniKeyCode(event) {
    var key = event.keyCode;
    if (key === 13) {
      this.login()
    }
  }
  render() {



    const { isAuthenticated, login, getExpiryDate } = this.props.auth;
    return (
      <div className="text-center" >
        <Form id='form' className="form-signin" onKeyDown={this.uniKeyCode.bind(this)}  >
          <img className="mb-4" src="../../assets/MTTC1.png" alt="" width="150" height="150" />
          <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
          <Label for="inputEmail" className="sr-only">ID</Label>
          <Input type="id" id='name' className="form-control" placeholder="id" required autofocus onChange={this.handelonchange.bind(this)} />
          <Label for="inputPassword" className="sr-only">Password</Label>
          <Input type="password" id="password" className="form-control" placeholder="Password" required onChange={this.handelonchange.bind(this)} />
          <div className="checkbox mb-3">
            <Label>
              <Input type="checkbox" value="remember-me" /> Remember me
        </Label>
          </div>
          <Button className="btn btn-lg btn-primary btn-block" onClick={this.login.bind(this)}>Log in</Button>
          <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
        </Form>

      </div >
    )
  }
}
