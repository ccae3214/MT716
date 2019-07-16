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
export default class Adopter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adopter: {},
      response0: {},
      de_response: {},
      up_response: {},
      de_err: {},
      up_err: {},
      de_isLoading: false,
      up_isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
this.updateAdopter=this.updateAdopter.bind(this)
this.deleteAdopter=this.deleteAdopter.bind(this)

    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );

    this.setState({ adopter: this.props.adopter })



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
  updateAdopter() {
    const adopter = this.state.adopter
    this.setState({ up_isLoading: true });
    api.updateAdopter(adopter).then(res => { this.setState({ up_response: res }),alert(this.state.up_response),this.setState({ up_isLoading: false }) }).catch(err => { this.setState({ up_err: err }) });
  
  }
  deleteAdopter() {
    const adopter = this.state.adopter
    this.setState({ de_isLoading: true });
    api.deleteAdopter(adopter).then(res => { this.setState({ de_response: res }),alert(this.state.de_response),this.setState({ de_isLoading: false })  }).catch(err => { this.setState({ de_err: err }) });
    

    

  }


  render() {

    return (

      <ListGroupItem>
        {this.props.showchange ? (<Form inline>
          <Row>
            <Col md={4}  >
              <FieldGroup name="aid" type="text" label="身分證" placeholder="身分證"  value={this.state.adopter.aid} />
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
            <br />
            <Button disabled={this.state.de_isLoading} onClick={!this.state.de_isLoading ? this.deleteAdopter : null} bsStyle="primary" > {this.state.de_isLoading ? '刪除中.....' : '刪除'}</Button>
            {" "}
            <Button disabled={this.state.up_isLoading} onClick={!this.state.up_isLoading ? this.updateAdopter : null} bsStyle="primary" > {this.state.up_isLoading ? '修改中.....' : '修改'}</Button>
          </Row>
        </Form>) : (<Form inline>
          <Row>
            <Col md={4}  >
              <FieldGroup name="aid" type="text" label="身分證" placeholder="身分證" value={this.state.adopter.aid} />
              <FieldGroup name="date" type="text" label="日期" placeholder="日期" value={this.state.adopter.date} />
              <FieldGroup name="img" id='img' type="file" label="圖片" placeholder="圖片" inputRef={(input) => this.fileInput = input} onChange={this.handleChangeInput} />
              <img src={'/assets/' + this.state.adopter.img} alt="無此圖片" height={200} width={200} />
            </Col>
            <Col md={4}  >

              <FieldGroup name="name" type="text" label="名子" placeholder="名子" value={this.state.adopter.name} />
              <FieldGroup name="phone" type="text" label="市話/手機" placeholder="市話/手機" value={this.state.adopter.phone} />

              <FormGroup >
                <ControlLabel>性別</ControlLabel>
                <FormControl componentClass="select" placeholder="all" name="sex" value={this.state.adopter.sex}>
                  <option value="all">全部</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </FormControl>
              </FormGroup>

            </Col>

            <FieldGroup name="address" type="text" label="地址" placeholder="地址" value={this.state.adopter.address} />
            <FieldGroup name="email" type="text" label="信箱" placeholder="信箱" value={this.state.adopter.email} />
            <FieldGroup name="introduction" componentClass="textarea" type="textarea" label="備註" placeholder="備註" value={this.state.adopter.introduction} />

          </Row>
        </Form>)}


      </ListGroupItem>


    )
  }
}

