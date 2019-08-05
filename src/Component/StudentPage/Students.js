import React, { Component } from 'react'
import { Alert, Button, Card, CardBody, CardTitle, Col, Table, Row, Input, InputGroup, Spinner, UncontrolledCollapse } from 'reactstrap'
import api from './api'
import { Link } from 'react-router-dom'
/*searchStudent page mutisearch didn't  done  only show all data and neet to sort the result and mark show new create in result */
export default class Students extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
      status: ["ALL", "NOT_YET_CHECKIN", "CKECK_IN", "CHECK_OUT", "DEPLOYED", "FINISHED_CONTRACT"],
      name: {
        reference_no: '',
        job_type: '',
        give_name: '',
        mid_name: '',
        last_name: '',
      },
      students: [],
      searchresult: [],
      selectedjobtype: '',
      selectedName: ' ',
      selectstudent: '',
      delit_student: {
        reference_no: ''
      },
      response: '',
      err: ''

    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDelitStudent = this.handleChangeDelitStudent.bind(this);

  }
  componentDidMount() {
    this.setState({
      name: {
        reference_no: '',
        give_name: '',
        mid_name: '',
        last_name: '',
      }
    })
    api.get_students().then(response => { this.setState({ students: response }) }).catch(err => { this.setState({ err_students: err }) });

  }
  componentWillMount() {
    api.get_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });

  }

  createstudent() {
    api.create_student(this.state.name).then(res => {
      alert('reference_no:' + (res.reference_no) + '\n' + res.give_name + '_' + res.mid_name + '_' + res.last_name + '\n' + 'create successed')
      api.get_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });
      this.setState({ name: { reference_no: '', give_name: '', mid_name: '', last_name: '', } });
      api.create_family_background(res).then((ress) => {
      }).catch((err) => {
        this.setState({ err: err })
      })
    }).catch((err) => {
      this.setState({ err: err })
    })

  }
  deletestudent() {
    api.delit_student(this.state.delit_student).then(res => {
      alert('reference_no:' + (res.reference_no) + '\n' + 'delete successed')
      api.get_students().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });
    }).catch(err => { this.setState({ err_delit_student: err }) });
  }
  goto(route) {
    this.props.history.push(`/${route}`)
  }
  handleChangeName(event) {
    const name = this.state.name
    name[event.target.name] = event.target.value
    this.setState({ name })
  }
  handleChangeDelitStudent(event) {
    const delit_student = this.state.delit_student
    delit_student[event.target.name] = event.target.value
    this.setState({ delit_student })
  }

  handleSearch(event) {
    const searchresult = this.state.searchresult
    var students = searchresult

    ///jobtypesearch類別搜索done
    var selectedjobtype = this.state.selectedjobtype
    if (event.target.name === 'jobtype') {
      selectedjobtype = event.target.value
      this.setState({ selectedjobtype: selectedjobtype })
      var newsearchresult = []
      if (selectedjobtype !== 'ALL') {
        newsearchresult = students.filter(student => {
          return (student.jobtype === selectedjobtype)
        })
        this.setState({ students: newsearchresult })
      }
      else {
        this.setState({ students: searchresult })
      }
    }
    ///
    ///fuzzynamesearch名稱搜索 not yet only name search
    var selectedName = this.state.selectedName
    if (event.target.name === 'name') {
      selectedName = event.target.value
      newsearchresult = []
      if (selectedName !== '') {
        newsearchresult = students.filter(student => {
          return ((student.give_name === selectedName) || (student.mid_name === selectedName) || (student.last_name === selectedName))
        })
        this.setState({ students: newsearchresult })
      }
      else {
        this.setState({ students: students })
      }
    }
    ///
  }


  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5> 管理學生頁面StudentManagePage</h5>
        </Alert>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
              <img src="/collection/png/add-1.png" display="inline-block" height="21" width="21" alt="create" /> create new student
             </Button>
            <Button outline color="primary" id="toggler2" style={{ marginBottom: '1rem' }}>
              <img src="/collection/png/substract.png" display="inline-block" height="21" width="21" alt="delete" /> delete old student
             </Button>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <UncontrolledCollapse toggler="#toggler">
              <Card>
                <CardBody>
                  <Col sm="12" md={{ size: 3 }}> <Input placeholder={'reference_no'} name="reference_no" onChange={this.handleChangeName} value={this.state.name.reference_no} /></Col>
                  <Col sm="12" md={{ size: 3 }}> <Input placeholder={'type'} name="job_type" onChange={this.handleChangeName} value={this.state.name.job_type} /></Col>
                  <Col sm="12" md={{ size: 3 }}> <Input placeholder={'Last_name'} name="last_name" onChange={this.handleChangeName} value={this.state.name.last_name} /></Col>
                  <Col sm="12" md={{ size: 3 }}> <Input placeholder={'Mid_name'} name="mid_name" onChange={this.handleChangeName} value={this.state.name.mid_name} /></Col>
                  <Col sm="12" md={{ size: 3 }}> <Input placeholder={'Give_name'} name="give_name" onChange={this.handleChangeName} value={this.state.name.give_name} /></Col>
                  <Col sm="12" md={{ size: 3 }}><Button outline color="primary" block size='sm' onClick={this.createstudent.bind(this)}>CREATE</Button></Col>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <UncontrolledCollapse toggler="#toggler2">
              <Card>
                <CardBody>
                  <Col sm="12" md={{ size: 6 }}>
                    <Input type="select" placeholder={'reference_no'} name="reference_no" onChange={this.handleChangeDelitStudent} value={this.state.delit_student.reference_no} >
                      <option value={0}>{'please select'}</option>
                      {this.state.searchresult.map(student => {
                        return (
                          <option value={student.reference_no}>{student.reference_no}</option>
                        )
                      })}
                    </Input>
                  </Col>
                  <Col sm="12" md={{ size: 3, offset: 3 }}> <Button outline color="primary" block size='sm' onClick={this.deletestudent.bind(this)}>DELETE</Button></Col>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </Col>
        </Row>
        <div >
          <Row >
            <Col sm="12" md={{ size: 2, offset: 1 }} >
              <Card>
                <p>jobtype</p>
                <CardBody>
                  <InputGroup>
                    <Input type="select" name="jobtype" onChange={this.handleSearch}>
                      {this.state.jobtypeSelected.map(Selected => {
                        return (
                          <option value={Selected}>{Selected}</option>
                        )
                      })}
                    </Input>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12" md={{ size: 2 }}>
              <Card>
                <p>status</p>
                <CardBody>
                  <InputGroup>
                    <Input type="select" name="status" onChange={this.handleSearch}>
                      {this.state.status.map(Selected => {
                        return (
                          <option value={Selected}>{Selected}</option>
                        )
                      })}
                    </Input>
                  </InputGroup>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12" md={{ size: 2 }} >
              <Card>
                <p>name</p>
                <CardBody>
                  <Input id='capitalize' name='name' onChange={this.handleSearch} />
                </CardBody>
              </Card>
            </Col>
            <Col sm="12" md={{ size: 2 }} >
              <Card>
                <p>height</p>
                <CardBody>
                  <Input name='height' onChange={this.handleSearch} />
                </CardBody>
              </Card>
            </Col>
            <Col sm="12" md={{ size: 2 }}>
              <Card>
                <p >weight</p>
                <CardBody>
                  <Input name='height' onChange={this.handleSearch} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <hr className="my-2" />
        {/*學生搜尋結果*/}
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            {!this.state.students[0] ? <div><Spinner type="grow" color="primary" /></div> : null}
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>編號reference_no</th>
                  <th>資料data</th>
                  <th>身高height</th>
                  <th>體重weight</th>
                  <th>年紀age</th>
                </tr>
              </thead>

              <tbody>

                {
                  this.state.students.map(student => {
                    return (
                      <tr>
                        <th scope="row" size="1"><Link id='capitalize' to={{ pathname: 'StudentPage/' + student.reference_no }}>{student.jobtype}-{student.reference_no},     {student.last_name} _{student.mid_name}   _{student.give_name}</Link></th>
                        <td style={{ right: '10px' }}>
                          <Button outline size='sm' color='info' onClick={this.goto.bind(this, 'StudentPage/' + student.reference_no)} >BIODATA</Button>{" "}
                        </td>
                        <td>{student.height}</td>
                        <td>{student.weight}</td>
                        <td>{student.age}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}