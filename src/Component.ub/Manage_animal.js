import React, { Component } from 'react'
import {  PageHeader,Nav,NavItem,Tab,Grid, Col, Row} from 'react-bootstrap'
import Searchcats from './Searchcats'
import Createcats from './Createcats'
import Adoptcat from './Adoptcat'
export default class Manage_animal extends Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  }

  render() {
  
const tabStyles={}
const navStyles={}
    return (
      <div>
        <PageHeader>
        </PageHeader>
        <Grid>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
  <Row className="clearfix">
    <Col md={2}>
    <div className={navStyles}>
      <Nav bsStyle="pills" stacked>
      <NavItem eventKey="1">認養貓咪</NavItem>
        <NavItem eventKey="2">搜尋貓咪</NavItem>
        <NavItem eventKey="3">新增貓咪</NavItem>
       
      </Nav>
      </div>
    </Col>
    <Col md={10}>
    <div className={tabStyles}>
      <Tab.Content animation>
      <Tab.Pane eventKey="1"><Adoptcat/></Tab.Pane>
        <Tab.Pane eventKey="2"> <Searchcats/></Tab.Pane>
        <Tab.Pane eventKey="3"> <Createcats/></Tab.Pane>
        
      </Tab.Content>
      </div>
    </Col>
   
  </Row>
</Tab.Container>;
        

        </Grid>
     



        
      </div>
    )
  }
}