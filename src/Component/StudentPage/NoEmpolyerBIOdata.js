//show myprofile,myschedule,mydocument,myticket,mypayment,myjoborder,myagency,mytraning,mylending
import React, { Component } from 'react'
import { Alert, Button, Table, Badge, Col, Row, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, TabContent, TabPane, Nav, NavLink, NavItem, InputGroupAddon, } from 'reactstrap'
import api from './api'
import classnames from 'classnames';
import Iframe from 'react-iframe'
export default class NoEmpolyerBIOdata extends Component {
  constructor(props) {
    super(props)

    this.state = {

      searchresult: []
    }
    {

    }
  }
  componentWillMount() {
    api.get_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });

  }
  componentDidMount() {
    const that = this
    const student = this.state.student
    if (student !== undefined) {
      student.reference_no = this.props.id
      this.setState({ student })
    }

    const ref = this.state.student
    api.get_student(ref).then(response => this.setState({ student: response })).catch(err => { this.setState({ err_students: err }) })
  }

  render() {
    return (
      <div>
        <Alert color="primary" className="text-center">
          <h5> 無雇主工人資料 NoEmpolyer BIOData</h5>
        </Alert>

        <Col>

        </Col>
        <Col md={{ offset: 3, size: 4 }}>
          <Alert color="light">

            <br />點下方開新視窗
          </Alert>
          <Iframe src="https://onedrive.live.com/embed?cid=C5170FF18160BE46&resid=C5170FF18160BE46%218096&authkey=AAHcojoGw-afjKs" width="165" height="128" frameborder="0" scrolling="no"></Iframe>

        </Col>
      </div >
    )
  }
}
