import { useEffect, useRef } from "react";
import "./style.css";
import React, { useState } from "react";
import Squares from "./squares";
import Lost from "./lost";

function App() {
  const [gameMatrix, setGameMatrix] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameScore, setGameScore] = useState(0);
  const [gameHighScore, setGameHighScore] = useState(0);
  const [youLost, setYouLost] = useState(false);

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
    let key = event.key;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      userPressesRightArrow(key);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      userPressesLeftArrow(key);
    }
  }

  function transpose(temp) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < i; j++) {
        const tmp = temp[i][j];
        temp[i][j] = temp[j][i];
        temp[j][i] = tmp;
      }
    }
    return temp;
  }

  function userPressesLeftArrow(temp) {
    let score = 0;

    for (let i = 0; i < 4; i++) {
      let rem = temp[i][0];
      let remindex = 0;

      for (let j = 1; j < 4; j++) {
        if (temp[i][j] !== 0 && temp[i][j] === rem) {
          score += temp[i][j] + temp[i][remindex];
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

    setGameScore(gameScore + score);
    setGameHighScore(
      gameScore + score >= gameHighScore ? gameScore + score : gameHighScore
    );

    return temp;
  }

  function userPressesRightArrow(temp) {
    let score = 0;

    for (let i = 0; i < 4; i++) {
      let rem = temp[i][temp[i].length - 1];
      let remindex = temp[i].length - 1;

      for (let j = temp[i].length - 2; j >= 0; j--) {
        if (temp[i][j] !== 0 && temp[i][j] === rem) {
          score += temp[i][j] + temp[i][remindex];
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

    setGameScore(gameScore + score);
    setGameHighScore(
      gameScore + score >= gameHighScore ? gameScore + score : gameHighScore
    );
    return temp;
  }

  function insertingNewElement(temp) {
    let randomValue = Math.random();
    gettEmptySpace(temp);
    let emptySpaceListLength = listOfEmptySpace.length - 1;

    let randomNum = Math.floor(
      Math.random() * (emptySpaceListLength - 0 + 1) + 0
    );

    let emptySpace = listOfEmptySpace[randomNum];
    let generatedElement = randomValue > 0.5 ? 2 : 4;

    const newMat = [...temp];
    const newRow = [...newMat[emptySpace[0]]];
    newRow[emptySpace[1]] = generatedElement;
    newMat[emptySpace[0]] = newRow;
    console.log("matrix with just inserted ele", newMat);
    return newMat;
  }

  function resetGame() {
    setGameMatrix([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    setGameScore(0);
    insertingNewElement();
    setYouLost(false);
  }

  const ref = useRef(null);

  useEffect(() => {
    let temp = insertingNewElement(gameMatrix);
    temp = insertingNewElement(temp);
    setGameMatrix(temp);
    ref.current.focus();
  }, []);

  let mySquares = gameMatrix.map((row) => {
    return row.map((data) => {
      return <Squares value={data} />;
    });
  });

  function makeCopy() {
    let temp = [];
    gameMatrix.forEach((row) => {
      let newRow = [];
      row.forEach((ele) => newRow.push(ele));
      temp.push(newRow);
    });
    return temp;
  }

  function checkTwoMatrixEqual(beforeState, temp) {
    let flag = true; //two matrix are equal

    for (let i = 0; i < beforeState.length; i++) {
      for (let j = 0; j < beforeState[0].length; j++) {
        if (beforeState[i][j] !== temp[i][j]) {
          flag = false; // Values at position (i, j) are not equal
          break;
        }
      }
    }

    return flag;
  }

  function workFlow(event) {
    let beforeState = makeCopy();

    let temp = makeCopy();

    if (event.key === "ArrowUp") {
      temp = transpose(temp);
      temp = userPressesLeftArrow(temp);
      temp = transpose(temp);
    } else if (event.key === "ArrowRight") {
      temp = userPressesRightArrow(temp);
    } else if (event.key === "ArrowDown") {
      temp = transpose(temp);
      temp = userPressesRightArrow(temp);
      temp = transpose(temp);
    } else if (event.key === "ArrowLeft") {
      temp = userPressesLeftArrow(temp);
    }

    console.log("beforeState", beforeState, "temp", temp);
    if (!checkTwoMatrixEqual(beforeState, temp)) {
      temp = insertingNewElement(temp);
    }
    setGameMatrix(temp);
  }

  return (
    <div className="main-container" ref={ref} tabIndex={0} onKeyDown={workFlow}>
      {youLost && <Lost />}
      <div className="content-area">
        <div className="game-title">2048</div>
        <div className="stats-container">
          <div className="stats">
            <div className="score">SCORE: {gameScore}</div>
            <div className="high-score">HIGH SCORE: {gameHighScore}</div>
          </div>
          <div className="new-game-container" onClick={resetGame}>
            New Game
          </div>
        </div>
        <div className="play-area">{mySquares}</div>
      </div>
    </div>
  );
}

export default App;
