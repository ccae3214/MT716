import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Form, HelpBlock } from 'react-bootstrap'
import api from '../api'
import Adopter from './Adopter'
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
export default class Searchadopter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: {
        img: "adopter01.jpg",
        aid: "L123456789",
        phone:"0958856120",
        name: "富強",
        sex: "male",
        address: "嘉義市西區興業西路150號7樓之3",
        email: 'az19960611@gmail.com',
        introduction: '我很帥',
      },
      select: {aid:""},
      adopters: [],
      err: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    
    this.handleSelect = this.handleSelect.bind(this)
    this.handleOnSelect = this.handleOnSelect.bind(this)
    this.reload=this.reload.bind(this)
  }

  componentDidMount() {
    api.searchAdopters().then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err: err })  });
  }

  handleChange(event) {
    const search = this.state.search;
    search[event.target.name] = event.target.value;
    this.setState({ search: search });
    api.searchAdopter(this.state.search).then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err0: err }) });
  }

  handleOnChange(event) {
    const search = this.state.search;
    search[event.target.name] = event.target.value;
    this.setState({ search: search });
    api.searchAdopter(this.state.search).then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err0: err }) });
  }

  handleSelect(event) {
    const select = this.state.select;
    select[event.target.name] = event.target.value;
    this.setState({ select: select });
   
  }

  handleOnSelect(event) {
    const selectadopter = this.state.selectadopter;
    selectadopter[event.target.name] = event.target.value;
    this.setState({ selectadopter: selectadopter });
  }
  reload(){
    api.searchAdopter(this.state.search).then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err0: err }) });
    window.location.reload()
  }
 
  render() {

    return (
      <div>
        <label>依類別搜尋</label>
        <Form inline>
        <FormGroup >
            <ControlLabel >認養人ID(身分證)</ControlLabel>
            <FormControl componentClass="select" name="aid"  onChange={this.handleSelect}>
            <option value="">選擇認養人</option>
              {this.state.adopters.map(adopter => {
                return (
                  <option value={adopter.aid}>{adopter.aid}</option>
                );
              })}
            </FormControl>
          </FormGroup>
          <Button  onClick={this.reload} bsStyle="primary" >重整</Button>
      
        </Form>
  

        搜尋結果
    {this.state.adopters.map(adopter => {
      if (adopter.aid == this.state.select.aid)
          return (
            <Adopter
              key={adopter.aid}
              adopter={adopter}
              onSelect={this.handleSelect}
              onChange={this.handleOnSelect}
              showchange={true}
            />
          );
        })}

      </div>
    )
  }
}

