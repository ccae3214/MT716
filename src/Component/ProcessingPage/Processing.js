import React, { Component } from 'react'
import { Alert, Button, Col, TabContent, TabPane, UncontrolledCollapse, Table, Input, Row, } from 'reactstrap'
import api from './api'
import '../Page.css'
import { Link } from 'react-router-dom'
/*Processing  show all data can be checkin if can't disable  the button
 checkin means student want to trainning in MT and have a weeks free avaliable backout
 must to have medical step1 and 2 verilid id  */
export default class ProcessingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
      processingtype: ['Ckeckin', 'Schedule', 'Payment', 'AIR_ticket', 'Back_out'],
      pagetype: this.props.id,
      get_processings: [],
      not_checkin_result: [],
      checkin_result: [],
      checkin: [],
      ckeckinone: {},
      activeTab: '1',
    }
    this.toggle = this.toggle.bind(this);
    this.onhandelChange = this.onhandelChange.bind(this);
    this.checkin = this.checkin.bind(this);
  }
  componentWillMount() {
    this.setState({ checkin: [], activeTab: '3' })
    ///get inliation processingtype
    api.get_not_ckeckin_students().then(res => { this.setState({ not_checkin_result: res }) }).catch(err => { this.setState({ err_students: err }) });
    api.get_ckeckin_students().then(res => { this.setState({ checkin_result: res }) }).catch(err => { this.setState({ err_students: err }) });
    api.get_processings().then(res => { this.setState({ get_processings: res }) }).catch(err => { this.setState({ get_processing_err: err }) })
  }
  goto(route) {
    this.props.history.push(`/${route}`, this.state.selectstudent)
  }

  checkin(event) {
    this.state.checkin.map(checkin => {
      if (checkin.reference_no == event.target.id)
        this.setState({ ckeckinone: checkin })
      api.student_checkin(checkin)
        .then(res =>
          api.get_not_ckeckin_students().then(res => { this.setState({ not_checkin_result: res }) }).catch(err => { this.setState({ err_students: err }) }),
          api.get_ckeckin_students().then(res => { this.setState({ checkin_result: res }) }).catch(err => { this.setState({ err_students: err }) }),
        )
        .catch(err => { alert(err) })
    })
  }

  onhandelChange(event) {
    const { value, id } = event.target
    const check = {
      reference_no: id,
      checkin_date: value
    }
    var checkone = 0
    this.state.checkin.map(checkin => {
      if (checkin.reference_no == check.reference_no)
        checkone = checkone + 1
    })
    if (checkone == 0)
      this.state.checkin.push(check)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    return (
      <div className="text-center">
        <Alert color="primary" >
          <h5> 流程頁面 PROCESSING PAGE</h5>
        </Alert>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline color="primary" id="toggler" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('1'); }}>
              <img src="/collection/png/checked.png" display="inline-block" height="21" width="21" /> CheckIn new student
         </Button>
            <Button outline color="primary" id="toggler2" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('2'); }}>
              <img src="/collection/png/link.png" display="inline-block" height="21" width="21" /> MATCH
         </Button>
            <Button outline color="primary" id="toggler2" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('3'); }}>
              <img src="/collection/png/fast-forward-1.png" display="inline-block" height="21" width="21" /> Process student
         </Button>
            <Button outline color="primary" id="toggler2" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('4'); }}>
              <img src="/collection/png/error.png" display="inline-block" height="21" width="21" /> Checkout/temporary checkout
         </Button>
          </Col>

        </Row>


        {/*學生搜尋結果*/}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Alert color="primary" className="text-center">
              {this.state.ckeckinone.reference_no !== undefined ? <div><h3>last time checkin:  {this.state.ckeckinone.reference_no}<br />checkin date:  {this.state.ckeckinone.checkin_date}</h3> </div> : <h4>'Before CheckIn check the candidate have two valid id & expire date more than 2 month'</h4>}
            </Alert>
            <Row>

              <Col sm="12" md={{ size: 10, offset: 1 }}>
                <Table hover size="sm" bordered responsive>
                  <thead>
                    <tr>
                      <th>編號reference_no</th>
                      <th>check in</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.not_checkin_result.map((student) => {
                      return (
                        <tr >
                          <th scope="row" size="1"><Link to={{ pathname: 'StudentPage/' + student.reference_no }}>{student.jobtype}-{student.reference_no},   {student.give_name}   _{student.mid_name}   _{student.last_name}</Link></th>
                          {student.passport ? student.unified ? <td><Input id={student.reference_no} type='date' onChange={this.onhandelChange} /><Button outline size='sm' color='primary' id={student.reference_no} onClick={this.checkin}>CheckIn</Button></td> : <td><Input disabled placeholder="check Unified ID" /><Button outline size='sm' color='secondary' >CheckIn</Button></td> : <td><Input disabled placeholder="check Passport " /><Button outline size='sm' color='secondary' >CheckIn</Button></td>}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Alert />
            <Row>
              <Col sm="12" md={{ size: 4, offset: 1 }}>
                workers
              <Input type="select" placeholder={'reference_no'} name="reference_no"  >
                  <option value={0}>{'please select'}</option>
                  {this.state.get_processings.map(processing => {
                    return (
                      <option value={processing.reference_no}>{processing.reference_no}</option>
                    )
                  })}
                </Input>
              </Col>
              <Col sm="12" md={{ size: 2, }}><br /><Button outline color="primary" block size='md' >MATCH</Button></Col>
              <Col sm="12" md={{ size: 4, }}>
                empolyers
              <Input type="select" placeholder={'reference_no'} name="reference_no"  >
                  <option value={0}>{'please select'}</option>
                  {this.state.get_processings.map(processing => {
                    return (
                      <option value={processing.reference_no}>{processing.reference_no}</option>
                    )
                  })}
                </Input>
              </Col>
            </Row>

            <Row>
              <Col sm="12" md={{ size: 4, }}>
                <h5>show contract</h5>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Alert color="info" className="text-center">
              Processing
            </Alert>
            <Row>
              <Col xs="" md={{ size: 10, offset: '1' }}>
                <Table hover size="sm" bordered responsive>
                  <thead>
                    <tr>
                      <th>編號reference_no</th>
                      <th>辦件process</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.checkin_result.map((student) => {
                      return (
                        <tr >
                          <th scope="row" size="1"><Link to={{ pathname: 'StudentPage/' + student.reference_no }}>{student.jobtype}-{student.reference_no},   {student.give_name}   _{student.mid_name}   _{student.last_name}</Link></th>
                          <td>
                            <Button outline size='sm' color='success' onClick={this.goto.bind(this, 'DocumentPage/' + student.reference_no)}>DOCUMENT</Button>{" "}
                            <Button outline size='sm' color='info' onClick={this.goto.bind(this, 'SchedulePage/' + student.reference_no)} >Schedule</Button>{" "}
                            <Button outline size='sm' color='info' onClick={this.goto.bind(this, 'PaymentPage/' + student.reference_no)} >Payment</Button>{" "}
                            <Button outline size='sm' color='info' onClick={this.goto.bind(this, 'AirTicketPage/' + student.reference_no)} >AIR_ticket</Button>{" "}
                            <Button outline size='sm' color='info' onClick={this.goto.bind(this, 'Check_out/' + student.reference_no)} >Check_out</Button>{" "}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
        </TabContent>


      </div>
    )
  }
}