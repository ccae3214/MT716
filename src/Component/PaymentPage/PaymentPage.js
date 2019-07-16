import React, { Component } from 'react'
import { Alert, Button, Badge, Col, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, TabContent, TabPane, Nav, NavLink, NavItem, InputGroupAddon, } from 'reactstrap'
import api from './api'
import classnames from 'classnames';
import './payment.css'

function FieldGroup({ id, disabled, label, amount, }) {
  return (
    <div>
      <Col>
        <h5 id={id} >{label}</h5>
      </Col>
      <Col>
        <Label >
          <Input defaultValue={amount} disabled={disabled} /><Input type={"checkbox"} id={id} />
        </Label>
      </Col>
    </div>
  );
}

export default class PaymentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reference_no: this.props.id,
      payment: {
        reference_no: this.props.id,
        checkindate: {},
        checkoutdate: {},
        tuition1: {},
        tuition2: {},
        tuition3: {},
        tuition4: {},
        tuitionpayall: {},


      }
    }

  }

  componentWillMount() {
    //取得該學生 get_payment 
    api.get_payment(this.props.id).then(res => { this.setState({ get_payment: res }) }).catch(err => { this.setState({ err_get_payment: err }) });
  }


  handlePayall() {
    document.getElementById('Tuition_Fee4').value = false
  }



  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5>學生付款Student Payment</h5>
        </Alert>

        <Form >
          <div >
            <Container className="border">
              <FormGroup row></FormGroup>
              <FormGroup row>
                <Col sm={2} >
                  <Label  >Reference_no</Label>
                </Col>
                <Col sm={2}>
                  <Input id={'reference_no'} value={this.props.id} />
                </Col>
                <Col sm={2} >
                  <Label >Check_in_date</Label>
                </Col>
                <Col sm={2}>
                  <Input type='date' id={'check_in_date'} />
                </Col>
                <Col sm={2} >
                  <Label >Check_out_date</Label>
                </Col>
                <Col sm={2}>
                  <Input type='date' id={'check_out_date'} />
                </Col>
              </FormGroup>


              <FormGroup row>
                <FieldGroup label='Tuition_1' id='tuition_1' amount='5000' row disabled />
                <FieldGroup label='Tuition_2' id='tuition_2' amount='6000' row disabled />
                <FieldGroup label='Tuition_3' id='tuition_3' amount='5000' row disabled />
                <FieldGroup label='Tuition_4' id='tuition_4' amount='6000' row disabled />
                <FieldGroup label='Tuition_payall' id='tuition_payall' amount='20000' row disabled />
                <FieldGroup label='Accomodation_1' id='accomodation_1' amount='6000' row disabled />
                <FieldGroup label='Accomodation_2' id='accomodation_2' amount='6000' row disabled />
                <FieldGroup label='Accomodation_over60' id='accomodation_over60' amount='' />
                <FieldGroup label='Foodmaterial' id='foodmaterial' amount='5000' row disabled />
                <FieldGroup label='Marketing' id='marketing' amount='20000' row disabled />
                <FieldGroup label='Uniform' id='uniform' amount='5000' row disabled />
                <FieldGroup label='Biodata' id='biodata' amount='5000' row disabled />
                <FieldGroup label='Airfare' id='Airfare' amount='5000' row disabled />
                <FieldGroup label='Id_Picture' id='Id_Picture' amount='5000' row disabled />
                <FieldGroup label='PayBy' id='payby' />
                <FieldGroup label='advance(deposit)' id='advance' amount='0' row />
              </FormGroup>
              <FormGroup>
                <div>
                  <Col>
                    <Label id={'PS'} >PS</Label>
                  </Col>
                  <Col>
                    <Input type={'textarea'} />
                  </Col>
                </div>
              </FormGroup>
            </Container>
          </div>
        </Form>
        <Button outline color='primary'>save</Button><Button outline color='success'>checkout</Button>
      </div>
    )
  }
}
