import React, { Component } from 'react';
import { ListGroupItem, Col, Row, Button, ControlLabel, FormGroup, FormControl, HelpBlock, Form } from 'react-bootstrap'
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
export default class Animal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adopters: [],
      animal: {},
      de_response: '',
      up_response: '',
      de_err: '',
      up_err: '',
      de_isLoading: false,
      up_isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.updateAnimal = this.updateAnimal.bind(this);
    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.tick = this.tick.bind(this);

  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({ animal: this.props.animal })
    api.searchAdopters().then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err1: err }) });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);

  }

  tick() {
    this.setState({
      date: new Date()
    });
  }


  handleChange(event) {
    const animal = this.state.animal;
    animal[event.target.name] = event.target.value;
    this.setState({ animal: animal });
  }

  handleChangeInput(event) {
    const animal = this.state.animal;
    animal[event.target.name] = this.fileInput.files[0].name;
    this.setState({ animal: animal });
  }

  handleTime(event) {
    const animal = this.state.animal;
    const date = new Date()
    animal[date] = date
    this.setState({ animal: animal });
  }
  updateAnimal() {
    const animal = this.state.animal
    this.setState({ up_isLoading: true })
    api.updateAnimal(animal).then(res => { this.setState({ up_response: res }),alert(this.state.up_response),this.setState({ up_isLoading: false }) }).catch(err => { this.setState({ up_err: err }) });
    

   

  }

  deleteAnimal() {
    const animal = this.state.animal
    api.deleteAnimal(animal).then(res => { this.setState({ de_response: res }),alert(this.state.de_response),this.setState({ de_isLoading: true }) }).catch(err => { this.setState({ de_err: err })});
    
    setTimeout(() => {
      this.setState({ de_isLoading: false });
    }, 2000);

}

  render() {
    return (
      <ListGroupItem>
        {this.props.showchange ? (
          <Form inline>
            <Row>
              <Col md={4}  > 
              <FieldGroup name="id" type="text" label="id" placeholder="id" onChange={this.handleChange} value={this.state.animal.id} />
                <FieldGroup name="date" type="text" label="日期" placeholder="日期" onChange={this.handleChange} value={this.state.animal.date} />
                <FieldGroup name="adopteddate" type="text" label="認養日期" placeholder="認養日期" onChange={this.handleChange} value={this.state.animal.adopteddate} />
                <FieldGroup name="img" id='img' type="file" label="圖片" placeholder="圖片" inputRef={(input) => this.fileInput = input} onChange={this.handleChangeInput} />
                <img src={'/assets/' + this.state.animal.img} alt="無此圖片" height={200} width={200} />
              </Col>
              <Col md={2.5}  >
                <FormGroup >
                  <ControlLabel >毛色</ControlLabel>
                  <FormControl componentClass="select" name="skin" onChange={this.handleChange} value={this.state.animal.skin}>
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
                  <FormControl componentClass="select" type="select" placeholder="all" name="year" onChange={this.handleChange} value={this.state.animal.year}>
                    <option value="young">幼年</option>
                    <option value="adult">成年</option>
                  </FormControl>
                </FormGroup>
                <FormGroup >
                  <ControlLabel>體型</ControlLabel>
                  <FormControl componentClass="select" name="size" onChange={this.handleChange} value={this.state.animal.size} >
                    <option value="mini">迷你</option>
                    <option value="small">小</option>
                    <option value="midden">中</option>
                    <option value="big">大</option>
                  </FormControl>
                </FormGroup>
                <FormGroup >
                  <ControlLabel>性別</ControlLabel>
                  <FormControl componentClass="select" placeholder="all" name="sex" onChange={this.handleChange} value={this.state.animal.sex}>
                    <option value="male">公</option>
                    <option value="female">母</option>
                  </FormControl>
                </FormGroup>
                <FormGroup >
                  <ControlLabel>狀態</ControlLabel>
                  <FormControl componentClass="select" placeholder="all" name="status" onChange={this.handleChange} value={this.state.animal.status}>
                    <option value="miss">走失</option>
                    <option value="adopted">已被領養</option>
                    <option value="unadopted">未被領養</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={3}>
              
                <FieldGroup name="name" type="text" label="名子" placeholder="名子" onChange={this.handleChange} value={this.state.animal.name} />
                <FieldGroup name="healthid" type="text" label="晶片" placeholder="晶片ID" onChange={this.handleChange} value={this.state.animal.healthid} />
                <FieldGroup name="healthrecord" componentClass="textarea" type="textarea" label="醫療" placeholder="醫療紀錄" onChange={this.handleChange} value={this.state.animal.healthrecord} />
               
                <FormGroup >
            <ControlLabel >認養人ID(身分證)</ControlLabel>
            <FormControl componentClass="select" name="aid" onChange={this.handleChange} value={this.state.animal.aid}>
              <option value="">選擇認養人</option>
              {this.state.adopters.map(adopter => {
                return (
                  <option value={adopter.aid}>{adopter.aid}</option>
                );
              })}
            </FormControl>
          </FormGroup>

              </Col>
              <Col md={3}>

              

                <FieldGroup name="introduction" type="text" label="備註" placeholder="備註" onChange={this.handleChange} value={this.state.animal.introduction}/>
                <Button disabled={this.state.de_isLoading} onClick={!this.state.de_isLoading ? this.deleteAnimal : null} bsStyle="primary" > {this.state.de_isLoading ? '刪除中.....' : '刪除'}</Button>
                {" "}
                <Button disabled={this.state.up_isLoading} onClick={!this.state.up_isLoading ? this.updateAnimal : null} bsStyle="primary" > {this.state.up_isLoading ? '修改中.....' : '修改'}</Button>
              </Col>
            </Row>
          </Form>
        ) : (<Form inline>
          <Row>
            <Col md={4}  >
            <FieldGroup name="id" type="text" label="id" placeholder="id" onChange={this.handleChange} value={this.state.animal.id} />
              <FieldGroup name="date" type="text" label="日期" placeholder="日期" value={this.state.animal.date} />
              <FieldGroup name="adopteddate" type="text" label="認養日期" placeholder="認養日期" value={this.state.animal.adopteddate} />
              <FieldGroup name="img" id='img' type="file" label='圖片' placeholder='圖片' />
              <img src={'/assets/' + this.state.animal.img} alt="無此圖片" height={200} width={200} />
            </Col>
            <Col md={2.5}  >
              <FormGroup >
                <ControlLabel >毛色</ControlLabel>
                <FormControl componentClass="select" name="skin" value={this.state.animal.skin}>
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
                <FormControl componentClass="select" type="select" placeholder="all" name="year" value={this.state.animal.year}>
                  <option value="young">幼年</option>
                  <option value="adult">成年</option>
                </FormControl>
              </FormGroup>
              <FormGroup >
                <ControlLabel>體型</ControlLabel>
                <FormControl componentClass="select" name="size" value={this.state.animal.size} >
                  <option value="mini">迷你</option>
                  <option value="small">小</option>
                  <option value="midden">中</option>
                  <option value="big">大</option>
                </FormControl>
              </FormGroup>
              <FormGroup >
                <ControlLabel>性別</ControlLabel>
                <FormControl componentClass="select" placeholder="all" name="sex" value={this.state.animal.sex}>
                  <option value="male">公</option>
                  <option value="female">母</option>
                </FormControl>
              </FormGroup>
              <FormGroup >
                <ControlLabel>狀態</ControlLabel>
                <FormControl componentClass="select" placeholder="all" name="status" value={this.state.animal.status}>
                  <option value="miss">走失</option>
                  <option value="adopted">已被領養</option>
                  <option value="unadopted">未被領養</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FieldGroup name="name" type="text" label="名子" placeholder="名子" value={this.state.animal.name} />
              <FieldGroup name="introduction" type="text" label="介紹" placeholder="簡短介紹" value={this.state.animal.introduction} />
              <FieldGroup name="healthid" type="text" label="晶片" placeholder="晶片ID" value={this.state.animal.healthid} />
              <FieldGroup name="healthrecord" componentClass="textarea" type="textarea" label="醫療" placeholder="醫療紀錄" value={this.state.animal.healthrecord} />
              <br />
              {this.state.adopters.map(adopter => {
                if(adopter.aid==this.state.animal.aid)
                return (
                  <FieldGroup name="name"  type="select" label="認養人ID" placeholder="認養人ID" help="有名稱即為被預約或認養" value={adopter.aid} />
                  
                  );
              })}

            </Col>
            <Col md={3}>

            </Col>
          </Row>
        </Form>)}


      </ListGroupItem>


    )
  }
}

