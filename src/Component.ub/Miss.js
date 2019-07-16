import React, { Component } from 'react'
import { PageHeader, Button, Grid, Col, Row, Modal, Clearfix, FormGroup, ListGroupItem, ListGroup, ControlLabel, FormControl, Label, HelpBlock, Form } from 'react-bootstrap'
import Animal from './Animal'
import api from '../api'
export default class Miss extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: {
        skin: 'all',
        year: 'all',
        status: 'miss',
      },
      select: [],
      animals: [],
      err: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.reload = this.reload.bind(this)
  }

  componentDidMount() {
    api.searchAnimal(this.state.search).then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err0: err }) });
  }

  handleChange(event) {
    const search = this.state.search;
    search[event.target.name] = event.target.value;
    this.setState({ search: search });
    api.searchAnimal(this.state.search).then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err0: err }) });
  }



  handleSelect(animal) {
    this.setState({ select: animal });
  }
  handleSelectChange(event) {
    const select = this.state.select;
    select[event.target.name] = event.target.value;
    this.setState({ select: select });
  }

  reload() {
    api.searchAnimal(this.state.search).then(Response => { this.setState({ animals: Response }) }).catch(err => { this.setState({ err0: err }) });
  }
  render() {

    return (
      <div>
        <Row>
        <Col sm={6} md={3} mdOffset={4}>
          <PageHeader>
          </PageHeader>
          <PageHeader>
            <label>走失的貓咪</label>
          </PageHeader>
          </Col>
        </Row>

        <Row>
        <Col sm={6} md={3} mdOffset={4}>
          <Form inline>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>毛色</ControlLabel>
              <FormControl componentClass="select" placeholder="all" name="skin" onChange={this.handleChange} value={this.state.search.skin}>
                <option value="all">全部</option>
                <option value="black">黑</option>
                <option value="white">白</option>
                <option value="yellow">黃</option>
                <option value="brown">棕</option>
                <option value="tabby">虎斑</option>
                <option value="other">其他</option>
              </FormControl>

              <ControlLabel bsStyle="info">年紀</ControlLabel>
              <FormControl componentClass="select" placeholder="all" name="year" onChange={this.handleChange} value={this.state.search.year}>
                <option value="all">全部</option>
                <option value="young">幼年</option>
                <option value="adult">成年</option>
              </FormControl>



            </FormGroup>
            <Button onClick={this.reload} bsStyle="primary" >重整</Button>
          </Form>
          </Col>
        </Row>
 <Row>
 <Col sm={6} md={8} mdOffset={2}>
        搜尋結果
    {this.state.animals.map(animal => {
          return (
            <Animal
              key={animal.id}
              animal={animal}
              onSelect={this.handleSelect}
              onChange={this.handleSelectChange}
              select={this.state.select}
              showchange={false}

            />
          );
        })}
        </Col>
        </Row>
      </div>
    )
  }
}