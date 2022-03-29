export const PlayersAndAreas = ({drop, drag, allowDrop})=> {

    const area1 = document.querySelector("#_1square");
    const area2 = document.querySelector("#_2square");
    const area3 = document.querySelector("#_3square");
    const area4 = document.querySelector("#_4square");
    const area5 = document.querySelector("#_5square");
    const area6 = document.querySelector("#_6square");
    const area7 = document.querySelector("#_7square");
    const area8 = document.querySelector("#_8square");
    const area9 = document.querySelector("#_9square");

    const player1c = document.getElementById("_1player-circle");
    const player2c = document.getElementById("_2player-circle");
    const player3c = document.getElementById("_3player-circle");
    const player4S = document.getElementById("_4player-square");
    const player5S = document.getElementById("_5player-square");
    const player6S = document.getElementById("_6player-square");
    
    player4S.ondragstart = drag;
    player5S.ondragstart = drag;
    player6S.ondragstart = drag;

    player1c.ondragstart = drag;
    player2c.ondragstart = drag;
    player3c.ondragstart = drag; 

    area1.ondrop = drop;
    area1.ondragover = allowDrop;

    area2.ondrop = drop;
    area2.ondragover = allowDrop;

    area3.ondrop = drop;
    area3.ondragover = allowDrop;

    area4.ondrop = drop;
    area4.ondragover = allowDrop;

    area5.ondrop = drop;
    area5.ondragover = allowDrop;

    area6.ondrop = drop;
    area6.ondragover = allowDrop;

    area7.ondrop = drop;
    area7.ondragover = allowDrop;

    area8.ondrop = drop;
    area8.ondragover = allowDrop;

    area9.ondrop = drop;
    area9.ondragover = allowDrop;
}