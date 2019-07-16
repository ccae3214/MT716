import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { isBoolean } from 'util';
/* this page is customsize indexＰage for show information to viewer ex:customer/manager/web designer */
export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date().toLocaleDateString(),
      notifys: [],
      show: false,
      notify: {},
      newstudents: [{ id: '1', name: 'arch' }, { id: '2', name: 'arch' }, { id: '3', name: 'arch' }],
      topstudents: [{ id: '4', name: 'arch' }, { id: '5', name: 'arch' }, { id: '6', name: 'arch' }],
      Arrearsstudents: [{ id: '7', name: 'arch' }, { id: '8', name: 'arch' }, { id: '9', name: 'arch' }],
      selectid: {},
      isselected: isBoolean
    }
    this.handelselectid = this.handelselectid.bind(this);


  }
  goTo(route, student) {
    this.props.history.replace(`/${route}`, { student: this.state.selectid })
  }

  handelselectid(event) {
    const selectid = this.state.selectid
    selectid[event.target.id] = event.target.value
    this.setState({ selectid: selectid })
    this.setState({ isselected: false })
  }


  render() {
    const index = {
      margin: 'auto',
      width: '50%',
      'overflow-x': 'hidden',
      'overflow-y': 'hidden',
      position: 'absolute',     /*絕對位置*/
      top: '25%',               /*從上面開始算，下推 50% (一半) 的位置*/
      left: '22%',
      'text-align': 'center'
    }

    return (
      <div style={index}>

        <Jumbotron>

          <h1 className="display-3"> (MTS) </h1>
          <p className="lead">A MANAGEMENT WEBSITE FOR  MATCHTREND</p>
          <hr className="my-2" />
        </Jumbotron>

      </div>
    )
  }
}