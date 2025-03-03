import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export default function SignUpPage() {
  const [localUser, setlocalUser] = useState({
    email: "1@1",
    password: "1", // 注意這裡的命名與後端一致
    user_identity: "TMA",

  });
  const navigate = useNavigate();
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('localUser', JSON.stringify(localUser));
  }, [localUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlocalUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 發送 POST 請求到後端 API
      const response = await axios.post('http://localhost:3001/api/create_user', localUser);
      // 清空表單
      navigate('/signin');
    } catch (error) {
      console.error('建立使用者時發生錯誤:', error);
    }
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
                    type="email"
                    name="email"
                    id="email"
                    value={localUser.email}
                    onChange={handleChange}
                    placeholder="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={localUser.password}
                    onChange={handleChange}
                    placeholder="password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>user_identity</Label>
                  <Input
                    type="select"
                    name="user_identity"
                    id="user_identity"
                    value={localUser.user_identity}
                    onChange={handleChange}
                    placeholder="user_identity"
                  >
                    <option>
                      choose user_identity
                    </option>
                    <option>
                      TMA
                    </option>
                    <option>
                      PRA
                    </option>
                    <option>
                      EMPOLYER
                    </option>
                    <option>
                      APPLICANT
                    </option>
                  </Input>
                </FormGroup>
                <Button color="success" type="submit" className="mt-3" outline>
                  submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

