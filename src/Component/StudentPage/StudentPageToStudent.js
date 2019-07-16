//show myprofile,myschedule,mydocument,myticket,mypayment,myjoborder,myagency,mytraning,mylending
import React, { Component } from 'react'
import { Alert, Button, Table, Badge, Col, Row, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, TabContent, TabPane, Nav, NavLink, NavItem, InputGroupAddon, } from 'reactstrap'
import api from './api'
import classnames from 'classnames';
export default class StudentPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      student: {
        reference_no: this.props.id,
        jobtype: '',
        cel_no: '',
        encoding_date: '',
        permanent_address: '',
        picture: '',
        passport_no: '',
        birthday: '',
        age: '',
        height: '',
        weight: '',
        language: '',
        religion: '',
        status: '',
        passport: '',
        remarks_passport: '',
        unified: '',
        remarks_unified: '',
        comments: '',
        applicant_source: '',
        applicant_source_name: '',
        give_name: '',
        mid_name: '',
        last_name: '',
        give_name_of_married_spouse: '',
        mid_name_of_married_spouse: '',
        last_name_of_married_spouse: '',
      },
      children_detail: [
        {
          reference_no: this.props.id,
          number: '',
          child_name: '',
          child_gender: '',
          child_age: ''
        }],
      education_background: [{
        reference_no: this.props.id,
        number: '',
        name_of_school: '',
        location: '',
        major: '',
        from_date: '',
        to_date: '',
        attainment: '',
      }],

      experience_working_abroad: [{
        reference_no: this.props.id,
        nucmber: '',
        name_of_employer: '',
        country_city: '',
        description: '',
        from_date: '',
        to_date: ''
      }],
      family_background: {
        reference_no: this.props.id,
        total_family_child_number: '',
        child_rank: '',
        give_name_of_father: '',
        mid_name_of_father: '',
        last_name_of_father: '',
        age_of_father: '',
        give_name_of_mother: '',
        mid_name_of_mother: '',
        last_name_of_mother: '',
        age_of_mother: '',
        number_of_brother: '',
        number_of_sister: ''
      },
      local_employment: [{
        reference_no: this.props.id,
        number: '',
        name_of_employer: '',
        country_city: '',
        description: '',
        from_date: '',
        to_date: ''
      }],
      activeTab: 1,
      response: {},
      err: {},

    }
    {
      this.reload = this.reload.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeChildrenDetail = this.handleChangeChildrenDetail.bind(this)
      this.handleChangeFamilyBackground = this.handleChangeFamilyBackground.bind(this)
      this.handleChangeEducationBackground = this.handleChangeEducationBackground.bind(this)
      this.handleChangeExperienceWorkingAbroad = this.handleChangeExperienceWorkingAbroad.bind(this)
      this.handleChangeLocalEmployment = this.handleChangeLocalEmployment.bind(this)
      this.handleChangeInput = this.handleChangeInput.bind(this)
      this.toggle = this.toggle.bind(this)
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.delit = this.delit.bind(this)
    }
  }

  componentWillMount() {
    const that = this
    const student = this.state.student
    if (student !== undefined) {
      student.reference_no = this.props.id
      this.setState({ student })
    }
    const education_background = this.state.education_background
    if (education_background !== undefined) {
      education_background.reference_no = this.props.match.params.id
      this.setState({ education_background })
    }
    const experience_working_abroad = this.state.experience_working_abroad
    if (experience_working_abroad !== undefined) {
      experience_working_abroad.reference_no = this.props.match.params.id
      this.setState({ experience_working_abroad })
    }
    const family_background = this.state.family_background
    if (family_background !== undefined) {
      family_background.reference_no = this.props.match.params.id
      this.setState({ family_background })
    }
    const local_employment = this.state.local_employment
    if (local_employment !== undefined) {
      local_employment.reference_no = this.props.match.params.id
      this.setState({ local_employment })
    }
    const ref = this.state.student
    api.get_student(ref).then(response => this.setState({ student: response })).catch(err => { this.setState({ err_students: err }) })
    api.get_local_employment(ref).then(response => this.setState({ local_employment: response })).catch(err => { this.setState({ err_local_employment: err }) })
    api.get_family_background(ref).then(response => this.setState({ family_background: response })).catch(err => { this.setState({ err_family_background: err }) })
    api.get_experience_working_abroad(ref).then(response => this.setState({ experience_working_abroad: response })).catch(err => { this.setState({ err_experience_working_abroad: err }) })
    api.get_education_background(ref).then(response => this.setState({ education_background: response })).catch(err => { this.setState({ err_education_background: err }) })
    api.get_children_detail(ref).then(response => this.setState({ children_detail: response })).catch(err => this.setState({ err_children_detail: err }))
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  handleChange(event) {
    const student = this.state.student
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  ///create fuction
  create(event) {
    const table = event.target.name
    //state->create
    switch (table) {
      case 'children_detail': {
        const children_detail = this.state.children_detail
        const new_children_detail = {
          reference_no: this.props.id,
          number: this.state.children_detail.length + 1,
          child_name: '',
          child_gender: '',
          child_age: ''
        }
        children_detail.push(new_children_detail)
        this.setState(children_detail)
        //api->create_children_detail
        api.create_children_detail(new_children_detail).then().catch(err => { this.setState({ err_children_detail: err }) })
        break;
      }
      case 'education_background': {
        //state->create
        const education_background = this.state.education_background
        const new_education_background = {
          reference_no: this.props.id,
          number: this.state.education_background.length + 1,
          name_of_school: '',
          location: '',
          major: '',
          from_date: '',
          to_date: '',
          attainment: ''
        }
        education_background.push(new_education_background)
        this.setState(education_background)
        //api->create_education_background
        api.create_education_background(new_education_background).then().catch(err => { this.setState({ err_children_detail: err }) })

        break;
      }
      case 'experience_working_abroad': {
        //state->create
        const experience_working_abroad = this.state.experience_working_abroad
        const new_experience_working_abroad = {
          reference_no: this.props.id,
          number: this.state.experience_working_abroad.length + 1,
          name_of_employer: '',
          country_city: '',
          description: '',
          from_date: '',
          to_date: ''
        }
        experience_working_abroad.push(new_experience_working_abroad)
        this.setState(experience_working_abroad)
        //api->create_experience_working_abroad

        api.create_experience_working_abroad(new_experience_working_abroad).then().catch(err => { this.setState({ err_create_experience_working_abroad: err }) })
        break;
      }
      case 'local_employment': {
        //state->create
        const local_employment = this.state.local_employment
        const new_local_employment = {
          reference_no: this.props.id,
          number: this.state.local_employment.length + 1,
          name_of_employer: '',
          country_city: '',
          description: '',
          from_date: '',
          to_date: ''
        }
        local_employment.push(new_local_employment)
        this.setState(local_employment)
        //api->create_local_employment
        api.create_local_employment(new_local_employment).then().catch(err => { this.setState({ err_create_local_employment: err }) })
        break;
      }
      default:
        break;
    }
  }
  ///delit fuction
  delit(event) {
    const table = event.target.name
    switch (table) {
      case 'children_detail': {
        const delit_child = {
          reference_no: this.props.id,
          number: this.state.children_detail.length
        }
        alert(JSON.stringify(delit_child))
        api.delit_children_detail(delit_child).then().catch(err => { this.setState({ err_children_detail: err }) })
        //state_delit
        const children_detail = this.state.children_detail
        children_detail.pop()
        this.setState(children_detail)
        break;
      }
      case 'education_background': {
        const delit_education_background = {
          reference_no: this.props.id,
          number: this.state.education_background.length
        }
        alert(JSON.stringify(delit_education_background))
        api.delit_education_background(delit_education_background).then().catch(err => { this.setState({ err_delit_education_background: err }) })
        //state_delit
        const education_background = this.state.education_background
        education_background.pop()
        this.setState(education_background)
        break;
      }
      case 'experience_working_abroad': {
        const delit_experience_working_abroad = {
          reference_no: this.props.id,
          number: this.state.experience_working_abroad.length
        }
        alert(JSON.stringify(delit_experience_working_abroad))
        api.delit_experience_working_abroad(delit_experience_working_abroad).then().catch(err => { this.setState({ err_delit_experience_working_abroad: err }) })
        //state_delit
        const experience_working_abroad = this.state.experience_working_abroad
        experience_working_abroad.pop()
        this.setState(experience_working_abroad)
        break;
      }
      case 'local_employment': {
        const delit_local_employment = {
          reference_no: this.props.id,
          number: this.state.local_employment.length
        }
        alert(JSON.stringify(delit_local_employment))
        api.delit_local_employment(delit_local_employment).then().catch(err => { this.setState({ err_delit_local_employment: err }) })
        //state_delit
        const local_employment = this.state.local_employment
        local_employment.pop()
        this.setState(local_employment)
        break;
      }
      default:
        break;
    }
  }
  ///update fuction
  update(event) {
    const table = event.target.name
    switch (table) {
      case 'student': {
        api.update_student(this.state.student).then(alert('修改完成updated')).catch(err => this.setState({ err: err }))

        break;
      }
      case 'children_detail': {
        alert(alert('修改完成updated'))
        this.state.children_detail.map(family_background => (
          api.update_children_detail(family_background).then().catch(err => { this.setState({ err_children_detail: err }) })
        ))
        break;
      }
      case 'family_background': {
        //if not exist api->create 時create新的值
        //if  exist api->create 時update新的值
        api.update_family_background(this.state.family_background).then(alert(alert('修改完成updated'))).catch(err => { this.setState({ err_family_background: err }) })
        break;
      }
      case 'experience_working_abroad': {
        alert(alert('修改完成updated'))
        this.state.experience_working_abroad.map(experience_working_abroad => (
          api.update_experience_working_abroad(experience_working_abroad).then().catch(err => { this.setState({ err_experience_working_abroad: err }) })
        ))
        break;
      }
      case 'education_background': {
        alert(alert('修改完成updated'))
        this.state.education_background.map(education_background => (
          api.update_education_background(education_background).then().catch(err => { this.setState({ err_education_background: err }) })
        ))
        break;
      }
      case 'local_employment': {
        alert(alert('修改完成updated'))
        this.state.local_employment.map(local_employment => (
          api.update_local_employment(local_employment).then().catch(err => { this.setState({ err_local_employment: err }) })
        ))
        break;
      }
      default:
        break;
    }
  }
  ///change fuction
  handleChangeChildrenDetail(event) {
    const children_detail = this.state.children_detail
    const { name, value } = event.target;
    if (children_detail !== undefined) {
      const id = children_detail[event.target.id - 1]
      if (name == 'child_name')
        id.child_name = value
      else if (name == 'child_age')
        id.child_age = value
      else if (name == 'child_gender')
        id.child_gender = value
    }
    this.setState({ children_detail })
  }
  handleChangeFamilyBackground(event) {
    const family_background = this.state.family_background
    if (family_background !== undefined) {
      family_background[event.target.name] = event.target.value
      this.setState({ family_background })
    }
  }
  handleChangeEducationBackground(event) {
    const education_background = this.state.education_background
    const { name, value } = event.target;
    if (education_background !== undefined) {
      const id = education_background[event.target.id - 1]
      if (name == 'name_of_school')
        id.name_of_school = value
      else if (name == 'location')
        id.location = value
      else if (name == 'major')
        id.major = value
      else if (name == 'from_date')
        id.from_date = value
      else if (name == 'to_date')
        id.to_date = value
      else if (name == 'attainment')
        id.attainment = value

    }
    this.setState({ education_background })
  }
  handleChangeExperienceWorkingAbroad(event) {
    const experience_working_abroad = this.state.experience_working_abroad
    const { name, value } = event.target;
    if (experience_working_abroad !== undefined) {
      const id = experience_working_abroad[event.target.id - 1]
      if (name == 'name_of_employer')
        id.name_of_employer = value
      else if (name == 'country_city')
        id.country_city = value
      else if (name == 'description')
        id.description = value
      else if (name == 'from_date')
        id.from_date = value
      else if (name == 'to_date')
        id.to_date = value
    }
    this.setState({ experience_working_abroad })

  }
  handleChangeLocalEmployment(event) {
    const local_employment = this.state.local_employment
    const { name, value } = event.target;
    if (local_employment !== undefined) {
      const id = local_employment[event.target.id - 1]
      if (name == 'name_of_employer')
        id.name_of_employer = value
      else if (name == 'country_city')
        id.country_city = value
      else if (name == 'description')
        id.description = value
      else if (name == 'from_date')
        id.from_date = value
      else if (name == 'to_date')
        id.to_date = value
    }
    this.setState({ local_employment })
  }
  handleChangeInput(event) {
    const student = this.state.student
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }

  reload(tab) {
    window.location.reload()

  }
  render() {
    const input = {
      border: 'none',
      'border-bottom': '2px solid blue',
    }
    const input2 = {
      border: 'none',
      'border': '2px solid #6DBBFE',
    }
    const thead = {
      border: 'none',
      'background-color': '#CCE5FF'
    }
    const tbody = {
      border: 'none',
      'background-color': '#DEECF1'
    }

    return (
      <div>
        <Alert color="primary" className="text-center">
          <h5>學生資料Student BIOData</h5>
        </Alert>

        <Nav tabs justified >
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              基本資料<br></br>bio_data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              兒女詳細資料CHILDREND_DETAIL
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              家庭背景FAMILY_BACKGROUND
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              教育背景EDUCATION_BACKGROUND
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              國外工作經驗EXPERIENCE_WORKING_ABROAD
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            >
              國內工作經驗LOCAL_EMPLOYMENT
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Container>
              <Alert color="primary" className="text-center">
                <h5>  學生基本資料Student BioData</h5>
              </Alert>
              <Form>
                <FormGroup row inline>
                  <Col xs="4" >
                    <Alert color="primary">
                      Match Trend Training & Assessment Center Corp.
       </Alert>

                  </Col>

                  <Col xs="4">
                    <Label for="exampleCustomSelect">工作類型JOBTYPE</Label>
                    <CustomInput type="select" name="jobtype" onChange={this.handleChange} value={this.state.student.jobtype}>
                      <option value=""></option>
                      <option value="CTF">(CTF)女看護工CareTakerFemale</option>
                      <option value="CTM">(CTM)男看護工CareTakerMale</option>
                      <option value="CGF">(CGF)女幫傭CareGiverFemale</option>
                      <option value="CGM">(CGM)男幫傭CareGiverMale</option>
                      <option value="SWF">(SWF)女技術工SkillWorkerFemale</option>
                      <option value="SWM">(SWM)男技術工SkillWorkerMale</option>
                      <option value="FF">(FF)女漁夫FisherFemale</option>
                      <option value="FM">(FM)男漁夫FisherMale</option>
                    </CustomInput>
                  </Col>

                  <Col xs="3" >
                    <Label for="exampleSelect"> 參考編號reference_no</Label>
                    <Input type="number" name="reference_no" id="reference_no" onChange={this.handleChangeId} value={this.state.student.reference_no} id='input' />
                  </Col>

                </FormGroup>

                {// picture
                }
                <FormGroup >
                  <Col xs="12">
                    <Label for="exampleCustomFileBrowser"> 照片picture</Label>
                    <CustomInput type="file" id="exampleCustomFileBrowser" name="picture" label="Yo, pick a file!" value={this.state.student.picture} />
                  </Col>
                </FormGroup>


                {// NAME
                }
                <FormGroup>
                  <Label>姓名(NAME)</Label>
                  <Col>
                    <Label>姓LAST_NAME  </Label>
                    <Input bsSize="sm" id='input' name="last_name" onChange={this.handleChange} value={this.state.student.last_name} />
                    <Label>中間名MID_NAME  </Label>
                    <Input bsSize="sm" id='input' name="mid_name" onChange={this.handleChange} value={this.state.student.mid_name} />
                    <Label>名GIVE_NAME  </Label>
                    <Input bsSize="sm" id='input' name="give_name" onChange={this.handleChange} value={this.state.student.give_name} />

                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col >
                    <Label>手機CEL_NO  </Label>
                    <Input bsSize="sm" id='input' type="number" name="cel_no" onChange={this.handleChange} value={this.state.student.cel_no} />
                    <Label>建檔日期ENCODING_DATE  </Label>
                    <Input bsSize="sm" id='input' name="encoding_date" type="text" value={this.state.student.encoding_date} onChange={this.handleChange} />
                  </Col>
                </FormGroup>


                <FormGroup >
                  <Col>
                    <Label>永久聯絡住址PERMANENT_ADDRESS  </Label>
                    <Input bsSize="sm" id='input' name="permanent_address" onChange={this.handleChange} value={this.state.student.permanent_address} />
                    <Label>護照號碼PASSPORT_NO  </Label>
                    <Input bsSize="sm" id='input' name="passport_no" type="text" onChange={this.handleChange} value={this.state.student.passport_no} />
                  </Col>
                </FormGroup>

                <FormGroup >
                  <Col>
                    <Label>生日BIRTHDAY  </Label>
                    <Input bsSize="sm" id='input' name="birthday" type="date" onChange={this.handleChange} value={this.state.student.birthday} />
                    <Label>年齡AGE  </Label>
                    <Input bsSize="sm" id='input' name="age" type="number" onChange={this.handleChange} value={this.state.student.age} />
                  </Col>
                </FormGroup>

                <FormGroup >
                  <Col>
                    <Label>身高HEIGHT  </Label>
                    <Input bsSize="sm" id='input' name="height" type="number" onChange={this.handleChange} value={this.state.student.height} />
                    <Label>(公分cm)</Label>
                  </Col>
                  <Col>
                    <Label>體重WEIGHT  </Label>
                    <Input bsSize="sm" id='input' name="weight" type="number" onChange={this.handleChange} value={this.state.student.weight} />
                    <Label>(公斤kg)  </Label>
                  </Col>
                </FormGroup>

                <FormGroup >
                  <Col>
                    <Label>語言能力LANGUAGE  </Label>
                    <Input bsSize="sm" id='input' name="language" onChange={this.handleChange} value={this.state.student.language} />
                    <Label>宗教信仰RELIGION  </Label>
                    <Input bsSize="sm" id='input' name="religion" onChange={this.handleChange} value={this.state.student.religion} />
                  </Col>
                </FormGroup>

                {// married_spouse_name
                }
                <FormGroup Row>
                  <Col>
                    <Label>婚姻狀況STATUS  </Label>
                    <Input bsSize="sm" id='input' type="select" name="status" onChange={this.handleChange} value={this.state.student.status} >
                      <option value="single">single</option>
                      <option value="marriage">marriage</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label>配偶的姓名(married_spouse_name)  </Label>
                  <Col>
                    <Label>姓LAST_NAME  </Label>
                    <Input bsSize="sm" id='input' name="last_name_of_married_spouse" onChange={this.handleChange} value={this.state.student.last_name_of_married_spouse} />
                    <Label>中間名MID_NAME  </Label>
                    <Input bsSize="sm" id='input' name="mid_name_of_married_spouse" onChange={this.handleChange} value={this.state.student.mid_name_of_married_spouse} />
                    <Label>名GIVE_NAME  </Label>
                    <Input bsSize="sm" id='input' name="give_name_of_married_spouse" onChange={this.handleChange} value={this.state.student.give_name_of_married_spouse} />
                  </Col>
                </FormGroup>





                <FormGroup>
                  <Col>
                    <Label>護照PASSPORT  </Label>
                    <Input bsSize="sm" id='input' name="passport" onChange={this.handleChange} value={this.state.student.passport} />
                    <Label>備註REMARK  </Label>
                    <Input bsSize="sm" id='input' name="remarks_passport" onChange={this.handleChange} value={this.state.student.remarks_passport} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <Label>唯一ID UNIFIED_ID  </Label>
                    <Input bsSize="sm" id='input' name="unified" onChange={this.handleChange} value={this.state.student.unified} />
                    <Label>備註REMARK  </Label>
                    <Input bsSize="sm" id='input' name="remarks_unified" onChange={this.handleChange} value={this.state.student.remarks_unified} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <Label>評語(COMMENTS)  </Label>
                    <Input bsSize="sm" id='input' type="textarea" name="comments" onChange={this.handleChange} value={this.state.student.comments} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <InputGroup>
                      <Label>來源(APPLICANT_SOURCE)  </Label>
                      <Input bsSize="sm" id='input' type="select" name="applicant_source" onChange={this.handleChange} value={this.state.student.applicant_source} >
                        <option value="AD">廣告AD</option>
                        <option value="AGENT">機構AGENT</option>
                        <option value="APPLICANT">介紹人APPLICANT</option>
                        <option value="WALK_IN">走進來WALK_IN</option>
                      </Input>
                      <Input bsSize="sm" id='input' type="text" name="applicant_source_name" onChange={this.handleChange} value={this.state.student.applicant_source_name} />
                    </InputGroup>
                  </Col>

                </FormGroup>
              </Form>
              <Button id='rightbtn' name="student" size="xs" color="danger" onClick={this.update} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" onClick={this.reload}>重整reload </Button>
            </Container>
          </TabPane>

          <TabPane tabId="2">
            {// CHILDREND_DETAIL 9/18
            }
            <Container>
              <Form className="text-center">
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">CHILDREND_DETAIL</Badge> </h3>
                </Alert>
                <Table responsive hover borderd >
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <thead style={thead}>
                    <tr>
                      <th>#</th>
                      <th>名子<br />(NAME))</th>
                      <th> 性別<br />(GENDER)</th>
                      <th>年齡<br />(AGE) </th>
                    </tr>
                  </thead>
                  <tbody style={tbody}>
                    {this.state.children_detail.map(child => {
                      return (
                        <tr>
                          <th scope="row">{child.number}</th>
                          <td sm="12" md="4"><Input bsSize="sm" id='input2' name="child_name" id={child.number} onChange={this.handleChangeChildrenDetail} value={child.child_name} /></td>
                          <td sm="12" md="4"><Input bsSize="sm" id='input2' name="child_gender" id={child.number} onChange={this.handleChangeChildrenDetail} value={child.child_gender} /></td>
                          <td sm="12" md="4"><Input bsSize="sm" id='input2' name="child_age" id={child.number} onChange={this.handleChangeChildrenDetail} value={child.child_age} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Form>
              <Button color='primary' name='children_detail' onClick={this.create}>+</Button>
              {'     '}
              <Button color='primary' name='children_detail' name='children_detail' onClick={this.delit}>-</Button>
              <Button id='rightbtn' size="xs" color="danger" name='children_detail' onClick={this.update} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" name='children_detail' onClick={this.reload} >重整reload</Button>
            </Container>
          </TabPane>
          <TabPane tabId="3">
            <Container><Form>
              {// familyBackground9/19
              }
              <FormGroup name="family_background">
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">FAMILY_BACKGROUND</Badge> </h3>
                  <Label>家中的排行(FAMILY_CHILD_NUMBER)  </Label>
                  <InputGroup>
                    <Label>總數(TOTAL)  </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="total_family_child_number" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.total_family_child_number} />
                  </InputGroup>
                  <InputGroup>
                    <Label>你是第幾個(NUMBER)  </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="child_rank" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.child_rank} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <Label>父親的姓名(NAME_OF_FATHER)  </Label>
                  <InputGroup>
                    <Label>姓LAST_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="last_name_of_father" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.last_name_of_father} />
                  </InputGroup>
                  <InputGroup>
                    <Label>中間名MID_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="mid_name_of_father" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.mid_name_of_father} />
                  </InputGroup>
                  <InputGroup>
                    <Label>名GIVE_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="give_name_of_father" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.give_name_of_father} />
                  </InputGroup>
                  <InputGroup>
                    <Label>父親年齡AGE  </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="age_of_father" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.age_of_father} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <Label>母親的姓名(NAME_OF_MOTHER)  </Label>
                  <InputGroup>
                    <Label>姓LAST_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="last_name_of_mother" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.last_name_of_mother} />
                  </InputGroup>
                  <InputGroup>
                    <Label>中間名MID_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="mid_name_of_mother" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.mid_name_of_mother} />
                  </InputGroup>
                  <InputGroup>
                    <Label>名GIVE_NAME  </Label>
                    <Input className="text-center" bsSize="sm" id='input' name="give_name_of_mother" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.give_name_of_mother} />
                  </InputGroup>
                  <InputGroup>
                    <Label>母親年齡AGE </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="age_of_mother" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.age_of_mother} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Label>兄弟數(NUMBER_OF_BROTHER)  </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="number_of_brother" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.number_of_brother} />
                  </InputGroup>
                  <InputGroup>
                    <Label>姊妹數(NUMBER_OF_SISTER)  </Label>
                    <Input className="text-center" bsSize="sm" id='input' type="number" name="number_of_sister" onChange={this.handleChangeFamilyBackground} value={this.state.family_background.number_of_sister} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                </Alert>
              </FormGroup>

            </Form>
              <Button id='rightbtn' size="xs" color="danger" name='family_background' onClick={this.update} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" name='family_background' onClick={this.reload} >重整reload</Button>
            </Container>
          </TabPane>
          <TabPane tabId="4">
            <Container><Form>
              {// educationBackground
              }
              <FormGroup name="education_background">
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">EDUCATION_BACKGROUND</Badge> </h3>
                </Alert>
                <Table responsive hover borderd >
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <thead style={thead}>
                    <th>#</th>
                    <th xs="2" sm="2" md="z"> 教育程度<br />(ATTAINMENT)  </th>
                    <th xs="2" sm="2" md="2"> 學校名稱<br />(NAME_OF_SCHOOL) </th>
                    <th xs="2" sm="2" md="2"> 學校地點<br />(LOCATION/CITY) </th>
                    <th xs="2" sm="2" md="2"> 主修<br />(MAJOR) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(FROM) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(TO) </th>
                  </thead>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <tbody style={tbody}>
                    {this.state.education_background.map(education_background => {
                      return (
                        <tr>
                          <th scope="row">{education_background.number}</th>
                          <td sm="2" md="2" className="text-center">
                            <Input bsSize="sm" id='input2' type="select" name="attainment" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.attainment} >
                              <option value=""></option>
                              <option value="1">primary/elemantary</option>
                              <option value="2">secandary/high school</option>
                              <option value="3">terfiary/college_university</option>
                            </Input> </td>
                          <td sm="2" sm="2" md="2"><Input bsSize="sm" id='input2' name="name_of_school" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.name_of_school} /></td>
                          <td sm="2" md="2"><Input bsSize="sm" id='input2' name="location" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.location} /></td>
                          <td sm="2" md="2"><Input bsSize="sm" id='input2' name="major" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.major} /></td>
                          <td sm="2" md="2"><Input bsSize="sm" id='input2' type="date" name="from_date" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.from_date} /></td>
                          <td sm="2" md="2"><Input bsSize="sm" id='input2' type="date" name="to_date" id={education_background.number} onChange={this.handleChangeEducationBackground} value={education_background.to_date} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </FormGroup>

            </Form>
              <Button color='primary' name='education_background' onClick={this.create.bind(this)}>+</Button>
              {'     '}
              <Button color='primary' name='education_background' onClick={this.delit.bind(this)}>-</Button>
              <Button id='rightbtn' size="xs" color="danger" name='education_background' onClick={this.update.bind(this)} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" onClick={this.reload} >重整reload</Button>
            </Container>
          </TabPane>
          <TabPane tabId="5">
            <Container><Form>
              {// experience_working_abroad9/19
              }
              <FormGroup name="experience_working_abroad" Row>
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">EXPERIENCE_WORKING_ABROAD</Badge> </h3>
                </Alert>
                <Table responsive hover borderd >
                  <thead style={thead}>
                    <th>#</th>
                    <th xs="2" sm="2" md="2"> 雇主姓名<br />(NAME_OF_EMPLOYER) </th>
                    <th xs="2" sm="2" md="2"> 工作地點<br />(COUNTRY/CITY) </th>
                    <th xs="2" sm="2" md="2"> 工作內容<br />(DESCRIPTION) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(FROM) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(TO) </th>
                  </thead>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <tbody style={tbody}>
                    {this.state.experience_working_abroad.map(experience_working_abroad => {
                      return (
                        <tr>
                          <th scope="row">{experience_working_abroad.number}</th>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="name_of_employer" id={experience_working_abroad.number} onChange={this.handleChangeExperienceWorkingAbroad} value={experience_working_abroad.name_of_employer} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="country_city" id={experience_working_abroad.number} onChange={this.handleChangeExperienceWorkingAbroad} value={experience_working_abroad.country_city} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="description" id={experience_working_abroad.number} onChange={this.handleChangeExperienceWorkingAbroad} value={experience_working_abroad.description} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' type="date" name="from_date" id={experience_working_abroad.number} onChange={this.handleChangeExperienceWorkingAbroad} value={experience_working_abroad.from_date} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' type="date" name="to_date" id={experience_working_abroad.number} onChange={this.handleChangeExperienceWorkingAbroad} value={experience_working_abroad.to_date} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </FormGroup>

            </Form>
              <Button color='primary' name='experience_working_abroad' onClick={this.create}>+</Button>
              {'     '}
              <Button color='primary' name='experience_working_abroad' onClick={this.delit}>-</Button>
              <Button id='rightbtn' size="xs" color="danger" name='experience_working_abroad' onClick={this.update} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" onClick={this.reload} >重整reload</Button>
            </Container>
          </TabPane>

          <TabPane tabId="6">
            <Container><Form>
              {// local_employment
              }

              <FormGroup name="local_employment" Row>
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">LOCAL_EMPLOYMENT</Badge> </h3>
                </Alert>
                <Table responsive hover borderd >
                  <thead style={thead}>
                    <th>#</th>
                    <th xs="2" sm="2" md="2"> 雇主姓名<br />(NAME_OF_EMPLOYER) </th>
                    <th xs="2" sm="2" md="2"> 工作地點<br />(COUNTRY/CITY) </th>
                    <th xs="2" sm="2" md="2"> 工作內容<br />(DESCRIPTION) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(FROM) </th>
                    <th xs="2" sm="2" md="2"> 起迄<br />(TO) </th>
                  </thead>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <tbody style={tbody}>
                    {this.state.local_employment.map(local_employment => {
                      return (
                        <tr>
                          <th >{local_employment.number}</th>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="name_of_employer" id={local_employment.number} onChange={this.handleChangeLocalEmployment} value={local_employment.name_of_employer} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="country_city" id={local_employment.number} onChange={this.handleChangeLocalEmployment} value={local_employment.country_city} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' name="description" id={local_employment.number} onChange={this.handleChangeLocalEmployment} value={local_employment.description} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' type="date" name="from_date" id={local_employment.number} onChange={this.handleChangeLocalEmployment} value={local_employment.from_date} /></td>
                          <td sm="12" md="2"><Input bsSize="sm" id='input2' type="date" name="to_date" id={local_employment.number} onChange={this.handleChangeLocalEmployment} value={local_employment.to_date} /></td>
                        </tr>
                      )
                    })}

                  </tbody>
                </Table>
              </FormGroup>

            </Form>
              <Button color='primary' name='local_employment' onClick={this.create}>+</Button>
              {'     '}
              <Button color='primary' name='local_employment' onClick={this.delit}>-</Button>
              <Button id='rightbtn' size="xs" color="danger" name='local_employment' onClick={this.update} >修改UPDATE </Button>
              <Button id='leftbtn' size="xs" color="success" onClick={this.reload} >重整reload</Button>
            </Container>
          </TabPane>

          <Alert color="primary" className="text-center"> </Alert>
        </TabContent>
      </div>
    )
  }
}
