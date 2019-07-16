import React, { Component } from 'react'
import { Alert, Button, Badge, Col, Row, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, TabContent, TabPane, Nav, NavLink, NavItem, InputGroupAddon, } from 'reactstrap'
import api from '../StudentPage/api'
import classnames from 'classnames';
import { assertPureish } from 'babel-types';
export default class DocumentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      documentation: {
        reference_no: this.props.id,
        training_ctfc: null,
        nbi: null,
        psa_birth_ctfc: null,
        local_ctfc: null,
        psa_marrige_ctfc: null,
        local_marriage_ctfc: null,
        school_document_tor: null,
        voters_id: null,
        sss_history_of_contribution: null,
        emplyment_ctfc: null,
        brgy_clearanceand_cedula: null,
        arguelles_medical: null,
        job_order: null
      },

    }
    this.fileInput = React.createRef();

    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    api.get_documentation(this.props.id).then(response => this.setState({ documentation: response })).catch(err => { this.setState({ err_documentation: err }) })
  }
  handleChange(event) {
    const documentation = this.state.documentation
    Object.keys(documentation).forEach(element => {
      if (element = event.target.id) {
        documentation[element] = URL.createObjectURL(event.target.files[0])
        this.setState({ documentation: documentation })
      }
    });
  }
  updatedocument() {
    api.update_documentation(this.props.id).then(response => this.setState({ documentation: response })).catch(err => { this.setState({ err_documentation: err }) })
  }
  ///點擊複製
  copyclipbroad(e) {
    const text = e.target.value
    document.execCommand('copy')

  }




  render() {
    const input = {
      border: '1px  solid #007BFF',
      'border-radius': '25px'
    }
    const input2 = {
      top: '4px'
    }
    return (
      <div>
        <Alert color="primary" className="text-center">
          <h5>學生文件Student Document</h5>
        </Alert>
        <Container>
          <Form >
            {Object.keys(this.state.documentation).map(documentation => {
              return (
                <FormGroup row style={input} className="text-center">
                  {documentation == "reference_no" ?
                    <Label for="documentation" sm={1}>{documentation}</Label>
                    :
                    <Label for="documentation" sm={1}>{documentation}
                      {documentation !== null ? <img id='img' width='100' height='100' src={this.state.documentation[documentation]} /> : null}</Label>
                  }
                  {documentation == "reference_no" ?
                    <Label for="documentation" sm={4}>{this.state.documentation[documentation]}</Label>
                    :
                    <Col sm={4} style={input2}>
                      <Input
                        id={documentation}
                        type='file'
                        ref={this.fileInput}
                        onChange={this.handleChange}
                        files={this.state.documentation[documentation]}
                      />
                    </Col>
                  }
                </FormGroup>
              )
            })}

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Col>
            </FormGroup>

          </Form>
        </Container>
      </div>
    )
  }
}
