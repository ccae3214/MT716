import React, { Component } from 'react'
import Iframe from 'react-iframe'

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
      <div >

      
          <h1 className="display-3"> WELCOME </h1>
          <hr className="my-2" />
          <hr className="my-2" />
          <p className="lead">MATCHTREND TRAINNING & ASSESSMENT CENTER</p>
          <hr className="my-2" />
          <hr className="my-2" />
     
        <h1>HERE WE ARE.</h1>
        <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.3390826391515!2d121.00146461483348!3d14.636683439779487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b74509509373%3A0x8f90c0140664e47e!2sMatch+Trend+training+and+assessment+center!5e0!3m2!1sfil!2sph!4v1566435916439!5m2!1sfil!2sph" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></Iframe>
      </div>
    )
  }
}