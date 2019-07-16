import React, { Component } from 'react'
import { Button,Jumbotron } from 'reactstrap'


export default class Undev extends Component {
  constructor(props) {
    super(props)

    this.state = {
  
    }
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }



  render() { 
    
    return (
      <div className="text-center">
      <div>
      <Jumbotron>
        <h1 className="display-3">暫不開放</h1>
        <p className="lead">該網頁功能尚不齊全</p>
        <hr className="my-2" />
        <p>請使用其他功能謝謝</p>
        <p className="lead">
          <Button color="primary" onClick={this.goTo.bind(this, 'IndexPage')}>回到首頁</Button>
        </p>
      </Jumbotron>
    </div>
      </div>
    )
  }
}