///
import React, { Component } from 'react'
import { Alert, Button, Col, Table, TabPane, TabContent, Row, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap'
import api from './api'
import '../Page.css'
import { Link } from 'react-router-dom'
/*searchStudent page mutisearch didn't  done  only show all data */
export default class SchedulePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notifys: [],
      jobtypeSelected: ["ALL", "CTF", "CGF", "SWF", "FF", "CTM", "CGM", "SWM", "FM"],
      date: '',
      students: "",
      student_err: "",
      notifys_err: "",
      searchresult: [],
      selectstudent: '',
      activeTab: '1',
      ssmts:
        [
          { t: '0500~0530', mon: 'WU', tue: 'WU', wed: 'WU', thu: 'WU', fri: 'WU', sat: 'WU', sun: 'C', },
          { t: '0530~0600', mon: 'EX', tue: 'EX', wed: 'EX', thu: 'EX', fri: 'EX', sat: 'EX', sun: 'C', },
          { t: '0600~0700', mon: 'PREP', tue: 'PREP', wed: 'PREP', thu: 'PREP', fri: 'PREP', sat: 'PREP', sun: 'C', },
          { t: '0700~0800', mon: 'BF', tue: 'BF', wed: 'BF', thu: 'BF', fri: 'BF', sat: 'BF', sun: 'C', },
          { t: '0800~0900', mon: 'HW', tue: 'HW', wed: 'HW', thu: 'HW', fri: 'HW', sat: 'HW', sun: 'C', },
          { t: '0900~0930', mon: 'SS', tue: 'SS', wed: 'SS', thu: 'SS', fri: 'SS', sat: 'SS', sun: 'C', },
          { t: '0930~1000', mon: 'MDR', tue: 'MDR', wed: 'MDR', thu: 'MDR', fri: 'MDR', sat: 'MDR', sun: 'C', },
          { t: '1000~1100', mon: 'MDR', tue: 'MDR', wed: 'MDR', thu: 'MDR', fri: 'MDR', sat: 'MDR', sun: 'C', },
          { t: '1100~1200', mon: 'PREP', tue: 'PREP', wed: 'PREP', thu: 'PREP', fri: 'PREP', sat: 'PREP', sun: 'C', },
          { t: '1200~1330', mon: 'L', tue: 'L', wed: 'L', thu: 'L', fri: 'L', sat: 'L', sun: 'C', },
          { t: '1330~1400', mon: 'SS', tue: 'SS', wed: 'SS', thu: 'SS', fri: 'SS', sat: 'E', sun: 'C', },
          { t: '1400~1600', mon: 'MSG', tue: 'CG', wed: 'CG', thu: 'CG', fri: 'CG', sat: 'E', sun: 'C', },
          { t: '1600~1630', mon: 'BT', tue: 'BT', wed: 'BT', thu: 'BT', fri: 'BT', sat: 'E', sun: 'C', },
          { t: '1630~1800', mon: 'A', tue: 'NC', wed: 'A', thu: 'NC', fri: 'A', sat: 'E', sun: 'C', },
          { t: '1800~1900', mon: 'PREP', tue: 'PREP', wed: 'PREP', thu: 'PREP', fri: 'PREP', sat: 'PREP', sun: 'C', },
          { t: '1900~2100', mon: 'D', tue: 'D', wed: 'D', thu: 'D', fri: 'D', sat: 'D', sun: 'C', },
          { t: '2100~2200', mon: 'S', tue: 'S', wed: 'S', thu: 'S', fri: 'S', sat: 'S', sun: 'S', },
        ],
      clean: [],
      cooking: []
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  goto(route) {
    this.props.history.replace(`/${route}`, this.state.selectstudent)

  }

  handleSelect() {

  }
  handleSearch(event) {

  }
  checkin(event) {
    const { name } = event.target
    const value = this

  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onHandelChange(event) {
    const date = event.target.value
    const student = this.state.searchresult

    this.setState({})
  }
  componentWillMount() {
    api.get_processings().then(response => { this.setState({ searchresult: response }) }).catch(err => { this.setState({ err_students: err }) });
  }

  render() {

    return (
      <div className="text-center">
        <Alert color="primary" className="text-center">
          <h5>排程SchedulePage</h5>
        </Alert>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline color="primary" id="toggler" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('1'); }}>
              <img src="/collection/png/clock-1.png" display="inline-block" height="21" width="21" /> Matchtrend  Schedule
             </Button>
            <Button outline color="primary" id="toggler2" style={{ marginBottom: '1rem' }} onClick={() => { this.toggle('2'); }}>
              <img src="/collection/png/calendar-6.png" display="inline-block" height="21" width="21" /> Processing Schedule
             </Button>
          </Col>
        </Row>
        <Row>
          WU=wackup EX=exercise HW=housework C=church L=lunch D=dinner
          PREP=prepare meal BF=breakfast BT=breaktime MD=mandarin MSG=message
          APT=acceptance NC=national_cuture SS=self-study CG=Caregiver
        </Row>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Table hover size="xs" bordered responsive>
              <thead>

                <tr>
                  <th>T</th>
                  <th>一 M</th>
                  <th>二 T</th>
                  <th>三 W</th>
                  <th>四 R</th>
                  <th>五 F</th>
                  <th>六 S</th>
                  <th>日 S</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ssmts.map((smts) => {
                  return (
                    <tr >
                      <th scope="row" size="1">{smts.t}</th>
                      <th>{smts.mon}</th>
                      <th>{smts.tue}</th>
                      <th>{smts.wed}</th>
                      <th>{smts.thu}</th>
                      <th>{smts.fri}</th>
                      <th>{smts.sat}</th>
                      <th>{smts.sun}</th>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <h5>matchdate</h5>
            contruct
          tma
          pra

          流程分割:
          OEC(POEA)
          1.PEOS
          2.PDOS OWWA的出國講習,
          3.ACCREDITATION(台灣合准函送給POEA核准 ＰＲＡ代工)
          4.OWWA的出國講習
          5.OEC
          at least 10people to aone batch
          VISA(TECO)
          1.NBI
          2.PSA(NSO)
          3.LOCAL(MARRIEGED)
          4.BIRTHCERTIFICATE
          5.PSA確認(1~4為了cav所以要先做)
          6.LOCAL
          7.FORM137(高中畢業證明)
          8.UMID
          9.VOTER
          10.MED/C
          11.PPT
          12.CAV(訓練證明)
          13.ATTESTATION
          14.VISA
          </TabPane>
        </TabContent>




      </div>
    )
  }
}