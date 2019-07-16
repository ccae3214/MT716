import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Form, HelpBlock } from 'react-bootstrap'
import api from '../api'
import Animal from './Animal'
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
export default class Adoptcat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animals: [],
      adopters: [],
      select: {
        selectanimal: '',
        selectadopter: '',
        date: new Date().toLocaleDateString()
      },
      err0: {},
      err1: {},
      page: '1'
    };



    this.handleSelect = this.handleSelect.bind(this)

    this.handleAdopt = this.handleAdopt.bind(this)
    this.reload=this.reload.bind(this)
  
  }

  componentDidMount() {
    api.searchAnimals().then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err0: err }) });
    api.searchAdopters().then(Response => { this.setState({ adopters: Response })}).catch(err => { this.setState({ err1: err }) });

  }



  handleSelect(event) {
    const select = this.state.select;
    select[event.target.name] = event.target.value;
    this.setState({ select: select });
  }


  handleAdopt(){
    api.adoptAnimal(this.state.select).then(res => { this.setState({ response0: res }),alert(this.state.response0) }).catch(err => { this.setState({ err0: err }) });
   
  }
  reload(){
    api.searchAnimals().then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err0: err }) });
    window.location.reload()
  }

  render() {

    return (
      <div>
        <label>依類別搜尋</label>
        <Form inline>

          <FormGroup >
            <ControlLabel >貓咪ID</ControlLabel>
            <FormControl componentClass="select" name="selectanimal" onChange={this.handleSelect} >
              <option value=""> 選擇貓咪</option>
              {this.state.animals.map(animal => {
                return (
                  <option value={animal.id}>{animal.id}</option>
                );
              })}
            </FormControl>
          </FormGroup>



          <FormGroup >
            <ControlLabel >認養人ID(身分證)</ControlLabel>
            <FormControl componentClass="select" name="selectadopter" onChange={this.handleSelect} >
              <option value=""> 選擇認養人</option>
              {this.state.adopters.map(adopter => {
                return (
                  <option value={adopter.aid}>{adopter.aid}</option>
                );
              })}
            </FormControl>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleAdopt}>認養確認</Button>
          <Button  onClick={this.reload} bsStyle="primary" >重整</Button>
        </Form>

        搜尋結果
        貓咪
       {this.state.animals.map(animal => {
          if (animal.id == this.state.select.selectanimal)
            return (
              <Animal
                key={animal.id}
                animal={animal}
                showchange={false}
              />
            );
        })}
        認養人
        {this.state.adopters.map(adopter => {
          if (adopter.aid == this.state.select.selectadopter)
            return (
              <Adopter
                key={adopter.id}
                adopter={adopter}
                showchange={false}
              />
            );
        })}





      </div>
    )
  }
}

