// LEFT DIRECTION

let gameMatrix = [
  [0, 2, 2, 0],
  [0, 4, 2, 4],
  [32, 4, 16, 4],
  [0, 0, 0, 2],
];

let noofrow = gameMatrix.length;
let noofcol = gameMatrix[0].length;

for (let i = 0; i < noofrow; i++) {
  let rem = gameMatrix[i][0];
  let remindex = 0;

  for (let j = 1; j < noofcol; j++) {
    if (gameMatrix[i][j] !== 0 && gameMatrix[i][j] === rem) {
      gameMatrix[i][remindex] = gameMatrix[i][j] + gameMatrix[i][remindex];
      gameMatrix[i][j] = 0;
      rem = gameMatrix[i][j];
    }
    else if(gameMatrix[i][j] != rem){
        if(gameMatrix[i][j-1] === 0){
            if(gameMatrix[i][j] != 0){
                if(gameMatrix[i][remindex] != 0){
                    gameMatrix[i][remindex+1]=gameMatrix[i][j]
                    rem=gameMatrix[i][remindex+1]
                    remindex=remindex+1
                }
                else{
                    gameMatrix[i][remindex]=gameMatrix[i][j]
                    rem=gameMatrix[i][remindex]
                }
                gameMatrix[i][j]=0
            }
        }
        if(gameMatrix[i][j] != 0){
            rem=gameMatrix[i][j]
            remindex=j
        }
    }
  }
}

console.log(gameMatrix)
