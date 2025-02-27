import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row ,Col } from 'reactstrap';

// 輔助函數保持不變
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

// 函數組件
function IntTest() {
  // 使用 useState 管理狀態
  const [intnumber, setIntnumber] = useState(
    listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7)
  );
  const [selectnumber, setSelectnumber] = useState(0);
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const [time, setTime] = useState(0);
  const [on, setOn] = useState('stop');
  const [modal, setModal] = useState(false);

  // 計時器參考（替代 this.timer）
  const [timer, setTimer] = useState(null);

  // startTimer 函數
  const startTimer = () => {
    if (on === 'restart') {
      console.log("restart");
      const newNumbers = listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7);
      setIntnumber(newNumbers);
      setSelectnumber(0);
      setClickedButtons(new Set());
      setTime(0);
      setOn('start');
    } else if (on === 'stop') {
      if (time !== 30) {
        console.log("start");
        const newNumbers = listToMatrix(shuffleArray([...Array(49).keys()].map(i => i + 1)), 7);
        setIntnumber(newNumbers);
        setSelectnumber(0);
        setClickedButtons(new Set());
        setTime(0);
        setOn('start');

        const newTimer = setInterval(() => {
          setTime(prevTime => {
            if (prevTime < 30) {
              return prevTime + 1;
            } else {
              clearInterval(newTimer);
              setOn('restart');
              return prevTime;
            }
          });
        }, 1000);
        setTimer(newTimer);
      }
    } else if (on === 'start') {
      clearInterval(timer);
      setOn('stop');
    }
  };

  // handlebtn 函數
  const handlebtn = (event) => {
    const clickedNum = parseInt(event.target.id, 10);
    if (on === 'start' && clickedNum === selectnumber) {
      setSelectnumber(prev => prev + 1);
      setClickedButtons(prev => new Set(prev).add(clickedNum));
    }
  };

  // Modal 的 toggle 函數
  const toggle = () => setModal(!modal);

  // 樣式定義
  const buttonSize = `${Math.min(window.innerWidth / 10, 60)}px`;
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

  // 清理計時器（替代 componentWillUnmount）
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // 渲染
  return (
    <div>
      <h3>click 1 to 49 in 30s</h3>
      <h3>time: {time}s</h3>
        {intnumber.map((row, rowIndex) => (
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
                  style={clickedButtons.has(num - 1) ? clickedStyle : defaultStyle}
                  color="primary"
                  outline
                  onClick={handlebtn}
                  id={(num - 1).toString()}
                >
                  {num}
                </Button>
              </td>
            ))}
          </tr>
        ))}
        <Button color="danger" onClick={startTimer}>
          {on === 'stop' ? 'start' : on === 'restart' ? 'restart' : 'stop'}
        </Button>{' '}
        <Button color="primary" onClick={() => window.print()}>
          print
        </Button>{' '}
        <p>grade(c/30s): <Input value={selectnumber} readOnly /></p>
        <p>name: <Input /></p>
        <p>admin: <Input /></p>
      

      <Modal isOpen={modal} toggle={toggle}>
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

export default IntTest;