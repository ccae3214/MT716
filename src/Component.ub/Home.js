import React, { Component } from 'react'
import { PageHeader, Button, Grid, Col, Row, Nav, NavItem, Clearfix, Label, Alert, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import Animal from './Animal'
import Adopter from './Adopter'
import api from '../api'





export default class Adoption extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      show: false,
      notify: {}
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSelect(animal) {
    this.setState({ selectedanimal: animal });
  }

  componentDidMount() {
    api.searchNotifys().then(Response => { this.setState({ notifys: Response }) }).catch(err => { this.setState({ err1: err }) });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(notify) {
    this.setState({ notify: notify })
    this.setState({ show: true });
  }


  render() {

    return (
      <div>
        <PageHeader >
        </PageHeader>

        <Grid>
          <Row>
            <Col md={8} mdOffset={2}>

              <Alert bsStyle="danger">
                <strong><h2>認養預約</h2></strong> <ListGroup> {this.state.notifys.map(notify => {
                  const day = new Date
                  day.setDate(day.getDate()-1);
                  if (new Date(notify.adopteddate).getTime() >= day.getTime() && notify.status=='unadopted')
                    return (
                      <ListGroupItem><h4>認養日期:{notify.adopteddate}  |認養人id:{notify.aid}  |認養人姓名:{notify.adoptername}  |貓咪id:{notify.id}  |貓咪名子:{notify.animalname}|電話:{notify.phone}|email:{notify.email}|狀態:{notify.status}</h4></ListGroupItem>
                    )
                  else
                    return (
                      <h4></h4>
                    )
                })}
                </ListGroup>
              </Alert>
              
              <Alert bsStyle="warning">
                <strong><h2>認養1禮拜內</h2></strong> <ListGroup>{this.state.notifys.map(notify => {
                  const day7 = new Date
                  day7.setDate(day7.getDate() - 7);
                  const day = new Date
                  day.setDate(day.getDate() +1);
                  if (new Date(notify.adopteddate).getTime() <= day.getTime() && new Date(notify.adopteddate).getTime() > day7.getTime()&& notify.status=="adopted")
                    return (
                      <ListGroupItem><h4>認養日期:{notify.adopteddate}  |認養人id:{notify.aid}  |認養人姓名:{notify.adoptername}  |貓咪id:{notify.id}  |貓咪名子:{notify.animalname}|電話:{notify.phone}|email:{notify.email}|狀態:{notify.status}</h4></ListGroupItem>
                    )
                  else
                    return (
                      <h4></h4>
                    )
                })}
                </ListGroup>
              </Alert>
              <Alert bsStyle="warning">
                <strong><h2>已認養1禮拜</h2></strong> <ListGroup>{this.state.notifys.map(notify => {
                  const day7 = new Date
                  day7.setDate(day7.getDate() - 7);
                  const day30 = new Date
                  day30.setMonth(day30.getMonth() - 1);
                  if (new Date(notify.adopteddate).getTime() < day7.getTime() && new Date(notify.adopteddate).getTime() > day30.getTime())
                    return (
                      <ListGroupItem><h4>認養日期:{notify.adopteddate}  |認養人id:{notify.aid}  |認養人姓名:{notify.adoptername}  |貓咪id:{notify.id}  |貓咪名子:{notify.animalname}|電話:{notify.phone}|email:{notify.email}|狀態:{notify.status}</h4></ListGroupItem>
                    )
                  else
                    return (
                      <h4></h4>
                    )
                })}
                </ListGroup>
              </Alert>
              <Alert bsStyle="success">
                <strong><h2>已認養1個月</h2></strong><ListGroup> {this.state.notifys.map(notify => {
                  const day30 = new Date
                  day30.setMonth(day30.getMonth() - 1);
                  const day365 = new Date
                  day365.setFullYear(day365.getFullYear() - 1);
                  if (new Date(notify.adopteddate).getTime() < day30.getTime() && new Date(notify.adopteddate).getTime() > day365.getTime())
                    return (
                      <ListGroupItem><h4>認養日期:{notify.adopteddate}  |認養人id:{notify.aid}  |認養人姓名:{notify.adoptername}  |貓咪id:{notify.id}  |貓咪名子:{notify.animalname}|電話:{notify.phone}|email:{notify.email}|狀態:{notify.status}</h4></ListGroupItem>
                    )
                  else
                    return (
                      <h4></h4>
                    )
                })}
                </ListGroup>
              </Alert>
              <Alert bsStyle="info">
                <strong><h2>已認養1年</h2></strong><ListGroup> {this.state.notifys.map(notify => {
                  const day365 = new Date
                  day365.setFullYear(day365.getFullYear() - 1);
                  if (new Date(notify.adopteddate).getTime() <= day365.getTime())
                    return (
                      <ListGroupItem><h4>認養日期:{notify.adopteddate}  |認養人id:{notify.aid}  |認養人姓名:{notify.adoptername}  |貓咪id:{notify.id}  |貓咪名子:{notify.animalname}|電話:{notify.phone}|email:{notify.email}|狀態:{notify.status}</h4></ListGroupItem>
                    )
                  else
                    return (
                      <h4></h4>
                    )
                })}
                </ListGroup>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Nav bsStyle="pills" activeKey={1} >
            </Nav>
          </Row>
        </Grid>

        <div >

        </div>



      </div>
    )
  }
}