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
      user: { name: "", password: "" }
    }

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
    return (
      <div className="text-center" >
        <Form id='form' className="form-signin" onKeyDown={this.uniKeyCode.bind(this)}  >
          <img className="mb-4"  href=".../public/MTLOGO.png" alt="" width="150" height="150" />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <Label for="inputEmail" className="sr-only">Email</Label>
          <Input type="id" id='name' className="form-control" placeholder="email" required autofocus onChange={this.handelonchange.bind(this)} />
          <Label for="inputPassword" className="sr-only">password</Label>
          <Input type="password" id="password" className="form-control" placeholder="Password" required onChange={this.handelonchange.bind(this)} />
          <div className="checkbox mb-3">
            <Label>
              <Input type="checkbox" value="remember-me" /> Remember me
        </Label>
          </div>
          <Button  color='success'>Log in</Button>
          <p className="mt-5 mb-3 text-muted">not yet sign up?</p><Button color='danger' >sign up </Button>
          <p className="mt-5 mb-3 text-muted">&copy; 2025</p>
        </Form>

      </div >
    )
  }
}
