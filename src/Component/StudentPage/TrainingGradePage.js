import React, { Component } from 'react'
import { Alert, Button, Badge, Col, Row, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, TabContent, TabPane, Nav, NavLink, NavItem, InputGroupAddon, } from 'reactstrap'
import api from './api'
import classnames from 'classnames';
export default class TrainingGradePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reference_no: this.props.id,
      coursename: ['Cooking', 'Mandarin', 'Housekeeping', 'caretaking'],
      Check: {
        "Check-in Agreement and management regulatory instruction ": '',
        "admission to Taiwan and applying for loan class ": '',
        "dormitory regulations": '',
      },
      Cooking: {
        "stir - fired": '',
        "steam": '',
        "fry": '',
        "adobo": '',
        "noodle": '',
        "soup": '',
        "lugaw": '',
        "tamping": ''
      },
      Mandarin: {
        "self - introduction": '',
        "home - sentence": '',
        "care - patient": '',
        "cooking -sentence": '',
        'basic -conversation': '',
        "basic - conversation(market)": ''
      },
      Housekeeping: {
        "finishing": '',
        "kitchen": '',
        "bathroom": '',
        "washing machine / hand wash": '',
        "ironing / bed setting": '',
        "mopping / glass cleaning": '',
        "gardening / washing car / pet": '',
        "table setting": '',
      },
      Caretaking: {
        "Care - patient": '',
        "Care - baby": '',
        "Care - patient full day trip": '',
      },
      grade: ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C'],
      teacher: []
    }

  }

  componentWillMount() {
  }

  adddocument() {
  }






  render() {
    const ckeckstyle = {
      border: '1px  solid #007BFF',
      'border-radius': '25px',
      margin: '2px'
    }
    const cookingstyle = {
      border: '1px  solid #E00000',
      'border-radius': '25px',
      margin: '2px'
    }
    const mandarinstyle = {
      border: '1px  solid #545454',
      'border-radius': '25px',
      margin: '2px'
    }
    const housekeepingstyle = {
      border: '1px  solid #F5F500',
      'border-radius': '25px',
      margin: '2px'
    }
    const caretakingstyle = {
      border: '1px  solid #00BD00',
      'border-radius': '25px',
      margin: '2px'
    }
    return (
      <div className="text-left">
        <Alert color="primary" className="text-center">
          <Button />
          <h5>訓練成績TrainingGradePage</h5>
          <h5>測驗摘要表單 ASF</h5>
          <Button />
        </Alert>
        <Row>
          <Col sm="12" md={{ size: 1 }}></Col>
          <Col sm="12" md={{ size: 2 }} style={ckeckstyle} >
            {Object.keys(this.state.Check).map(check => {
              return (
                <h3>{check}<Input size='sm' type="select">{this.state.grade.map(grade => { return (<option value={grade}>{grade}</option>) })}</Input></h3>
              )
            })}
          </Col>
          <Col sm="12" md={{ size: 2 }} style={cookingstyle}>
            {Object.keys(this.state.Cooking).map(cooking => {
              return (
                <h3>{cooking}<Input size='sm' type="select">{this.state.grade.map(grade => { return (<option value={grade}>{grade}</option>) })}</Input></h3>
              )
            })}</Col>
          <Col sm="12" md={{ size: 2 }} style={mandarinstyle}>
            {Object.keys(this.state.Mandarin).map(mandarin => {
              return (
                <h3>{mandarin}<Input size='sm' type="select">{this.state.grade.map(grade => { return (<option value={grade}>{grade}</option>) })}</Input></h3>
              )
            })}</Col>
          <Col sm="12" md={{ size: 2 }} style={housekeepingstyle}>
            {Object.keys(this.state.Housekeeping).map(housekeeping => {
              return (
                <h3>{housekeeping}<Input size='sm' type="select">{this.state.grade.map(grade => { return (<option value={grade}>{grade}</option>) })}</Input></h3>
              )
            })}</Col>
          <Col sm="12" md={{ size: 2 }} style={caretakingstyle}>
            {Object.keys(this.state.Caretaking).map(caretaking => {
              return (
                <h3>{caretaking}<Input size='sm' type="select">{this.state.grade.map(grade => { return (<option value={grade}>{grade}</option>) })}</Input></h3>
              )
            })}</Col>
        </Row>

      </div>
    )
  }
}
