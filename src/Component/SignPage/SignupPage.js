import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupPage = () => {
  // 從 localStorage 載入初始資料，若無則使用預設值
  const [biodata, setBiodata] = useState(() => {
    return JSON.parse(localStorage.getItem('biodata')) || {
      name: "",//名稱
      email: "",//電子郵件
      pass_word: "",//密碼
      contact_number: "",//電話
      address: "",//地址
      identity: ""//身分
    };
  });
  const [user] = useState({
    name: "",
    email: "",
    pass_word: "",
    contact_number: "",
    address: "",
    identity: ""
  })
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('biodata', JSON.stringify(biodata));
  }, [biodata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiodata(prev => {
      const newBiodata = { ...prev, [name]: value };
      localStorage.setItem('biodata', JSON.stringify(newBiodata));
      return newBiodata;
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setBiodata(prev => {
      const education = [...prev.education];
      education[index] = { ...education[index], [name]: value };
      const newBiodata = { ...prev, education };
      localStorage.setItem('biodata', JSON.stringify(newBiodata));
      return newBiodata;
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setBiodata(prev => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [name]: value };
      const newBiodata = { ...prev, experience };
      localStorage.setItem('biodata', JSON.stringify(newBiodata));
      return newBiodata;
    });
  };

  const addEducation = () => {
    setBiodata(prev => {
      const newBiodata = {
        ...prev,
        education: [...prev.education, { degree: "", school: "", year: "" }]
      };
      localStorage.setItem('biodata', JSON.stringify(newBiodata));
      return newBiodata;
    });
  };

  const addExperience = () => {
    setBiodata(prev => {
      const newBiodata = {
        ...prev,
        experience: [...prev.experience, { title: "", company: "", period: "", description: "" }]
      };
      localStorage.setItem('biodata', JSON.stringify(newBiodata));
      return newBiodata;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedBiodata = {
      ...biodata,
      skills: biodata.skills.split(',').map(skill => skill.trim())
    };
    console.log('提交的履歷資料:', submittedBiodata);
    // 可在此清除 localStorage，例如：localStorage.removeItem('biodata');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <CardTitle tag="h2">create account </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={biodata.name}
                    onChange={handleChange}
                    placeholder="name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={biodata.email}
                    onChange={handleChange}
                    placeholder="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="contact_number"
                    id="contact_number"
                    value={biodata.contact_number}
                    onChange={handleChange}
                    placeholder="contact_number"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={biodata.address}
                    onChange={handleChange}
                    placeholder="address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="">identity</Label>
                  <Input
                    type="select"
                    name="identity"
                    id="identity"
                    value={biodata.identity}
                    onChange={handleChange}
                    placeholder="identity"
                  >
                    <option>
                      TMA(Taiwan manpower agency)
                    </option>
                    <option>
                      PRA (Philippine recruitment agency)
                    </option>
                    <option>
                      employer
                    </option>
                    <option>
                      applicant
                    </option>
                  </Input>
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
};

export default SignupPage;