import { useEffect } from "react";
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

  function userPressesRightArrow() {
    const temp = gameMatrix;

    let noofrow = temp.length;

    for (let i = 0; i < noofrow; i++) {
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

    setGameMatrix(temp);
  }

  function insertingNewElement() {
    let randomValue = Math.random();
    let randomXPos = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    let randomYPos = Math.floor(Math.random() * (3 - 0 + 1) + 0);

    console.log("X",randomXPos,"Y",randomYPos)

    let generatedElement = randomValue > 0.5 ? 2 : 4;

    if (gameMatrix[randomXPos][randomYPos] === 0) {
      const newMat = [...gameMatrix];
      const newRow = [...newMat[randomXPos]];
      newRow[randomYPos] = generatedElement;
      newMat[randomXPos] = newRow;
      setGameMatrix(newMat);
    }
  }

  

  let mySquares = gameMatrix.map((row) => {
    return row.map((data) => {
      return <Squares value={data} />;
    });
  });
  useEffect(() => {
    insertingNewElement();
  }, []);

  return (
    <div className="main-container">
      
      <div className="play-area">{mySquares}</div>
    </div>
  );
}

export default App;
