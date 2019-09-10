///智力測驗
import React, { Component } from 'react'
import { Button, Table, Input } from 'reactstrap'
export default class IntTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intnumber: listToMatrix(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]), 7),
      selectnumber: 0,
      time: 0,
      start: 0,
      on: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer(event) {
    if (this.state.on) {
      clearInterval(this.timer);
      console.log("stop")
      this.setState({ on: false })

    } else {
      //計時器
      if (this.state.time !== 30) {
        console.log("start")
        this.timer = setInterval(() => {
          if (this.state.time < 30)
            this.setState({ time: ++this.state.time })
          else {
            this.setState({ on: false })
          }
        }, 1000)
      }
      else {
        clearInterval(this.timer);
        this.setState({ on: !this.state.on })
      }
    }
  }

  stopTimer() {
    clearInterval(this.timer)
    console.log("stop")
  }
  resetTimer() {
    this.setState({ time: 0 })
    console.log("reset")
  }

  handlebtn(event) {
    const btn2 = {
      width: '100%',
      height: '100%',
      border: 'none',
      'border': '2px solid #721C24',
      'text-align': 'center',
    }
    if (this.state.selectnumber == event.target.id && this.state.on) {
      event.target.style = { btn2 }
      const selectnumber = this.state.selectnumber + 1
      this.setState({ selectnumber })
    }
  }
  handlestartbtn() {

  }
  render() {
    const btn = {
      width: '100%',
      height: '100%',
      border: 'none',
      'border': '2px solid #6DBBFE',
      'text-align': 'center',
    }
    const btn2 = {
      width: '100%',
      height: '100%',
      border: 'none',
      'border': '2px solid #6DBBFE',
      'text-align': 'center',
    }

    return (
      <div>
        <h3>time: {this.state.time}s</h3>
        <Table bordered>
          <thead>

          </thead>
          <tbody>
            {this.state.intnumber.map((number) => {
              return (
                <tr>
                  {number.map(num => {
                    return (
                      <td>
                        <Button style={btn} color='pirmary' onClick={this.handlebtn.bind(this)} id={num - 1}>{num}</Button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>

        <Button color='danger' onClick={this.startTimer} >{this.state.on ? 'stop' : 'start'}</Button>
        {' '}
        <Button color='primary' onClick={() => { window.print() }} >{'列印print'}</Button>

        <p>成績(個/30秒):<input value={this.state.selectnumber} /></p>
        <p>測驗人:<input /></p>
        <p>監考人:<input /></p>

      </div>
    )
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}