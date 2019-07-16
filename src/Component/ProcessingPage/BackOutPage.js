///
import React, { Component } from 'react'
import { Alert, Button, Col, Table, Row, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap'
import api from './api'
import '../Page.css'
import { Link } from 'react-router-dom'
/*searchStudent page mutisearch didn't  done  only show all data */
export default class BackOutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
      date: '',
      students: "",
      student_err: "",
      notifys_err: "",
      searchresult: [],
      selectstudent: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  goto(route) {
    this.props.history.replace(`/${route}`, this.state.selectstudent)

  }

  handleSelect() {

  }
  handleSearch(event) {

  }
  checkin(event) {
    const { name } = event.target
    const value = this

  }
  onHandelChange(event) {
    const date = event.target.value
    const student = this.state.searchresult

    this.setState({})
  }
  componentWillMount() {
    api.get_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });
  }

  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5> 管理學生頁面StudentManagePage</h5>
        </Alert>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <InputGroup>
              <Input type="select" name="select" id="exampleSelect">
                {this.state.jobtypeSelected.map(Selected => {
                  return (
                    <option value={Selected}>{Selected}</option>
                  )
                })}
              </Input>
              <Input onChange={this.handleSearch} /><Button>Search</Button>
            </InputGroup>
          </Col>
        </Row>
        {/*學生搜尋結果*/}
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Table hover size="sm" bordered responsive>
              <thead>
                <tr>
                  <th>編號reference_no</th>
                  <th>類型jobtype</th>
                  <th>姓First Name</th>
                  <th>中間名Mid   Name</th>
                  <th>名Last  Name</th>
                  <th>年齡age</th>
                  <th>check in</th>
                </tr>
              </thead>

              <tbody>

                {this.state.searchresult.map(student => {
                  return (
                    <tr >
                      <th scope="row" size="1"><Link to={{ pathname: '/StudentPage/' + student.reference_no }}>{student.reference_no}</Link></th>
                      <td>{student.jobtype}</td>
                      <td>{student.give_name}</td>
                      <td>{student.mid_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.age}</td>
                      <td><input name={student.reference_no} type='date' onChange={this.onHandelChange} /><Button size='sm' color='primary' name={student.reference_no} onClick={this.checkin.bind(this)}>CheckIn</Button></td>
                    </tr>
                  )
                })}



              </tbody>
            </Table>
          </Col>
        </Row>




      </div>
    )
  }
}