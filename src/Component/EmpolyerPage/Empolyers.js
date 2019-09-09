import React, { Component } from 'react'
import {
    Alert, Button, Badge, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Col, Table, Row, Label, ListGroup, ListGroupItem, Input, Nav, NavItem, NavLink, TabContent, TabPane, InputGroup, FormGroup, FormText, UncontrolledCollapse
} from 'reactstrap'
import classnames from 'classnames';
import api from './api'
import Iframe from 'react-iframe'
import { Link } from 'react-router-dom'
/*雇主頁面根據tma取得雇主資料及新增雇主*/
export default class Empolyers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date().toLocaleDateString(),
            jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
            new_tma_empolyer: {
                c_name: '',
                e_name: '',
                jobtype: '',
                tma: '',
                departure_date: "",
                joborder: '',
                approve_contract: '',
                location: '',
                worker: ''
            },
            empolyer_book: {
                e_no: '',
                e_name: '',
                worker_name: '',
                departure_date: ''
            },
            selected_empolyer: {
                e_no: 'create',
                c_name: '',
                e_name: '',
                jobtype: '',
                tma: '',
                departure_date: "",
                joborder: '',
                approve_contract: '',
                location: '',
                worker: ''
            },
            tma_empolyers: [],
            activeTab: '1',
            empolyers: [],
        };
        this.toggle = this.toggle.bind(this);
        this.handleChangeNewEmployer = this.handleChangeNewEmployer.bind(this);
        this.fileInput = React.createRef();


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

    componentDidMount() {
        const tma = this.state.profile.company_name
        this.setState({
            new_tma_empolyer: {
                e_no: '',
                c_name: '',
                e_name: '',
                jobtype: '',
                tma: tma,
                departure_date: "",
                joborder: '',
                approve_contract: '',
                location: '',
                worker: ''
            },
            empolyer_selecte: {
                e_no: '',
                e_name: '',
                worker_name: '',
                departure_date: ''
            }
        })
        api.get_tma_empolyers(this.state.profile).then(response => { this.setState({ tma_empolyers: response }) }).catch(err => { this.setState({ err_tma_empolyers: err }) });
        api.get_students().then(response => { this.setState({ get_students: response }) }).catch(err => { this.setState({ err_get_students: err }) });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleCreateEmpolyer(event) {
        const tma = this.state.profile.company_name
        this.setState({
            new_tma_empolyer: {
                e_no: '',
                c_name: '',
                e_name: '',
                jobtype: '',
                tma: tma,
                departure_date: "",
                joborder: '',
                approve_contract: '',
                location: '',
                worker: ''

            },
        })
        api.create_empolyer(this.state.new_tma_empolyer).then(response => {
            this.setState({ create_empolyer: response })
            api.get_tma_empolyers(this.state.profile).then(response => { this.setState({ tma_empolyers: response }) }).catch(err => { this.setState({ err_tma_empolyers: err }) });

        }).catch(err => { this.setState({ err_create_empolyer: err }) });

    }
    handleEmpolyerBook() {
        api.empolyer_book(this.state.selected_empolyer)(this.state.new_tma_empolyer).then(response => {
            this.setState({ create_empolyer: response })
            api.get_tma_empolyers(this.state.profile).then(response => { this.setState({ tma_empolyers: response }) }).catch(err => { this.setState({ err_tma_empolyers: err }) });
        })
    }
    handleDelitEmpolyer() {
        api.delit_empolyer(this.state.selected_empolyer).then(response => {
            this.setState({ delit_empolyer: response })
            api.get_tma_empolyers(this.state.profile).then(response => { this.setState({ tma_empolyers: response }) }).catch(err => { this.setState({ err_tma_empolyers: err }) });
            this.setState({
                selected_empolyer: {
                    e_no: 'create',
                    c_name: '',
                    e_name: '',
                    jobtype: '',
                    tma: '',
                    departure_date: "",
                    joborder: '',
                    approve_contract: '',
                    location: '',
                    worker: ''
                },
            })
        }).catch(err => { this.setState({ err_delit_empolyer: err }) });
    }
    handleUpdateEmpolyer() {
        api.update_empolyer(this.state.selected_empolyer).then(response => {
            this.setState({ delit_empolyer: response })
            api.get_tma_empolyers(this.state.profile).then(response => { this.setState({ tma_empolyers: response }) }).catch(err => { this.setState({ err_tma_empolyers: err }) });
        }).catch(err => { this.setState({ err_delit_empolyer: err }) });
    }
    goto(route) {
        this.props.history.push(`/${route}`)
    }


    handleChangeNewEmployer(event) {
        const new_tma_empolyer = this.state.new_tma_empolyer
        new_tma_empolyer[event.target.name] = event.target.value
        this.setState({ new_tma_empolyer })
    }
    handleChangeSelectedEmployer(event) {
        const tma_empolyer = this.state.selected_tma_empolyer
        tma_empolyer[event.target.name] = event.target.value
        this.setState({ tma_empolyer })
        event.attributes.active = 'active'
    }

    createhandleFile = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.files[0] });
        alert(...this.state, [e.target.name].name)
    }

    render() {

        return (
            <div >
                <Alert color="primary" className="text-center">
                    <h4>仲介名稱agency name:{this.props.auth.isAuthenticated() ?
                        <Button color="primary" outline>
                            {this.props.auth.userProfile ? this.props.auth.userProfile.name : this.state.profile.name}
                        </Button>
                        : null}</h4>
                </Alert>
                {/*雇主搜尋結果*/}
                <div>

                    <Row>
                        <Col sm="6">

                            {this.state.selected_empolyer.e_no === 'create' ?
                                <Card>
                                    <CardBody>
                                        <CardTitle>雇主中文名稱empolyer chinese_name<Input name='c_name' onChange={this.handleChangeNewEmployer} value={this.state.new_tma_empolyer.c_name} /></CardTitle>
                                        <CardTitle>雇主英文名稱empolyer english_name<Input name='e_name' onChange={this.handleChangeNewEmployer} value={this.state.new_tma_empolyer.e_name} /></CardTitle>
                                        <CardTitle>工作類型 work type<Input name='jobtype' onChange={this.handleChangeNewEmployer} value={this.state.new_tma_empolyer.jobtype} /></CardTitle>
                                        <CardTitle>工作地點 work location<Input name='location' onChange={this.handleChangeNewEmployer} value={this.state.new_tma_empolyer.location} /></CardTitle>
                                        <FormGroup row>
                                            <Label for="exampleFile" sm={2}>工作單</Label>
                                            <Col sm={10}>
                                                <Input type="file" name='job_order' value={this.state.pagetwodata}
                                                    onChange={this.createhandleFile.bind(this)} />
                                                <FormText color="muted">
                                                    job_order
                                            </FormText>
                                            </Col>
                                            <img scr={this.uploadInput} />
                                        </FormGroup>

                                        <CardText> 預定入境日 temporary_departure_date
                                            <Input type='date' name='departure_date' onChange={this.handleChangeNewEmployer} />
                                        </CardText>
                                        <CardLink><Button color='success' onClick={this.handleCreateEmpolyer.bind(this)} >新增create</Button></CardLink>
                                    </CardBody>
                                </Card>
                                :
                                <Card >
                                    <CardBody>
                                        <Row>
                                            <Col md='6'>
                                                <CardTitle name='e_no'>雇主編號empolyer_number</CardTitle>
                                            </Col>
                                            <Col md='6'>
                                                {this.state.selected_empolyer.e_no}
                                            </Col>
                                        </Row>
                                        <CardTitle name='c_name'>雇主中文名稱empolyer chinese_name<Input value={this.state.selected_empolyer.c_name} /></CardTitle>
                                        <CardTitle name='e_name'>雇主英文名稱empolyer name<Input value={this.state.selected_empolyer.e_name} /></CardTitle>
                                        <CardSubtitle name='location'>工作地點 working location<Input value={this.state.selected_empolyer.location} /></CardSubtitle>
                                        <FormGroup row>
                                            <Label for="exampleFile" sm={2}>工作單</Label>
                                            <Col sm={10}>
                                                <Input type="file" name='job_order' ref={(ref) => { this.uploadInput = ref; }} />
                                                <FormText color="muted">
                                                    job_order
                                        </FormText>
                                            </Col>
                                            <img scr={this.uploadInput} />
                                        </FormGroup>

                                        <CardText>
                                        </CardText>
                                        <CardLink><Button color='warning' onClick={this.handleUpdateEmpolyer.bind(this)}>修改update</Button></CardLink>
                                        <CardLink><Button color='danger' onClick={this.handleDelitEmpolyer.bind(this)}>刪除delete</Button></CardLink>
                                    </CardBody>
                                </Card>
                            }
                        </Col>
                        <Col sm="6">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                        未有工人
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                        已有工人
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <ListGroup style={{ height: '450px', overflow: 'scroll' }}>
                                        <ListGroupItem tag="a" onClick={() => {
                                            this.setState({
                                                'selected_empolyer': {
                                                    e_no: 'create',
                                                    c_name: '',
                                                    e_name: '',
                                                    jobtype: '',
                                                    tma: '',
                                                    departure_date: "",
                                                    joborder: '',
                                                    approve_contract: '',
                                                    location: '',
                                                    worker: ''
                                                }
                                            })
                                        }}>新增雇主create new empolyer</ListGroupItem>

                                        <hr className="my-2" />
                                        {this.state.tma_empolyers.map(empolyer => {
                                            if (empolyer.worker == null)
                                                return (
                                                    <div>
                                                        <ListGroupItem tag="a" onClick={() => {
                                                            this.setState({
                                                                'selected_empolyer': {
                                                                    e_no: empolyer.e_no,
                                                                    c_name: empolyer.c_name,
                                                                    e_name: empolyer.e_name,
                                                                    jobtype: empolyer.jobtype,
                                                                    tma: empolyer.tma,
                                                                    departure_date: empolyer.departure_date,
                                                                    joborder: empolyer.joborder,
                                                                    approve_contract: empolyer.approve_contract,
                                                                    location: empolyer.locaion,
                                                                    worker: empolyer.worker
                                                                }
                                                            })
                                                        }}>{empolyer.tma}{empolyer.e_no}:{empolyer.c_name}({empolyer.e_name}{empolyer.worker})</ListGroupItem>

                                                    </div>
                                                )
                                        })
                                        }
                                    </ListGroup>
                                </TabPane>
                                <TabPane tabId="2">
                                    <ListGroup style={{ height: '450px', overflow: 'scroll' }}>
                                        {this.state.tma_empolyers.map(empolyer => {
                                            if (empolyer.worker !== null)
                                                return (
                                                    <div>
                                                        <ListGroupItem tag="button" onClick={() => {
                                                            this.setState({
                                                                'selected_empolyer': {
                                                                    e_no: empolyer.e_no,
                                                                    c_name: empolyer.c_name,
                                                                    e_name: empolyer.e_name,
                                                                    jobtype: empolyer.jobtype,
                                                                    tma: empolyer.tma,
                                                                    departure_date: empolyer.departure_date,
                                                                    joborder: empolyer.joborder,
                                                                    approve_contract: empolyer.approve_contract,
                                                                    location: empolyer.locaion,
                                                                    worker: empolyer.worker
                                                                }
                                                            })
                                                        }}>{empolyer.c_name}:{empolyer.worker}</ListGroupItem>
                                                    </div>
                                                )
                                        })
                                        }
                                    </ListGroup>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}