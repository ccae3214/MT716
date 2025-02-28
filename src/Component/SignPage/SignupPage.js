import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "", // 注意這裡的命名與後端一致
    user_identity: ""

  });

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 發送 POST 請求到後端 API
      const response = await axios.post('http://localhost:3001/api/create_user', user);
      console.log('後端回應:', response.user);
      // 清空表單
      setUser({
        email: "",
        password: "",
        user_identity: ""
      });
      alert('user signed up successfully');
      try { } catch (error) { }
      navigate('/IndexPage'); //回到首頁
    } catch (error) {
      console.error('建立使用者時發生錯誤:', error);
      alert('建立使用者失敗');
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
                    value={user.email}
                    onChange={handleChange}
                    placeholder="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
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
                    value={user.user_identity}
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

