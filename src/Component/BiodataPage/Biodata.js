import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Biodata extends Component {
  constructor(props) {
    super(props);
    // 從 localStorage 載入初始資料，若無則使用預設值
    const savedBiodata = JSON.parse(localStorage.getItem('biodata')) || {
      name: "",
      email: "",
      phone: "",
      address: "",
      education: [{ degree: "", school: "", year: "" }],
      experience: [{ title: "", company: "", period: "", description: "" }],
      skills: ""
    };
    this.state = { biodata: savedBiodata };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        biodata: { ...prevState.biodata, [name]: value }
      }),
      () => this.saveToLocalStorage()
    );
  };

  handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => {
        const education = [...prevState.biodata.education];
        education[index] = { ...education[index], [name]: value };
        return { biodata: { ...prevState.biodata, education } };
      },
      () => this.saveToLocalStorage()
    );
  };

  handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => {
        const experience = [...prevState.biodata.experience];
        experience[index] = { ...experience[index], [name]: value };
        return { biodata: { ...prevState.biodata, experience } };
      },
      () => this.saveToLocalStorage()
    );
  };

  addEducation = () => {
    this.setState(
      (prevState) => ({
        biodata: {
          ...prevState.biodata,
          education: [...prevState.biodata.education, { degree: "", school: "", year: "" }]
        }
      }),
      () => this.saveToLocalStorage()
    );
  };

  addExperience = () => {
    this.setState(
      (prevState) => ({
        biodata: {
          ...prevState.biodata,
          experience: [...prevState.biodata.experience, { title: "", company: "", period: "", description: "" }]
        }
      }),
      () => this.saveToLocalStorage()
    );
  };

  saveToLocalStorage = () => {
    localStorage.setItem('biodata', JSON.stringify(this.state.biodata));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const biodata = {
      ...this.state.biodata,
      skills: this.state.biodata.skills.split(',').map(skill => skill.trim())
    };
    console.log('提交的履歷資料:', biodata);
    // 可在此清除 localStorage，例如：localStorage.removeItem('biodata');
  };

  render() {
    const { biodata } = this.state;

    return (
      <Container className="mt-4">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <CardTitle tag="h2">RESUME</CardTitle>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="name">姓名</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={biodata.name}
                      onChange={this.handleChange}
                      placeholder="輸入你的姓名"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">電子郵件</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={biodata.email}
                      onChange={this.handleChange}
                      placeholder="輸入你的電子郵件"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">電話</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      value={biodata.phone}
                      onChange={this.handleChange}
                      placeholder="輸入你的電話號碼"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">地址</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      value={biodata.address}
                      onChange={this.handleChange}
                      placeholder="輸入你的地址"
                    />
                  </FormGroup>

                  <CardTitle tag="h4" className="mt-4">教育背景</CardTitle>
                  {biodata.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup>
                        <Label for={`degree-${index}`}>學位</Label>
                        <Input
                          type="text"
                          name="degree"
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => this.handleEducationChange(index, e)}
                          placeholder="例如：資訊工程學士"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for={`school-${index}`}>學校</Label>
                        <Input
                          type="text"
                          name="school"
                          id={`school-${index}`}
                          value={edu.school}
                          onChange={(e) => this.handleEducationChange(index, e)}
                          placeholder="例如：國立台灣大學"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for={`year-${index}`}>年份</Label>
                        <Input
                          type="text"
                          name="year"
                          id={`year-${index}`}
                          value={edu.year}
                          onChange={(e) => this.handleEducationChange(index, e)}
                          placeholder="例如：2015 - 2019"
                        />
                      </FormGroup>
                    </div>
                  ))}
                  <Button color="primary" onClick={this.addEducation} className="mb-3">
                    新增教育背景
                  </Button>

                  <CardTitle tag="h4" className="mt-4">工作經驗</CardTitle>
                  {biodata.experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup>
                        <Label for={`title-${index}`}>職稱</Label>
                        <Input
                          type="text"
                          name="title"
                          id={`title-${index}`}
                          value={exp.title}
                          onChange={(e) => this.handleExperienceChange(index, e)}
                          placeholder="例如：前端工程師"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for={`company-${index}`}>公司</Label>
                        <Input
                          type="text"
                          name="company"
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => this.handleExperienceChange(index, e)}
                          placeholder="例如：科技公司 A"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for={`period-${index}`}>工作期間</Label>
                        <Input
                          type="text"
                          name="period"
                          id={`period-${index}`}
                          value={exp.period}
                          onChange={(e) => this.handleExperienceChange(index, e)}
                          placeholder="例如：2020 - 現在"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for={`description-${index}`}>工作描述</Label>
                        <Input
                          type="textarea"
                          name="description"
                          id={`description-${index}`}
                          value={exp.description}
                          onChange={(e) => this.handleExperienceChange(index, e)}
                          placeholder="描述你的工作內容"
                        />
                      </FormGroup>
                    </div>
                  ))}
                  <Button color="primary" onClick={this.addExperience} className="mb-3">
                    新增工作經驗
                  </Button>

                  <CardTitle tag="h4" className="mt-4">技能</CardTitle>
                  <FormGroup>
                    <Label for="skills">技能（以逗號分隔）</Label>
                    <Input
                      type="text"
                      name="skills"
                      id="skills"
                      value={biodata.skills}
                      onChange={this.handleChange}
                      placeholder="例如：React, JavaScript, HTML/CSS"
                    />
                  </FormGroup>

                  <Button color="success" type="submit" className="mt-3">
                    提交履歷
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Biodata;