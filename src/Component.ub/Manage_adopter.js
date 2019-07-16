import React, { Component } from 'react'
import {  PageHeader,Nav,NavItem,Tab,Grid, Col, Row} from 'react-bootstrap'
import Searchadopter from './Searchadopter'
import Createadopter from './Createadopter'
import Searchadoptercat from './Searchadoptercat'
export default class Manage_adopter extends Component {
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
      <NavItem eventKey="1">搜尋認養人貓咪</NavItem>
        <NavItem eventKey="2">搜尋認養人</NavItem>
        <NavItem eventKey="3">新增認養人</NavItem>
       
      </Nav>
      </div>
    </Col>
    <Col md={10}>
    <div className={tabStyles}>
      <Tab.Content animation>
      <Tab.Pane eventKey="1"><Searchadoptercat/></Tab.Pane>
        <Tab.Pane eventKey="2"> <Searchadopter/></Tab.Pane>
        <Tab.Pane eventKey="3"> <Createadopter/></Tab.Pane>
       
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