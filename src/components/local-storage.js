export const increment = ()=> {
    if(localStorage.getItem("inc") !== null){
        let inc = parseInt(localStorage.getItem('inc'));
        localStorage.setItem('inc', (inc + 1));
        return inc + 1;
    }
    localStorage.setItem('inc', (1));
    return 1;
}

export const setData = ({id=id, position=position, moveStatus=false, player='user'})=> {
    const data = getOrCreateData();
    let itemPosition = (position > 0 )?position:parseInt(position.slice(1, 2));
    const itemId = (id > 0)?id:parseInt(id.slice(1, 2));
    const item = {
        id:itemId,
        position:itemPosition,
        moveStatus:true,
        player:player,
        type:'player',
        className:(player==='user')?'circle-player':'square-player',
        idText:(player==='user')? '_' + itemId + 'player-circle':'_' + itemId + 'player-square',
    };
    for(let i = 0; i < data.length; i++){
        if(data[i].id === itemId && data[i].player === player){
              data[i] = item;
              break;
        }
    }
    localStorage.setItem('3x-game', JSON.stringify(data));
    if(player === 'user' && getGameInfo('playMode') === 'single-player'){ComputerActionUpdate()}
}
export const ComputerActionUpdate = ()=> {
    const data = getOrCreateData();
    const boxes = getBoxes('local storage');
    const winnerPattern = [[1,2,3], [1,4,7], [2,5,8], [3,6,9], [4,5,6], [7,8,9]];
    const freePositions =  ()=> {
        let empytArray = [];
        for(let i = 0; i < boxes.length; i++){
            if(!boxes[i].containsPlayer){
                empytArray.push(i+1);
            }
        }
        return empytArray;
    }
    const notMovedPlayers = ()=> {
        let empytArray = [];
        for(let i = 0; i < data.length; i++){
            if(!data[i].moveStatus && data[i].player === 'computer'){
            empytArray.push(i+1);
            }
        }
        return empytArray;
    }
   
    const getUserPlayers = ()=> {
        let empytArray = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].player === 'user'){
                empytArray.push(data[i]);
            }
        }
        return empytArray;
    }
    const getUserPlayersPositions = ()=> {
        let count = 0;
        let newArray = [];
        for(let i = 0; i < winnerPattern.length; i++){
            for(let k = 0; k < winnerPattern[i].length; k++){
                if (winnerPattern[i].includes(getUserPlayers()[k].position)){count++;}
            }
            if(count >= 2){newArray.push(winnerPattern[i]);count = 0;}
            else{count = 0;}
        }
        return newArray;
    }
    const movePlayer = ()=> {
        if(notMovedPlayers().length > 0){
            let player = notMovedPlayers()[0];
            setData({id:player, position:freePositions()[0], player:'computer'});
        }
        else if(getUserPlayersPositions().length > 0){
            //let p1 =getUserPlayers() getUserPlayersPositions()[0]
        }
    }
    //console.log(checkPlayers(), ', empty position: ', freePositions())
    movePlayer();
  //  console.log(notMovedPlayers(), ', empty position: ', freePositions())
}
export const checkWinner = (player)=> {
    const data = getOrCreateData();
    const winnerPattern = [[1,2,3], [1,4,7], [2,5,8], [3,6,9], [4,5,6], [7,8,9]];
    let checkArray = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].moveStatus && data[i].player === player){
            checkArray.push(data[i].position);
        } 
    }
    let flag = 0;
    for(let i = 0; i < winnerPattern.length; i++){
        for(let j = 0; j <3; j++){
            if(winnerPattern[i].includes(checkArray[j])){
                flag++;
            }else{
                flag = 0;
            }
        }
        if(flag >= 3){return true; }
    }
    return false;
}
 const getOrCreateData = ()=> {
    const player1 = {
        id:4,
        position:1,
        moveStatus:false,
        player:'computer',
        type:'player',
        className:'square-player',
        idText:'_4player-square'
    };
    const player2 = {
        id:5,
        position:2,
        moveStatus:false,
        player:'computer',
        type:'player',
        className:'square-player',
        idText:'_5player-square'
    };
    const player3 = {
        id:6,
        position:3,
        moveStatus:false,
        player:'computer',
        type:'player',
        className:'square-player',
        idText:'_6player-square'
    };
    const player1User = {
        id:1,
        position:7,
        moveStatus:false,
        player:'user',
        type:'player',
        className:'circle-player',
        idText:'_1player-circle'
    };
    const player2User = {
        id:2,
        position:8,
        moveStatus:false,
        player:'user',
        type:'player',
        className:'circle-player',
        idText:'_2player-circle'
    };
    const player3User = {
        id:3,
        position:9,
        moveStatus:false,
        player:'user',
        type:'player',
        className:'circle-player',
        idText:'_3player-circle'
    };

    if(localStorage.getItem('3x-game') === null){
        const data = [player1User, player2User, player3User, player1, player2, player3];
        localStorage.setItem("3x-game", JSON.stringify(data));
        return data;
    }
    return JSON.parse(localStorage.getItem('3x-game'));
}
const includesPlayer = (index)=> {
    const data  = getOrCreateData();
    for(let i = 0; i < data.length; i++){
        if(data[i].position === index)return true;
    }
    return false;
}
export const getBoxes = (flag=null)=> {
    console.log('flag: ', flag)
    let boxes = [];
    for(let i = 1; i <= 9; i++){
        let container = {
            id: '_'+ (i).toString() + 'square',
            className: 'square',
            containsPlayer:(includesPlayer(i))? (true):(false),
           
        };
        boxes.push(container);
    }
    return boxes;
};
export const getPlayer = (index, src=null)=> {
    const data = getOrCreateData();
    for(let i = 0; i < data.length; i++){
        //  console.log('index: ', data[i].position, index+1)
        if(data[i].position === index+1)return data[i];
    }
    return {};
}
export const resetGame = ()=> {
    if(localStorage.getItem('3x-game') !== null){
        localStorage.removeItem('3x-game');
    }
    if(localStorage.getItem('3x-game-info') !== null){
        localStorage.removeItem('3x-game-info');
    }
}
export const startGameOver = ()=> {
    if(localStorage.getItem('3x-game') !== null){
        localStorage.removeItem('3x-game');
    }
}

export const getGameInfo = (type=null)=> {
    if(localStorage.getItem('3x-game-info') === null){
        const item = {
            steps:0,
            userScore:0,
            computerScore:0,
            playMode:'single-player'
        };
        localStorage.setItem('3x-game-info', JSON.stringify(item));
    }
    const item = JSON.parse(localStorage.getItem('3x-game-info')); 
    if(type){ return item[type];}
    else{return item;}
}
export const UpdateGameInfo = ({player, type=null})=> {
    const data = getGameInfo();
    if(player === 'user' && !type){
        data.userScore =  data.userScore + 1;
    }else if(player === 'computer' && !type){
        data.computerScore =  data.computerScore + 1;
    }else if(type === 'playMode'){
        if(data.playMode === 'single-player'){data.playMode = 'two-players';}
        else{data.playMode = 'single-player';}
    }
    localStorage.setItem('3x-game-info', JSON.stringify(data));
}
