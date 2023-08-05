
const temp=[
    [2,0,0,0],
    [4,8,0,4],
    [4,64,4,0],
    [16,8,32,0],
]

noofrow=temp.length

for(let i=0; i<noofrow; i++){
    let rem=temp[i][temp[i].length-1]
    let remindex=temp[i].length-1;
    
    for(let j=temp[i].length-2; j>=0; j--){ 
        
        if(temp[i][j] != 0 && temp[i][j] == rem){ 
            temp[i][remindex]=temp[i][j]+temp[i][remindex];
            temp[i][j]=0
            rem=temp[i][j];
            
            
        }
        else if(temp[i][j] != rem){
            if(temp[i][j+1]==0){
                if(temp[i][j] != 0){
                    if(temp[i][remindex] != 0){
                        temp[i][remindex-1]=temp[i][j]
                        rem=temp[i][remindex-1]
                        remindex=remindex-1
                    }
                    else{
                        temp[i][remindex]=temp[i][j]
                        
                    }
                    temp[i][j]=0
                    
                }
            }
            if(temp[i][j] != 0){
                rem=temp[i][j]
                remindex=j
            }
            
        }
    }
}

console.log(temp);