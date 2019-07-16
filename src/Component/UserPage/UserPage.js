import React, { Component } from 'react'
import { Alert, Button, Container, Collapse, Card, CardHeader, CardBody, CardTitle, CardText, CardFooter, CardColumns, Col, Row, Form, Fade, Label, Input } from 'reactstrap'
import api from './api'
export default class MenberPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date().toLocaleDateString(),
            get_users: [],
            fadeIn1: false,
            fadeIn2: false,
            fadeIn3: false,
            newuser: { name: '', position: '', auth: '', password: '' },
            delituser: { name: '', position: '', auth: '', password: '' }
        }
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle3 = this.toggle3.bind(this);
    }
    toggle1() {
        this.setState({
            fadeIn1: !this.state.fadeIn1
        });
    }
    toggle2() {
        this.setState({
            fadeIn2: !this.state.fadeIn2
        });
    }
    toggle3() {
        this.setState({
            fadeIn3: !this.state.fadeIn3
        });
    }
    goto(route) {
        this.props.history.replace(`/${route}`, this.state.selectstudent)
    }
    componentWillMount() {
        api.get_users().then(res => { this.setState({ get_users: res }) }).catch(err => { this.setState({ get_users_err: err }) })
        this.setState({ profile: {} });
        const { userProfile, getprofile } = this.props.auth;
        if (!userProfile) {
            var rr = this.props.auth.getprofile()
            this.setState({ profile: JSON.parse(rr) });
        } else {
            this.setState({ profile: userProfile });
        }
    }
    handelchangeNoticeTo() {
    }

    handlechangeNewUser(event) {
        const { value, id } = event.target
        const newuser = this.state.newuser
        newuser[id] = value
        this.setState({ newuser: newuser })
    }
    handlechangedelitUser(event) {
        const { value } = event.target
        const delituser = this.state.delituser
        this.setState({ delituser: value })
    }
    goTo(route) {
        this.props.history.push(`/${route}`)
    }
    render() {
        return (
            <div className="text-center">
                <div className="container">
                    <Alert color="primary" className="text-center">
                        <h5> 使用者頁面UserPage</h5>
                    </Alert>

                    <Row>
                        <Button outline color="warning" onClick={this.toggle1}>notice</Button>
                        <Fade in={this.state.fadeIn1} >
                            <Col sm='2'>
                                <Input type='select' placeholder='to' onChange={this.handelchangeNoticeTo.bind(this)}>
                                    <option value={'all'}>{'all'}</option>
                                    {this.state.get_users.map(user => {
                                        return (
                                            <option value={user.name}>{user.name}</option>
                                        )
                                    })
                                    }
                                </Input></Col>
                            <Col sm='4'> <Input type='date' placeholder='Expiry Day' /></Col>

                            <Col sm='4'> <Input type='textarea' placeholder='content' /></Col>

                            <Col sm='2'><Button >submit送出</Button></Col>


                        </Fade>
                    </Row>

                    {this.props.auth.isboss() ?
                        <Row>
                            <Button outline color="success" onClick={this.toggle2}>create</Button>
                            <Fade in={this.state.fadeIn2} tag="h5" >
                                <Col sm='2'><Input id='input' name='name' placeholder='name' onChange={this.handlechangeNewUser.bind(this)}></Input></Col>
                                <Col sm='2'><Input name='position' placeholder='position' onChange={this.handlechangeNewUser.bind(this)}></Input></Col>
                                <Col sm='2'><Input name='auth' placeholder='auth' onChange={this.handlechangeNewUser.bind(this)}></Input></Col>
                                <Col sm='2'><Input name='password' placeholder='password' onChange={this.handlechangeNewUser.bind(this)}></Input></Col>
                                <Col sm='2'><Button >submit送出</Button></Col>
                            </Fade>
                        </Row> : null
                    }
                    {this.props.auth.isboss() ?
                        <Row>
                            <Button outline color="danger" onClick={this.toggle3}>delete</Button>
                            <Collapse isOpen={this.state.fadeIn3} >
                                <Col sm='2'>
                                    <Input type='select' placeholder='to' onChange={this.handlechangedelitUser.bind(this)}>
                                        <option value={0}>{'none'}</option>
                                        {this.state.get_users.map(user => {
                                            return (
                                                <option value={user.code}>{user.name}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                                <Col sm='2'><Button disabled>__________</Button></Col>
                                <Col sm='2'><Button disabled>__________</Button></Col>
                                <Col sm='2'><Button disabled>__________</Button></Col>
                                <Col sm='2'><Button>submit送出</Button></Col>

                            </Collapse>
                        </Row> : null
                    }
                    {this.props.auth.isboss() ?
                        <Row>
                            {this.state.get_users.map(user => {
                                return (
                                    <Col sm="4">
                                        <Card >
                                            <CardHeader>{user.code}</CardHeader>
                                            <CardBody>
                                                <Col md='6'><Label>name:</Label><Input placeholder={user.name} value={user.name} /></Col>
                                                <Col md='6'><Label>position:</Label><Input placeholder={user.position} value={user.position} /></Col>
                                                <Col md='6'><Label>auth:</Label><Input placeholder={user.position} value={user.auth} type='select'>
                                                    <option value='0'>0</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                </Input></Col>
                                                <Col md='6'><Label>password:</Label><Input placeholder={user.position} value={user.password} /></Col>
                                            </CardBody>
                                            <CardFooter><Button>update</Button></CardFooter>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>

                        : null
                    }
                </div>

            </div>
        )
    }
}
