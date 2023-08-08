//RIGHT DIRECTION
const temp = [
  [2, 2, 0, 0],
  [4, 8, 0, 4],
  [4, 4, 0, 0],
  [16, 8, 32, 32],
];

function transpose(mat) {
  for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < i; j++) {
          const tmp = mat[i][j];
          mat[i][j] = mat[j][i];
          mat[j][i] = tmp;
      }
  }
  return mat;
}

console.log(transpose(temp))

// noofrow = temp.length;

// for (let i = 0; i < noofrow; i++) {
//   let rem = temp[i][temp[i].length - 1];
//   let remindex = temp[i].length - 1;

//   for (let j = temp[i].length - 2; j >= 0; j--) {
//     // 2 0 2 0
//     console.log("curr state",temp[0]);
//     console.log(`At j=${j} the rem is ${rem}, remindex is ${remindex}`)

//     if (temp[i][j] != 0 && temp[i][j] == rem) {
//       temp[i][remindex] = temp[i][j] + temp[i][remindex];
//       temp[i][j] = 0;
//       rem = temp[i][j];
//     } 
//     else if (temp[i][j] != rem) {// 2 0 2 0
//       if (temp[i][j + 1] == 0) {
//         if (temp[i][j] != 0) {
//           if (temp[i][remindex] != 0) {
//             temp[i][remindex - 1] = temp[i][j];
//             rem = temp[i][remindex - 1];
//             remindex = remindex - 1;
//           } 
//           else {
//             temp[i][remindex] = temp[i][j];
//             rem=temp[i][remindex]
//           }
//           temp[i][j] = 0;
//         }
//       }
//       if (temp[i][j] != 0) {
//         rem = temp[i][j];
//         remindex = j;
//       }
//     }
//   }
// }

// console.log(temp);
