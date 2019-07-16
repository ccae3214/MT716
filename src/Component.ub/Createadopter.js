import React, { Component } from 'react'
import { Button, Row, Col, FormGroup, ControlLabel, FormControl, Form, HelpBlock } from 'react-bootstrap'
import api from '../api'
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
export default class Createadopter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adopter: {
        date: new Date().toLocaleDateString(),
        img: "adopter01.jpg",
        aid: "L123456789",
        phone: "0958856120",
        name: "富強",
        sex: "male",
        address: "嘉義市西區興業西路150號7樓之3",
        email: 'az19960611@gmail.com',
        introduction: '我很帥',
        birthday: '1996/09/25'
      },
      response:'',
      err:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);

    this.addAdpoter = this.addAdpoter.bind(this);
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  addAdpoter() {
    if (this.state.adopter.aid.length != 10) {
      alert("身分證錯誤:字數不對")
    }
    else if (this.state.adopter.sex == "male" && JSON.stringify(this.state.adopter.aid).charAt(2) != 1) {
      alert("身分證錯誤:男生1開頭"+JSON.stringify(this.state.adopter.aid).charAt(1))
    }
    else if (this.state.adopter.sex == "female" && this.state.adopter.aid.charAt[1] != '2') {
      alert("身分證錯誤:女生2開頭")
    }

    else {
      api.addAdopter(this.state.adopter).then(res => { this.setState({ response: res }),alert(this.state.response)}).catch(err => { this.setState({ err: err }) });
   
    }
   
  }
  

  handleChange(event) {
    const adopter = this.state.adopter;
    adopter[event.target.name] = event.target.value;
    this.setState({ adopter: adopter });

  }
  handleChangeInput(event) {
    const adopter = this.state.adopter;
    adopter[event.target.name] = this.fileInput.files[0].name;
    this.setState({ adopter: adopter });

  }

  handleTime(event) {
    const adopter = this.state.adopter;
    const date = new Date()
    adopter[date] = date
    this.setState({ adopter: adopter });
  }

  render() {

    return (
      <div>

        <label>新增管理者</label>
        身分證+認養日期+照片+電話+名字+性別+地址+信箱+備註
          <Form inline>
          <Row>
            <Col md={4}  >
              <FieldGroup name="aid" type="text" label="身分證" placeholder="身分證" onChange={this.handleChange} value={this.state.adopter.aid} />
              <FieldGroup name="date" type="text" label="日期" placeholder="日期" onChange={this.handleChange} value={this.state.adopter.date} />
              <FieldGroup name="img" id='img' type="file" label="圖片" placeholder="圖片" inputRef={(input) => this.fileInput = input} onChange={this.handleChangeInput} />
              <img src={'/assets/' + this.state.adopter.img} alt="無此圖片" height={200} width={200} />
            </Col>
            <Col md={4}  >

              <FieldGroup name="name" type="text" label="名子" placeholder="名子" onChange={this.handleChange} value={this.state.adopter.name} />
              <FieldGroup name="phone" type="text" label="市話/手機" placeholder="市話/手機" onChange={this.handleChange} value={this.state.adopter.phone} />

              <FormGroup >
                <ControlLabel>性別</ControlLabel>
                <FormControl componentClass="select" placeholder="all" name="sex" onChange={this.handleChange} value={this.state.adopter.sex}>

                  <option value="male">男</option>
                  <option value="female">女</option>

                </FormControl>
              </FormGroup>

            </Col>



            <FieldGroup name="address" type="text" label="地址" placeholder="地址" onChange={this.handleChange} value={this.state.adopter.address} />
            <FieldGroup name="email" type="text" label="信箱" placeholder="信箱" onChange={this.handleChange} value={this.state.adopter.email} />
            <FieldGroup name="introduction" componentClass="textarea" type="textarea" label="備註" placeholder="備註" onChange={this.handleChange} value={this.state.adopter.introduction} />


          </Row>







          <Button bsStyle="primary" onClick={this.addAdpoter}>送出</Button>

        </Form>
      </div>
    )
  }
}
