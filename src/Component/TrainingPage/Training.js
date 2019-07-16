import React, { Component } from 'react'
import { Alert, Button, Card, CardBody, Col, Table, Row, Input, InputGroup, InputGroupAddon, FormGroup, UncontrolledCollapse } from 'reactstrap'
import api from './api'
import { Link } from 'react-router-dom'
/*searchStudent page mutisearch didn't  done  only show all data and neet to sort the result and mark show new create in result */
export default class Training extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
      name: {
        reference_no: '',
        give_name: '',
        mid_name: '',
        last_name: '',
      },
      students: "",
      searchresult: [],
      delit_student: {
        reference_no: ''
      },
      response: '',
      err: ''
    };

  }
  componentDidMount() {

  }
  componentWillMount() {
    api.get_ckeckin_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });

  }


  goto(route) {
    this.props.history.replace(`/${route}`)
  }

  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5> 管理學生頁面StudentManagePage</h5>
        </Alert>
        {/*學生搜尋結果*/}
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
              <Input onChange={this.handleSearch} />
            </InputGroup>
          </Col>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Table hover size="sm" bordered responsive>
              <thead>
                <tr>
                  <th>編號reference_no</th>
                  <th>資料data</th>

                </tr>
              </thead>

              <tbody>
                {this.state.searchresult.map(student => {
                  if (!student.checkout_date)
                    return (
                      <tr >
                        <th scope="row" size="1">{student.jobtype}-{student.reference_no},   {student.give_name}   _{student.mid_name}   _{student.last_name}</th>
                        <td>
                          <Button outline size='sm' color='warning' onClick={this.goto.bind(this, 'TrainingGradePage/' + student.reference_no)}>TRAINING GRADE</Button>
                        </td>


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