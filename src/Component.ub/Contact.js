import React, { Component } from 'react'
import {  PageHeader, Button, Image, Grid, Col, Row, Modal,Nav,NavItem,Tab,ListGroupItem,ListGroup } from 'react-bootstrap'
export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

 
  render() {


    return (
      <div>
      <PageHeader>
        </PageHeader>
        <Grid>
          <Row>
            <Col md={8} sm={4} mdOffset={3} smOffset={2} >
            地址:嘉義市彌陀路勞工育樂中心旁(環保局資源回收場內)<br/>【開放時間：星期一~星期日 09:00-11:30、14:00-16:30】<br/>
服務電話：05-2168661  <br/> 嘉義市政府建設處：05-2290357如有任何建議或問題歡迎來信│<br/>
<PageHeader><img src="/assets/contact.jpg" /></PageHeader>
            </Col>
          </Row>
        </Grid>
      </div>
      )
    }
  }