import React, { Component } from 'react'
import { Alert, Button, Badge, Col, Container, CustomInput, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, } from 'reactstrap'
import api from './api'

export default class CreateStudent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      student: {
        REFERENCE_NO: '',
        JOBTYPE: '',
        CEL_NO: '',
        ENCODING_DATE: new Date().toLocaleDateString(),
        PERMANENT_ADDRESS: '',
        PICTURE: '',
        PASSPORT_NO: '',
        BIRTHDAY: '',
        AGE: '',
        HEIGHT: '',
        WEIGHT: '', 
        LANGUAGE: '',
        RELIGION: '',
        STATUS: '',
        GIVE_NAME: '',
        MID_NAME: '',
        LAST_NAME: ''},
       MARRIED_SPOUSE_NAME: {
          GIVE_NAME: '',
          MID_NAME: '',
          LAST_NAME: '',
        },
        CHILDREND_DETAIL: {
          CHILD_NAME_1: '',
          CHILD_GENDER_1: '',
          CHILD_AGE_1: '',
          CHILD_NAME_2: '',
          CHILD_GENDER_2: '',
          CHILD_AGE_2: '',
          CHILD_NAME_3: '',
          CHILD_GENDER_3: '',
          CHILD_AGE_3: '',
          CHILD_NAME_4: '',
          CHILD_GENDER_4: '',
          CHILD_AGE_4: '',
          CHILD_NAME_5: '',
          CHILD_GENDER_5: '',
          CHILD_AGE_5: '',
        },
        FAMILY_BACKGROUND: {
          TOTAL_FAMILY_CHILD_NUMBER: '',
          CHILD_RANK: '',
          GIVE_NAME_OF_FATHER: '',
          MID_NAME_OF_FATHER: '',
          LAST_NAME_OF_FATHER: '',
          AGE_OF_FATHER: '',
          GIVE_NAME_OF_MOTHER: '',
          MID_NAME_OF_MOTHER: '',
          LAST_NAME_OF_MOTHER: '',
          AGE_OF_MOTHER: '',
          NUMBER_OF_BROTHERS: '',
          NUMBER_OF_SISTERS: '',
        },
        EDUCATION_BACKGROUND: {
          ATTAINMENT_1: '',
          NAME_OF_SCHOOL_1: '',
          LOCATION_1: '',
          MAJOR_1: '',
          FROM_1: '',
          TO_1: '',
          ATTAINMENT_2: '',
          NAME_OF_SCHOOL_2: '',
          LOCATION_2: '',
          MAJOR_2: '',
          FROM_2: '',
          TO_2: '',
          ATTAINMENT_3: '',
          NAME_OF_SCHOOL_3: '',
          LOCATION_3: '',
          MAJOR_3: '',
          FROM_3: '',
          TO_3: '',
        },
        EXPERENCE_WORKING_ABROAD: {
          NAME_OF_EMPLOYER_1: '',
          COUNTRY_CITY_1: '',
          DESCRIPTION_1: '',
          FROM_1: '',
          TO_1: '',
          NAME_OF_EMPLOYER_2: '',
          COUNTRY_CITY_2: '',
          DESCRIPTION_2: '',
          FROM_2: '',
          TO_2: '',
          NAME_OF_EMPLOYER_3: '',
          COUNTRY_CITY_3: '',
          DESCRIPTION_3: '',
          FROM_3: '',
          TO_3: '',
        },
        LOCAL_EMPLOYMENT: {
          NAME_OF_EMPLOYER_1: '',
          COUNTRY_CITY_1: '',
          DESCRIPTION_1: '',
          FROM_1: '',
          TO_1: '',
          NAME_OF_EMPLOYER_2: '',
          COUNTRY_CITY_2: '',
          DESCRIPTION_2: '',
          FROM_2: '',
          TO_2: '',
          NAME_OF_EMPLOYER_3: '',
          COUNTRY_CITY_3: '',
          DESCRIPTION_3: '',
          FROM_3: '',
          TO_3: '',

        },

        PASSPORT: '',
        REMARKS_PASSPORT: '',
        UNIFIED: '',
        REMARKS_UNIFIED: '',
        COMMENTS: '',
        APPLICANT_SOURCE: 'AGENT',
        APPLICANT_SOURCE_NAME: '123',

      
      RESPONSE: {},
      ERR: {},
      toggle_:{
        
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeMarriageSpouseName = this.handleChangeMarriageSpouseName.bind(this)
    this.handleChangeChildrendDetail = this.handleChangeChildrendDetail.bind(this)
    this.handleChangeFamilyBackground = this.handleChangeFamilyBackground.bind(this)
    this.handleChangeEducationBackground = this.handleChangeEducationBackground.bind(this)
    this.handleChangeExperienceWorkingAbroad = this.handleChangeExperienceWorkingAbroad.bind(this)
    this.handleChangeLocalEmployment = this.handleChangeLocalEmployment.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)

    this.addstudent = this.addstudent.bind(this)
  }
  componentDidMount() {
 
  }

  addstudent() {
    api.add_student(this.state.student).then((res) => {
      this.setState({ response: res })
    }).catch((err) => {
      this.setState({ err0: err })
    })
    
    
  }

  handleChange(event) {
    const student = this.state.student
    student[event.target.name] = event.target.value
    this.setState({ student })
  }

  handleChangeMarriageSpouseName(event) {
    const student = this.state.student.MARRIED_SPOUSE_NAME
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  handleChangeChildrendDetail(event) {
    const student = this.state.student.CHILDREND_DETAIL
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  handleChangeFamilyBackground(event) {
    const student = this.state.student.FAMILY_BACKGROUND
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  handleChangeEducationBackground(event) {
    const student = this.state.student.EDUCATION_BACKGROUND
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  handleChangeExperienceWorkingAbroad(event) {
    const student = this.state.student.EXPERENCE_WORKING_ABROAD
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  handleChangeLocalEmployment(event) {
    const student = this.state.student.LOCAL_EMPLOYMENT
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }

  handleChangeInput(event) {
    const student = this.state.student
    if (student !== undefined) {
      student[event.target.name] = event.target.value
      this.setState({ student })
    }
  }
  render() {
    return (
      <div >
      <Alert color="primary" className="text-center">
      <h5> 新增學生基本資料Create New Student BioData</h5>
    </Alert>
       


        <Container>
          <Form>
            <FormGroup row inline>
              <Col xs="4" >
                <Alert color="primary">
                  Match Trend Training & Assessment Center Corp.
         </Alert>

              </Col>
              <Col xs="4">
                <Label for="exampleCustomSelect"><Button color="success" block disabled>JOBTYPE</Button></Label>
                <CustomInput type="select" name="JOBTYPE" onChange={this.handleChange} value={this.state.student.JOBTYPE}>
                  <option value=""></option>
                  <option value="CTF">(CTF)CareTakerFemale</option>
                  <option value="CTM">(CTM)CareTakerMale</option>
                  <option value="CGF">(CGF)CareGiverFemale</option>
                  <option value="CGM">(CGM)CareGiverMale</option>
                  <option value="SWF">(SWF)SkillWorkerFemale</option>
                  <option value="SWM">(SWM)SkillWorkerMale</option>
                  <option value="FF">(FF)FisherFemale</option>
                  <option value="FM">(FM)FisherMale</option>
                </CustomInput>
              </Col>

             
            </FormGroup>

            {// picture
            }
            <FormGroup >
              <Col xs="12">
                <Label for="exampleCustomFileBrowser"><Button color="success" block disabled>PICTURE</Button></Label>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="PICTURE" label="Yo, pick a file!" value={this.state.student.REFERENCE_NO} />
              </Col>
            </FormGroup>

            {// NAME
            }
            <FormGroup classname="name">

              <InputGroup>
                <Col >
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>GIVE_NAME</Button></InputGroupAddon>
                  {this.state.student.NAME !== undefined ?
                    <Input name="GIVE_NAME" onChange={this.handleChange} value={this.state.student.NAME.GIVE_NAME} />
                    : <Input name="GIVE_NAME" onChange={this.handleChange} />}

                </Col>
                <Col >
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>MID_NAME</Button></InputGroupAddon>
                  {this.state.student.NAME !== undefined ?
                    <Input name="MID_NAME" onChange={this.handleChange} value={this.state.student.NAME.MID_NAME} />
                    : <Input name="MID_NAME" onChange={this.handleChange} />}
                </Col>
                <Col >
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>LAST_NAME</Button></InputGroupAddon>
                  {this.state.student.NAME !== undefined ?
                    <Input name="LAST_NAME" onChange={this.handleChange} value={this.state.student.NAME.LAST_NAME} />
                    : <Input name="LAST_NAME" onChange={this.handleChange} />}
                </Col>
              </InputGroup>

            </FormGroup>

            <FormGroup>
              <Col >
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>CEL_NO</Button></InputGroupAddon>
                  <Input name="CEL_NO" onChange={this.handleChange} value={this.state.student.CEL_NO} />
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>ENCODING_DATE</Button></InputGroupAddon>
                  <Input name="ENCODING_DATE" type="text" value={this.state.student.ENCODING_DATE} onChange={this.handleChange} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup >
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>PERMANENT_ADDRESS</Button></InputGroupAddon>
                  <Input name="PERMANENT_ADDRESS" onChange={this.handleChange} value={this.state.student.PERMANENT_ADDRESS} />
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>PASSPORT_NO</Button></InputGroupAddon>
                  <Input name="PASSPORT_NO" type="text" onChange={this.handleChange} value={this.state.student.PASSPORT_NO} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup >
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>BIRTHDAY</Button></InputGroupAddon>
                  <Input name="BIRTHDAY" type="date" onChange={this.handleChange} value={this.state.student.BIRTHDAY} />
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>AGE</Button></InputGroupAddon>
                  <Input name="AGE" type="number" onChange={this.handleChange} value={this.state.student.AGE} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup >
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>HEIGHT</Button></InputGroupAddon>
                  <Input name="HEIGHT" type="number" onChange={this.handleChange} value={this.state.student.HEIGHT} />
                  <InputGroupAddon addonType="append"><Button color="success" block disabled>cm</Button></InputGroupAddon>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>WEIGHT</Button></InputGroupAddon>
                  <Input name="WEIGHT" type="number" onChange={this.handleChange} value={this.state.student.WEIGHT} />
                  <InputGroupAddon addonType="append"><Button color="success" block disabled>kg</Button></InputGroupAddon>
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup >
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>LANGUAGE</Button></InputGroupAddon>
                  <Input name="LANGUAGE" onChange={this.handleChange} value={this.state.student.LANGUAGE} />
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>RELIGION</Button></InputGroupAddon>
                  <Input name="RELIGION" onChange={this.handleChange} value={this.state.student.RELIGION} />
                </InputGroup>
              </Col>
            </FormGroup>
            {// MARRIED_SPOUSE_NAME
            }
            <FormGroup Row>
              <Col>
                <InputGroup>

                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>STATUS</Button></InputGroupAddon>
                  <Input type="select" name="STATUS" onChange={this.handleChange} value={this.state.student.STATUS} >
                    <option value="SINGLE">SINGLE</option>
                    <option value="marriAGE">MARRIAGE</option>
                  </Input>
                </InputGroup>
              </Col>
            </FormGroup>

            {this.state.student.MARRIED_SPOUSE_NAME === undefined?
              <FormGroup>
                <Col>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>配偶的姓名(MARRIED_SPOUSE_NAME)</Button></InputGroupAddon>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>GIVE_NAME</Button></InputGroupAddon>
                    <Input name="GIVE_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} />
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>MID_NAME</Button></InputGroupAddon>
                    <Input name="MID_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} />
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>LAST_NAME</Button></InputGroupAddon>
                    <Input name="LAST_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} />
                  </InputGroup>
                </Col>
              </FormGroup>
              :
              <FormGroup>
                <Col>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>配偶的姓名(MARRIED_SPOUSE_NAME)</Button></InputGroupAddon>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>GIVE_NAME</Button></InputGroupAddon>
                    <Input name="GIVE_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} value={this.state.student.MARRIED_SPOUSE_NAME.GIVE_NAME} />
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>MID_NAME</Button></InputGroupAddon>
                    <Input name="MID_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} value={this.state.student.MARRIED_SPOUSE_NAME.MID_NAME} />
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>LAST_NAME</Button></InputGroupAddon>
                    <Input name="LAST_NAME_OF_MARRIED_SPOUSE" onChange={this.handleChangeMarriageSpouseName} value={this.state.student.MARRIED_SPOUSE_NAME.LAST_NAME} />
                  </InputGroup>
                </Col>
              </FormGroup>

            }

            {// CHILDREND_DETAIL 9/18
            }
            {this.state.student.MARRIED_SPOUSE_NAME === undefined?
              <FormGroup name="CHILDREND_DETAIL" id="top-bar">
                <Alert color="primary" className="text-center" >
                  <h3><Badge color="primary">CHILDREND_DETAIL</Badge> </h3>
                  <hr className="my-2" />
                  <InputGroup>
                    <Col xs="4" sm="4" md="4" ><Button color="primary" size="sm" block disabled>名子<br />(NAME)) </Button></Col>
                    <Col xs="4" sm="4" md="4"><Button color="primary" size="sm" block disabled>性別<br />(GENDER)</Button></Col>
                    <Col xs="4" sm="4" md="4"><Button color="primary" size="sm" block disabled>年齡<br />(AGE)</Button></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_NAME_1" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_1" onChange={this.handleChangeChildrendDetail} /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_AGE_1" onChange={this.handleChangeChildrendDetail} /></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_NAME_2" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_2" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_AGE_2" onChange={this.handleChangeChildrendDetail} /></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_NAME_3" onChange={this.handleChangeChildrendDetail} /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_3" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_3" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_NAME_4" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_4" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_4" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_NAME_5" onChange={this.handleChangeChildrendDetail} /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_5" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col sm="12" md="4"><Input name="CHILD_GENDER_5" onChange={this.handleChangeChildrendDetail}  /></Col>
                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  </InputGroup>
                </Alert>
              </FormGroup>
           :  <FormGroup name="CHILDREND_DETAIL" id="top-bar">
           <Alert color="primary" className="text-center" >
             <h3><Badge color="primary">CHILDREND_DETAIL</Badge> </h3>
             <hr className="my-2" />
             <InputGroup>
               <Col xs="4" sm="4" md="4" ><Button color="primary" size="sm" block disabled>名子<br />(NAME)) </Button></Col>
               <Col xs="4" sm="4" md="4"><Button color="primary" size="sm" block disabled>性別<br />(GENDER)</Button></Col>
               <Col xs="4" sm="4" md="4"><Button color="primary" size="sm" block disabled>年齡<br />(AGE)</Button></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <Col sm="12" md="4"><Input name="CHILD_NAME_1" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_NAME_1} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_1" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_GENDER_1} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_AGE_1" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_AGE_1} /></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <Col sm="12" md="4"><Input name="CHILD_NAME_2" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_NAME_2} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_2" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_GENDER_2} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_AGE_2" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_AGE_2} /></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <Col sm="12" md="4"><Input name="CHILD_NAME_3" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_NAME_3} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_3" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_GENDER_3} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_3" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILDREND_DETAIL.CHILD_AGE_3} /></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <Col sm="12" md="4"><Input name="CHILD_NAME_4" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_NAME_4} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_4" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_GENDER_4} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_4" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_AGE_4} /></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <Col sm="12" md="4"><Input name="CHILD_NAME_5" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_NAME_5} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_5" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_GENDER_5} /></Col>
               <Col sm="12" md="4"><Input name="CHILD_GENDER_5" onChange={this.handleChangeChildrendDetail} value={this.state.student.CHILD_AGE_5} /></Col>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
             </InputGroup>
           </Alert>
         </FormGroup>}
            
            {// familyBackground9/19
            }{this.state.student.FAMILY_BACKGROUND === undefined?
              <FormGroup name="FAMILY_BACKGROUND">
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">FAMILY_BACKGROUND</Badge> </h3>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>家中的排行(FAMILY_CHILD_NUMBER)</Button></InputGroupAddon>
                    <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>總數(TOTAL)</Button></InputGroupAddon>
                    <Input type="number" name="TOTAL_FAMILY_CHILD_NUMBER" onChange={this.handleChangeFamilyBackground} />
                    <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>你是第幾個(NUMBER)</Button></InputGroupAddon>
                    <Input type="number" name="CHILD_RANK" onChange={this.handleChangeFamilyBackground} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>父親的姓名(NAME_OF_FATHER)</Button></InputGroupAddon>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button color="info" block disabled>GIVE_NAME</Button></InputGroupAddon>
                    <Input name="GIVE_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground} />
                    <InputGroupAddon addonType="prepend"><Button color="info" block disabled>MID_NAME</Button></InputGroupAddon>
                    <Input name="MID_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground}  />
                    <InputGroupAddon addonType="prepend"><Button color="info" block disabled>LAST_NAME</Button></InputGroupAddon>
                    <Input name="LAST_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground}  />
                    <InputGroupAddon addonType="prepend"><Button color="info" block disabled>AGE</Button></InputGroupAddon>
                    <Input type="number" onChange={this.handleChangeFamilyBackground}  />
                  </InputGroup>

                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>母親的姓名(NAME_OF_MOTHER)</Button></InputGroupAddon>
                  <InputGroup>

                    <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>GIVE_NAME</Button></InputGroupAddon>
                    <Input name="GIVE_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground}  />
                    <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>MID_NAME</Button></InputGroupAddon>
                    <Input name="MID_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground} />
                    <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>LAST_NAME</Button></InputGroupAddon>
                    <Input name="LAST_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground}  />
                    <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>AGE</Button></InputGroupAddon>
                    <Input type="number" name="AGE_OF_MOTHER" onChange={this.handleChangeFamilyBackground} />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>兄弟數(NUMBER_OF_BROTHERS)</Button></InputGroupAddon>
                    <Input type="number" name="NUMBER_OF_BROTHERS" onChange={this.handleChangeFamilyBackground}  />
                    <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>姊妹數(NUMBER_OF_SISTERS)</Button></InputGroupAddon>
                    <Input type="number" name="NUMBER_OF_SISTERS" onChange={this.handleChangeFamilyBackground}  />
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                </Alert>
              </FormGroup>
              :
              <FormGroup name="FAMILY_BACKGROUND">
              <Alert color="primary" className="text-center">
                <h3><Badge color="primary">FAMILY_BACKGROUND</Badge> </h3>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>家中的排行(FAMILY_CHILD_NUMBER)</Button></InputGroupAddon>
                  <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>總數(TOTAL)</Button></InputGroupAddon>
                  <Input type="number" name="TOTAL_FAMILY_CHILD_NUMBER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.TOTAL_FAMILY_CHILD_NUMBER} />
                  <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>你是第幾個(NUMBER)</Button></InputGroupAddon>
                  <Input type="number" name="CHILD_RANK" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.CHILD_RANK} />
                </InputGroup>
                <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>父親的姓名(NAME_OF_FATHER)</Button></InputGroupAddon>

                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="info" block disabled>GIVE_NAME</Button></InputGroupAddon>
                  <Input name="GIVE_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.GIVE_NAME_OF_FATHER} />
                  <InputGroupAddon addonType="prepend"><Button color="info" block disabled>MID_NAME</Button></InputGroupAddon>
                  <Input name="MID_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.MID_NAME_OF_FATHER} />
                  <InputGroupAddon addonType="prepend"><Button color="info" block disabled>LAST_NAME</Button></InputGroupAddon>
                  <Input name="LAST_NAME_OF_FATHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.LAST_NAME_OF_FATHER} />
                  <InputGroupAddon addonType="prepend"><Button color="info" block disabled>AGE</Button></InputGroupAddon>
                  <Input type="number" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.AGE_OF_FATHER} />
                </InputGroup>

                <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                <InputGroupAddon addonType="prepend"><Button color="primary" block disabled>母親的姓名(NAME_OF_MOTHER)</Button></InputGroupAddon>
                <InputGroup>

                  <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>GIVE_NAME</Button></InputGroupAddon>
                  <Input name="GIVE_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.GIVE_NAME_OF_MOTHER} />
                  <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>MID_NAME</Button></InputGroupAddon>
                  <Input name="MID_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.MID_NAME_OF_MOTHER} />
                  <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>LAST_NAME</Button></InputGroupAddon>
                  <Input name="LAST_NAME_OF_MOTHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.LAST_NAME_OF_MOTHER} />
                  <InputGroupAddon addonType="prepend"><Button color="danger" block disabled>AGE</Button></InputGroupAddon>
                  <Input type="number" name="AGE_OF_MOTHER" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.AGE_OF_MOTHER} />
                </InputGroup>
                <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>兄弟數(NUMBER_OF_BROTHERS)</Button></InputGroupAddon>
                  <Input type="number" name="NUMBER_OF_BROTHERS" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.NUMBER_OF_BROTHERS} />
                  <InputGroupAddon addonType="prepend"><Button color="warning" block disabled>姊妹數(NUMBER_OF_SISTERS)</Button></InputGroupAddon>
                  <Input type="number" name="NUMBER_OF_SISTERS" onChange={this.handleChangeFamilyBackground} value={this.state.student.FAMILY_BACKGROUND.NUMBER_OF_SISTERS} />
                </InputGroup>
                <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
              </Alert>
            </FormGroup>
          }

            {// educationBackground
            }{this.state.student.EDUCATION_BACKGROUND === undefined?
              <FormGroup name="EDUCATION_BACKGROUND" >
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">EDUCATION_BACKGROUND</Badge> </h3>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Col xs="2" sm="2" md="2" ><Button color="primary" size="sm" block disabled>教育程度<br />(ATTAINMENT) </Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>學校名稱<br />(NAME_OF_SCHOOL)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>學校地點<br />(LOCATION/CITY)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>主修<br />(MAJOR)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>起迄<br />(FROM)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>起迄<br />(TO)</Button></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_1" onChange={this.handleChangeEducationBackground}  >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_1" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_1" onChange={this.handleChangeEducationBackground} /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_1" onChange={this.handleChangeEducationBackground} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_1" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_1" onChange={this.handleChangeEducationBackground} /></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_2" onChange={this.handleChangeEducationBackground}  >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_2" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_2" onChange={this.handleChangeEducationBackground} /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_2" onChange={this.handleChangeEducationBackground} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_2" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_2" onChange={this.handleChangeEducationBackground}  /></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_3" onChange={this.handleChangeEducationBackground} >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_3" onChange={this.handleChangeEducationBackground} /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_3" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_3" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_3" onChange={this.handleChangeEducationBackground}  /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_3" onChange={this.handleChangeEducationBackground}  /></Col>


                  </InputGroup>

                </Alert>
              </FormGroup>
             :
             <FormGroup name="EDUCATION_BACKGROUND" >
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">EDUCATION_BACKGROUND</Badge> </h3>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Col xs="2" sm="2" md="2" ><Button color="primary" size="sm" block disabled>教育程度<br />(ATTAINMENT) </Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>學校名稱<br />(NAME_OF_SCHOOL)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>學校地點<br />(LOCATION/CITY)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>主修<br />(MAJOR)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>起迄<br />(FROM)</Button></Col>
                    <Col xs="2" sm="2" md="2"><Button color="primary" size="sm" block disabled>起迄<br />(TO)</Button></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.ATTAINMENT_1} >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.NAME_OF_SCHOOL_1} /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.LOCATION_1} /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.MAJOR_1} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.FROM_1} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_1" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.TO_1} /></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.ATTAINMENT_2} >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.NAME_OF_SCHOOL_2} /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.LOCATION_2} /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.MAJOR_2} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.FROM_2} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_2" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.TO_2} /></Col>

                    <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                    <Col sm="12" md="2">
                      <Input type="select" name="ATTAINMENT_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.ATTAINMENT_3} >
                        <option value=""></option>
                        <option value="1">primary/elemantary</option>
                        <option value="2">secandary/high school</option>
                        <option value="3">terfiary/college_university</option>
                      </Input> </Col>
                    <Col sm="12" md="2"><Input name="NAME_OF_SCHOOL_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.NAME_OF_SCHOOL_3} /></Col>
                    <Col sm="12" md="2"><Input name="LOCATION_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.LOCATION_3} /></Col>
                    <Col sm="12" md="2"><Input name="MAJOR_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.MAJOR_3} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="FROM_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.FROM_3} /></Col>
                    <Col sm="12" md="2"><Input type="date" name="TO_3" onChange={this.handleChangeEducationBackground} value={this.state.student.EDUCATION_BACKGROUND.TO_3} /></Col>


                  </InputGroup>

                </Alert>
              </FormGroup>
            }
            {// experience_working_abroad9/19
            }{this.state.student.EXPERIENCE_WORKING_ABROAD === undefined?
              <FormGroup name="EXPERIENCE_WORKING_ABROAD" Row>
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">EXPERIENCE_WORKING_ABROAD</Badge> </h3>
                  <InputGroup >
                    <Col><Button color="primary" disabled>雇主姓名<br />(NAME_OF_EMPLOYER)</Button></Col>
                    <Col><Button color="primary" disabled>工作地點<br />(COUNTRY/CITY)</Button></Col>
                    <Col><Button color="primary" disabled>工作內容<br />(DESCRIPTION)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(FROM)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(TO)</Button></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Col><Input name="NAME_OF_EMPLOYER_1" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="COUNTRY_CITY_1" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="DESCRIPTION_1" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="FROM_1" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                    <Col><Input name="TO_1" onChange={this.handleChangeExperienceWorkingAbroad}/></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Col><Input name="NAME_OF_EMPLOYER_2" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                    <Col><Input name="COUNTRY_CITY_2" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                    <Col><Input name="DESCRIPTION_2" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                    <Col><Input name="FROM_2" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                    <Col><Input name="TO_2" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup>
                    <Col><Input name="NAME_OF_EMPLOYER_3" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="COUNTRY_CITY_3" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="DESCRIPTION_3" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="FROM_3" onChange={this.handleChangeExperienceWorkingAbroad} /></Col>
                    <Col><Input name="TO_3" onChange={this.handleChangeExperienceWorkingAbroad}  /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                </Alert>
              </FormGroup>
             :
             <FormGroup name="EXPERIENCE_WORKING_ABROAD" Row>
             <Alert color="primary" className="text-center">
               <h3><Badge color="primary">EXPERIENCE_WORKING_ABROAD</Badge> </h3>
               <InputGroup >
                 <Col><Button color="primary" disabled>雇主姓名<br />(NAME_OF_EMPLOYER)</Button></Col>
                 <Col><Button color="primary" disabled>工作地點<br />(COUNTRY/CITY)</Button></Col>
                 <Col><Button color="primary" disabled>工作內容<br />(DESCRIPTION)</Button></Col>
                 <Col><Button color="primary" disabled>起迄<br />(FROM)</Button></Col>
                 <Col><Button color="primary" disabled>起迄<br />(TO)</Button></Col>
               </InputGroup>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <InputGroup>
                 <Col><Input name="NAME_OF_EMPLOYER_1" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.NAME_OF_EMPLOYER_1} /></Col>
                 <Col><Input name="COUNTRY_CITY_1" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.COUNTRY_CITY_1} /></Col>
                 <Col><Input name="DESCRIPTION_1" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.DESCRIPTION_1} /></Col>
                 <Col><Input name="FROM_1" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.FROM_1} /></Col>
                 <Col><Input name="TO_1" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.TO_1} /></Col>
               </InputGroup>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <InputGroup>
                 <Col><Input name="NAME_OF_EMPLOYER_2" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.NAME_OF_EMPLOYER_2} /></Col>
                 <Col><Input name="COUNTRY_CITY_2" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.COUNTRY_CITY_2} /></Col>
                 <Col><Input name="DESCRIPTION_2" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.DESCRIPTION_2} /></Col>
                 <Col><Input name="FROM_2" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.FROM_2} /></Col>
                 <Col><Input name="TO_2" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.TO_2} /></Col>
               </InputGroup>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
               <InputGroup>
                 <Col><Input name="NAME_OF_EMPLOYER_3" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.NAME_OF_EMPLOYER_3} /></Col>
                 <Col><Input name="COUNTRY_CITY_3" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.COUNTRY_CITY_3} /></Col>
                 <Col><Input name="DESCRIPTION_3" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.DESCRIPTION_3} /></Col>
                 <Col><Input name="FROM_3" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.FROM_3} /></Col>
                 <Col><Input name="TO_3" onChange={this.handleChangeExperienceWorkingAbroad} value={this.state.student.EXPERENCE_WORKING_ABROAD.TO_3} /></Col>
               </InputGroup>
               <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
             </Alert>
           </FormGroup>
            }
            {// local_employment
            }{this.state.student.LOCAL_EMPLOYMENT === undefined?
              <FormGroup name="LOCAL_EMPLOYMENT" Row>
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">LOCAL_EMPLOYMENT</Badge> </h3>
                  <InputGroup size="sm">
                    <Col><Button color="primary" disabled>雇主姓名<br />(NAME_OF_EMPLOYER)</Button></Col>
                    <Col><Button color="primary" disabled>工作地點<br />(COUNTRY/CITY)</Button></Col>
                    <Col><Button color="primary" disabled>工作內容<br />(DESCRIPTION)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(FROM)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(TO)</Button></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_1" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="COUNTRY_CITY_1" onChange={this.handleChangeLocalEmployment} /></Col>
                    <Col><Input name="DESCRIPTION_1" onChange={this.handleChangeLocalEmployment}/></Col>
                    <Col><Input name="FROM_1" onChange={this.handleChangeLocalEmployment} /></Col>
                    <Col><Input name="TO_1" onChange={this.handleChangeLocalEmployment} /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>

                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_2" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="COUNTRY_CITY_2" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="DESCRIPTION_2" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="FROM_2" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="TO_2" onChange={this.handleChangeLocalEmployment}  /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_3" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="COUNTRY_CITY_3" onChange={this.handleChangeLocalEmployment} /></Col>
                    <Col><Input name="DESCRIPTION_3" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="FROM_3" onChange={this.handleChangeLocalEmployment}  /></Col>
                    <Col><Input name="TO_3" onChange={this.handleChangeLocalEmployment}  /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>

                </Alert>
              </FormGroup>
              :
              <FormGroup name="LOCAL_EMPLOYMENT" Row>
                <Alert color="primary" className="text-center">
                  <h3><Badge color="primary">LOCAL_EMPLOYMENT</Badge> </h3>
                  <InputGroup size="sm">
                    <Col><Button color="primary" disabled>雇主姓名<br />(NAME_OF_EMPLOYER)</Button></Col>
                    <Col><Button color="primary" disabled>工作地點<br />(COUNTRY/CITY)</Button></Col>
                    <Col><Button color="primary" disabled>工作內容<br />(DESCRIPTION)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(FROM)</Button></Col>
                    <Col><Button color="primary" disabled>起迄<br />(TO)</Button></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_1" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.NAME_OF_EMPLOYER_1} /></Col>
                    <Col><Input name="COUNTRY_CITY_1" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.COUNTRY_CITY_1} /></Col>
                    <Col><Input name="DESCRIPTION_1" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.DESCRIPTION_1} /></Col>
                    <Col><Input name="FROM_1" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.FROM_1} /></Col>
                    <Col><Input name="TO_1" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.TO_1} /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>

                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_2" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.NAME_OF_EMPLOYER_2} /></Col>
                    <Col><Input name="COUNTRY_CITY_2" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.COUNTRY_CITY_2} /></Col>
                    <Col><Input name="DESCRIPTION_2" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.DESCRIPTION_2} /></Col>
                    <Col><Input name="FROM_2" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.FROM_2} /></Col>
                    <Col><Input name="TO_2" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.TO_2} /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>
                  <InputGroup size="xs">
                    <Col><Input name="NAME_OF_EMPLOYER_3" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.NAME_OF_EMPLOYER_3} /></Col>
                    <Col><Input name="COUNTRY_CITY_3" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.COUNTRY_CITY_3} /></Col>
                    <Col><Input name="DESCRIPTION_3" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.DESCRIPTION_3} /></Col>
                    <Col><Input name="FROM_3" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.FROM_3} /></Col>
                    <Col><Input name="TO_3" onChange={this.handleChangeLocalEmployment} value={this.state.student.LOCAL_EMPLOYMENT.TO_3} /></Col>
                  </InputGroup>
                  <Col xs="12" sm="12" md="12"><hr className="my-2" /></Col>

                </Alert>
              </FormGroup>
            }

            <FormGroup>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>PASSPORT</Button></InputGroupAddon>
                  <Input name="PASSPORT" onChange={this.handleChange} value={this.state.student.PASSPORT} />
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>REMARK</Button></InputGroupAddon>
                  <Input name="REMARK_PASSPORT" onChange={this.handleChange} value={this.state.student.REMARK_PASSPORT} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>UNIFIED_ID</Button></InputGroupAddon>
                  <Input name="UNIFIED_ID" onChange={this.handleChange} value={this.state.student.UNIFIED_ID} />
                  <InputGroupAddon addonType="prepend" ><Button color="success" block disabled>REMARK</Button></InputGroupAddon>
                  <Input name="REMARK_UNIFIED_ID" onChange={this.handleChange} value={this.state.student.REMARK_UNIFIED_ID} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>評語(COMMENTS)</Button></InputGroupAddon>
                  <Input type="textarea" name="COMMENTS" onChange={this.handleChange} value={this.state.student.COMMENTS} />
                </InputGroup>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Button color="success" block disabled>來源(APPLICANT_SOURCE)</Button></InputGroupAddon>
                  <Input type="select" name="APPLICANT_SOURCE" onChange={this.handleChange} value={this.state.student.APPLICANT_SOURCE} >
                    <option value="AD">AD</option>
                    <option value="AGENT">AGENT</option>
                    <option value="APPLICANT">APPLICANT</option>
                    <option value="WALK_IN">WALK_IN</option>
                  </Input>
                  <Input type="text" name="APPLICANT_SOURCE_NAME" onChange={this.handleChange} value={this.state.student.APPLICANT_SOURCE_NAME} />
                </InputGroup>
              </Col>
            </FormGroup>
          </Form><Button size="md" color="danger" onClick={this.addstudent} >CREATE </Button>
        </Container>
        <Alert color="primary" className="text-center"></Alert>
      </div>
    )
  }
}
