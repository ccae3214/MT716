import React, { Component } from 'react'
import { Alert, Button, Form, Label, Input } from 'reactstrap'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date().toLocaleDateString(),
            notifys: [],
            show: false,
            notify: {},
            user: { name: "RYAN", password: "qaz3214" }
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
        return (
            <div className="text-center" >
                <h5> YOU have no auth to use this HomePage</h5>
                <h5> try login another account or comfirm with MT IT</h5>
            </div>
        )
    }
}
