import { useEffect, useRef } from "react";
import "./style.css";
import React, { useState } from "react";
import Squares from "./squares";

function App() {
  const [gameMatrix, setGameMatrix] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  let listOfEmptySpace = [];

  function gettEmptySpace(gameMatrix) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (gameMatrix[i][j] === 0) {
          listOfEmptySpace.push([i, j]);
        }
      }
    }
  }

  function identifyKeyPress(event) {
    console.log(
      `the key you pressed is ${event.key} with keycode ${event.keyCode}`
    );
    let key = event.key;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      userPressesRightArrow(key);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      userPressesLeftArrow(key);
    }
  }

  function userPressesLeftArrow(key) {
    const temp = gameMatrix;

    if (key === "ArrowUp") {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
          const tmp = temp[i][j];
          temp[i][j] = temp[j][i];
          temp[j][i] = tmp;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      let rem = temp[i][0];
      let remindex = 0;

      for (let j = 1; j < 4; j++) {
        if (temp[i][j] !== 0 && temp[i][j] === rem) {
          temp[i][remindex] = temp[i][j] + temp[i][remindex];
          temp[i][j] = 0;
          rem = temp[i][j];
        } else if (temp[i][j] !== rem) {
          if (temp[i][j - 1] === 0) {
            if (temp[i][j] !== 0) {
              if (temp[i][remindex] !== 0) {
                temp[i][remindex + 1] = temp[i][j];
                rem = temp[i][remindex + 1];
                remindex = remindex + 1;
              } else {
                temp[i][remindex] = temp[i][j];
                rem = temp[i][remindex];
              }
              temp[i][j] = 0;
            }
          }
          if (temp[i][j] !== 0) {
            rem = temp[i][j];
            remindex = j;
          }
        }
      }
    }

    if (key === "ArrowUp") {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
          const tmp = temp[i][j];
          temp[i][j] = temp[j][i];
          temp[j][i] = tmp;
        }
      }
    }

    setGameMatrix(temp);
    insertingNewElement();
  }

  function userPressesRightArrow(key) {
    const temp = gameMatrix;

    if (key === "ArrowDown") {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
          const tmp = temp[i][j];
          temp[i][j] = temp[j][i];
          temp[j][i] = tmp;
        }
      }
    }

    // let noofrow = temp.length;

    for (let i = 0; i < 4; i++) {
      let rem = temp[i][temp[i].length - 1];
      let remindex = temp[i].length - 1;

      for (let j = temp[i].length - 2; j >= 0; j--) {
        if (temp[i][j] !== 0 && temp[i][j] === rem) {
          temp[i][remindex] = temp[i][j] + temp[i][remindex];
          temp[i][j] = 0;
          rem = temp[i][j];
        } else if (temp[i][j] !== rem) {
          if (temp[i][j + 1] === 0) {
            if (temp[i][j] !== 0) {
              if (temp[i][remindex] !== 0) {
                temp[i][remindex - 1] = temp[i][j];
                rem = temp[i][remindex - 1];
                remindex = remindex - 1;
              } else {
                temp[i][remindex] = temp[i][j];
                rem = temp[i][remindex];
              }
              temp[i][j] = 0;
            }
          }
          if (temp[i][j] !== 0) {
            rem = temp[i][j];
            remindex = j;
          }
        }
      }
    }

    if (key === "ArrowDown") {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
          const tmp = temp[i][j];
          temp[i][j] = temp[j][i];
          temp[j][i] = tmp;
        }
      }
    }

    setGameMatrix(temp);
    insertingNewElement();
  }

  function insertingNewElement() {
    let randomValue = Math.random();
    gettEmptySpace(gameMatrix);
    let emptySpaceListLength = listOfEmptySpace.length - 1;

    let randomNum = Math.floor(
      Math.random() * (emptySpaceListLength - 0 + 1) + 0
    );

    let emptySpace = listOfEmptySpace[randomNum];
    let generatedElement = randomValue > 0.5 ? 2 : 4;

    const newMat = [...gameMatrix];
    const newRow = [...newMat[emptySpace[0]]];
    newRow[emptySpace[1]] = generatedElement;
    newMat[emptySpace[0]] = newRow;
    setGameMatrix(newMat);
  }

  const ref = useRef(null);

  useEffect(() => {
    insertingNewElement();
    ref.current.focus();
  }, []);

  let mySquares = gameMatrix.map((row) => {
    return row.map((data) => {
      return <Squares value={data} />;
    });
  });

  // console.log(listOfEmptySpace);

  return (
    <div
      className="main-container"
      ref={ref}
      tabIndex={0}
      onKeyDown={identifyKeyPress}
    >
      <div className="play-area">{mySquares}</div>
    </div>
  );
}

export default App;
