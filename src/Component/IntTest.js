import React, { Component } from 'react';
import { Button, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class IntTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intnumber: listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7), // 1-49 的陣列
      selectnumber: 0,
      clickedButtons: new Set(),
      time: 0,
      start: 0,
      on: 'stop',
      modal:false, 
      setModal:false
    };
    this.startTimer = this.startTimer.bind(this);
    this.handlebtn = this.handlebtn.bind(this);
  }
  toggle = () => setModal(!modal);
  startTimer() {
    if (this.state.on === 'restart') {
      console.log("restart");
        // 重新洗牌並重置狀態
        const newNumbers = listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7);
        this.setState({
          intnumber: newNumbers,
          selectnumber: 0,
          clickedButtons: new Set(),
          time: 0, // 可選：若希望計時從 0 開始
          on: 'start',
        });
    } else if (this.state.on === 'stop') {
      if (this.state.time !== 30) {
        console.log("start");
        // 重新洗牌並重置狀態
        const newNumbers = listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7);
        this.setState({
          intnumber: newNumbers,
          selectnumber: 0,
          clickedButtons: new Set(),
          time: 0, // 可選：若希望計時從 0 開始
          on: 'start',
        });
        this.timer = setInterval(() => {
          if (this.state.time < 30) {
            this.setState({ time: this.state.time + 1 });
          } else if (this.state.time >= 30) {
            clearInterval(this.timer);
            this.setState({ on: 'restart' });
          }
        }, 1000);
      }
    } else if (this.state.on === 'start') {
      clearInterval(this.timer);
      this.setState({ on: 'stop' });
    }
  }

  handlebtn(event) {
    const clickedNum = parseInt(event.target.id, 10);
    if (this.state.on === 'start' && clickedNum === this.state.selectnumber) {
      this.setState(prevState => ({
        selectnumber: prevState.selectnumber + 1,
        clickedButtons: new Set(prevState.clickedButtons).add(clickedNum),
      }));
    }
  }

  render() {
    const buttonSize = `${Math.min(window.innerWidth / 10, 60)}px`; // 限制最大為60px

    const defaultStyle = {
      width: buttonSize,
      height: buttonSize,
      border: '2px solid #6DBBFE',
      textAlign: 'center',
      padding: 0,
      fontSize: '1rem',
      margin: '2px',
    };
    const clickedStyle = {
      width: buttonSize,
      height: buttonSize,
      border: '2px solid #f06269',
      textAlign: 'center',
      padding: 0,
      fontSize: '1rem',
      margin: '2px',
    };

    return (
      <div style={{ padding: '10px' }}>
        <h3>count 1to 49 ，re-count after stop </h3>
        
        <h3>time: {this.state.time}s</h3>
        
          
            {this.state.intnumber.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map(num => (
                  <td
                    key={num}
                    style={{
                      padding: '0px',
                      width: `${100 / 7}%`,
                    }}
                  >
                    <Button
                      style={this.state.clickedButtons.has(num - 1) ? clickedStyle : defaultStyle}
                      color="primary"
                      outline
                      onClick={this.handlebtn}
                      id={(num - 1).toString()}
                    >
                      {num}
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
        

        <Button color="danger" onClick={this.startTimer}>
          {this.state.on === 'stop' ? 'start' : this.state.on === 'restart' ? 'restart' : 'stop'}
        </Button>{' '}
        <Button color="primary" onClick={() => window.print()}>
          print
        </Button>{' '}
        <p>grade(c/30s): <Input value={this.state.selectnumber} readOnly /></p>
        <p>name: <Input /></p>
        <p>admin: <Input /></p>

        <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    );
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
  const matrix = [];
  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}