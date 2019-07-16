import React, { Component } from 'react'
import { Alert, Button, ButtonGroup, Container, Col, Card, CardBody, Nav, NavLink, NavItem, Row, Input, InputGroup } from 'reactstrap'
import api from '../api'
import './Page.css'
import StudentPage from './StudentPage'
import NewStudent from './NewStudent';
export default class ManagementPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      cSelected: ["CTF", "CTM", "CGF", "CGM", "SWF", "SWM", "FF", "FM"],
      students: "",
      student_err: "",
      notifys_err: "",

    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSerch = this.handleSerch.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }
  handleSelect(animal) {
    this.setState({ selectedanimal: animal });
  }
  handleSerch(event) {

  }
  componentDidMount() {
    api.searchNotifys().then(response => { this.setState({ notifys: response }) }).catch(err => { this.setState({ err1: err }) });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(notify) {
    this.setState({ notify: notify })
    this.setState({ show: true });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }
  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5> 管理學生頁面StudentManagePage</h5>
        </Alert>

        <Row >
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <ButtonGroup>
              <Button outline color="info" onClick={() => this.onCheckboxBtnClick("CTF")} active={this.state.cSelected.includes("CTF")}>CTF</Button>
              <Button outline color="info" onClick={() => this.onCheckboxBtnClick("CTM")} active={this.state.cSelected.includes("CTM")}>CTM</Button>
              <Button outline color="success" onClick={() => this.onCheckboxBtnClick("CGF")} active={this.state.cSelected.includes("CGF")}>CGF</Button>
              <Button outline color="success" onClick={() => this.onCheckboxBtnClick("CGM")} active={this.state.cSelected.includes("CGM")}>CGM</Button>
              <Button outline color="danger" onClick={() => this.onCheckboxBtnClick("SWF")} active={this.state.cSelected.includes("SWF")}>SWF</Button>
              <Button outline color="danger" onClick={() => this.onCheckboxBtnClick("SWM")} active={this.state.cSelected.includes("SWM")}>SWM</Button>
              <Button outline color="danger" onClick={() => this.onCheckboxBtnClick("FF")} active={this.state.cSelected.includes("FF")}>FF</Button>
              <Button outline color="danger" onClick={() => this.onCheckboxBtnClick("FM")} active={this.state.cSelected.includes("FM")}>FM</Button>
            </ButtonGroup>
            <p>Selected: {JSON.stringify(this.state.cSelected)}</p>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <InputGroup>
              <Input onChange={this.handleSerch} /><Button>Search</Button>
            </InputGroup>
          </Col>
        </Row>
        <Alert color="primary" className="text-center">
          <h5>TASK</h5>
        </Alert>
        <Alert color="primary" className="text-center">
          <h5>ENCODING BIODATA</h5>
        </Alert>
        <Alert color="primary" className="text-center">
          <h5>DEAL WITH DOCUMENT </h5>
        </Alert>
        <Alert color="primary" className="text-center">
          <h5>DEAL WITH PROCESSING</h5>
        </Alert>

      </div>
    )
  }
}