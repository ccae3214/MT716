import React, { Component } from 'react'
import { Button,Row,Col, FormGroup, ControlLabel, FormControl, Form, HelpBlock } from 'react-bootstrap'
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
export default class Createcats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animal: {
        date: new Date().toLocaleDateString(),
        img: "cat01.jpg",
        skin: "black",
        name: "富強",
        sex: "male",
        year: "adult",
        size: 'big',
        introduction: '',
        status:"unadopted",
        healthid: '1234',
        healthrecord: '',
      },
      response: {},
      err: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    
    this.addAnimal = this.addAnimal.bind(this);
   
  }
  addAnimal() {
    api.addAnimal(this.state.animal).then(res => { this.setState({ response: res }),alert(this.state.response) }).catch(err => { this.setState({ err0: err }) });
 
  }

  handleChange(event) {
    const animal = this.state.animal;
    animal[event.target.name] = event.target.value;
    this.setState({ animal: animal });

  }
  handleChangeInput(event) {
    const animal = this.state.animal;
    animal[event.target.name] =this.fileInput.files[0].name;
    this.setState({ animal: animal });

  }
  render() {
    
    return (
      <div>
        
        <label>新增貓貓</label>
        貓咪編號+刊登日期+照片+個性簡介+名字+性別+花色+年紀+被認養紀錄+醫療紀錄+晶片編號+送還紀錄+遺失紀錄
          <Form inline>
          <Row>
        <Col md={4}  >
          
          <FieldGroup name="date" type="text" label="日期" placeholder="日期" onChange={this.handleChange} value={this.state.animal.date} />
          <FieldGroup name="img" id='img' type="file" label="圖片" placeholder="圖片" inputRef={(input) => this.fileInput  = input} onChange={this.handleChangeInput} />
          <img src={'/assets/'+this.state.animal.img} alt="無此圖片" height={200} width={200} />
          </Col>
          <Col md={4}  >
          
          <FormGroup >
            <ControlLabel >毛色</ControlLabel>
            <FormControl componentClass="select" name="skin" onChange={this.handleChange} value={this.state.animal.skin}>
              <option value="all">全部</option>
              <option value="black">黑</option>
              <option value="white">白</option>
              <option value="yellow">黃</option>
              <option value="brown">棕</option>
              <option value="tabby">虎斑</option>
              <option value="other">其他</option>
            </FormControl>
          </FormGroup>
          <FormGroup >
            <ControlLabel>年紀</ControlLabel>
            <FormControl componentClass="select" placeholder="all" name="year" onChange={this.handleChange} value={this.state.animal.year}>
              <option value="all">全部</option>
              <option value="young">幼年</option>
              <option value="adult">成年</option>
            </FormControl>
          </FormGroup>
          <FormGroup >
            <ControlLabel>體型</ControlLabel>
            <FormControl componentClass="select" placeholder="all" name="size" onChange={this.handleChange} value={this.state.animal.size} >
              <option value="all">全部</option>
              <option value="mini">迷你</option>
              <option value="small">小</option>
              <option value="midden">ˊ中</option>
              <option value="big">大</option>
            </FormControl>
          </FormGroup>
          <FormGroup >
            <ControlLabel>性別</ControlLabel>
            <FormControl componentClass="select" placeholder="all" name="sex" onChange={this.handleChange} value={this.state.animal.sex}>
              <option value="all">全部</option>
              <option value="male">公</option>
              <option value="female">母</option>
            </FormControl>
          </FormGroup>
          
         
          <FormGroup >
            <ControlLabel>狀態</ControlLabel>
            <FormControl componentClass="select" placeholder="all" name="status" onChange={this.handleChange} value={this.state.animal.status}>
            <option value="all">全部</option>
              <option value="miss">走失</option>
              <option value="adopted">已被領養</option>
              <option value="unadopted">未被領養</option>
            </FormControl>
          </FormGroup>
        
          </Col>

          <FieldGroup name="name" type="text" label="名子" placeholder="名子" onChange={this.handleChange} value={this.state.animal.name} />
          <FieldGroup name="introduction" type="text" label="介紹" placeholder="介紹" onChange={this.handleChange} value={this.state.animal.introduction} />
          <FieldGroup name="healthid"  type="text" label="晶片ID" placeholder="晶片ID" onChange={this.handleChange} value={this.state.animal.healthid} />
          <FieldGroup name="healthrecord"componentClass="textarea" type="textarea" label="醫療" placeholder="醫療紀錄" onChange={this.handleChange} value={this.state.animal.healthrecord} />
         

         
          </Row>







          <Button bsStyle="primary" onClick={this.addAnimal}>送出</Button>

        </Form>
      </div>
    )
  }
}
