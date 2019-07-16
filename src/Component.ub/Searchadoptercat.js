import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Form, HelpBlock } from 'react-bootstrap'
import api from '../api'
import Animal from './Animal'
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
export default class Searchadoptercat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animals: [],
      adopters: [],
      select:{aid:""},
      err: {}
    };

    
    this.handleSelect = this.handleSelect.bind(this)
    this.reload=this.reload.bind(this)
    
  }

  componentDidMount() {
    api.searchAnimals().then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err: err })  });
    api.searchAdopters().then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err: err })  });
  }



 

  handleSelect(event) {
    const select = this.state.select;
    select[event.target.name] = event.target.value;
    this.setState({ select: select });
   
  }

  reload(){
    api.searchAnimals().then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err: err })  });
    api.searchAdopters().then(Response => { this.setState({ adopters: Response }) }).catch(err => { this.setState({ err: err })  });
  }

 
  render() {

    return (
      <div>
        <label>依類別搜尋</label>
        <Form inline>
        <FormGroup >
            <ControlLabel >認養人ID(身分證)</ControlLabel>
            <FormControl componentClass="select" name="aid"  onChange={this.handleSelect} >
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
    {this.state.animals.map(animal => {
      if (animal.aid == this.state.select.aid)
          return (
            <Animal
              key={animal.id}
              animal={animal}
              showchange={true}
            />
          );
        })}

      </div>
    )
  }
}

