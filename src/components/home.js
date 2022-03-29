import '../styles/home.scss';
import {UpdateGameInfo, checkWinner, setData, getBoxes, getPlayer, getGameInfo, increment, resetGame, startGameOver } from './local-storage';
import SVG from './svg';
import { useState } from 'react';
import { PlayersAndAreas } from './dom';


export default function Home(props){
  const [boxes, setBoxes] = useState(getBoxes('state'));
  const [count, setCount] = useState(0);
  const [playMode, setPlayMode] = useState(getGameInfo('playMode'));
  const [userScore, setUserScore] = useState(getGameInfo('userScore'));
  const [computerScore, setComputerScore] = useState(getGameInfo('computerScore'));

  //  const [player, setPlayers] = useState(getPlayer())
  window.addEventListener('load', function (){
        function allowDrop(e) {
            e = e||window.event;

            if(e.target.children.length === 0 && !e.target.className.includes('player')){
                
                
                e.preventDefault();
            }
        } 
        function drag(e) {
            e = e||window.event;
         //   if(e.target.children.length === 0 && !e.target.className.includes('player')){
                e.dataTransfer.setData("text", e.target.id);
         //   }
        }
         
        function drop(e) {
            e = e||window.event;
            console.log(e.explicitOriginalTarget.attributes.id)
            if(e.target.children.length === 0 && !e.target.className.includes('player')){
                // if(e.srcElement.firstChild.id !== null){
                // }
                e.preventDefault();
                let data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));
                let player = (e.srcElement.firstChild.id.includes('square'))?'computer':'user'
                setData({id:e.srcElement.firstChild.id, position:e.target.id, moveStatus:true, player:player});
                if(checkWinner(player) && player === 'user' && getGameInfo('playMode') === 'single-player'){
                    UpdateGameInfo({player:player});
                    notificationToggle({type:'success', player:'user'});
                }else if (checkWinner(player) && player === 'computer' && getGameInfo('playMode') === 'two-players'){
                    UpdateGameInfo({player:player});
                    setComputerScore(score => score + 1);
                }
                //setBoxes(getBoxes());

            }

        }
        PlayersAndAreas({drop:drop, drag:drag, allowDrop:allowDrop});
    });
    const notificationToggle = ({type=null, player=null})=> {
        const notification = document.getElementById('notification-container');
        const success = document.getElementById('success-notification');
        const failure = document.getElementById('failure-notification');
        if(type === 'success'){
            notification.classList.remove('hidden');
            notification.classList.add('show-f');
            failure.classList.remove('show-f');
            failure.classList.add('hidden');
            success.classList.remove('hidden');
            success.classList.add('show-f');
            if(player){
                
            }
        }else if(type === 'failure'){
            notification.classList.remove('hidden');
            notification.classList.add('show-f');
            success.classList.remove('show-f');
            success.classList.add('hidden');
            failure.classList.remove('hidden');
            failure.classList.add('show-f');
        }else {
            notification.classList.remove('show-f');
            notification.classList.add('hidden');
            failure.classList.remove('show-f');
            failure.classList.add('hidden');
            success.classList.remove('show-f');
            success.classList.add('hidden');
            startGameOver();
        }
    }
    return (<div className='home-container'>
                <div className='info-container'>
                    <div className='row-1'>
                        <div className='user-score'>
                            <div className='text' title='You'>
                                <SVG name='user' color='black' />
                            </div>
                            <div className='scores'>{userScore}</div>
                        </div>
                        <div className='computer-score'>
                            <div className='text' title='Your oponent'>
                            {(playMode === 'single-player')?
                                <SVG name='desktop' color='blue' />
                                :<SVG name='user-unfilled' color='blue' />}
                            </div>
                            <div className='scores'>{computerScore}</div>
                        </div>
                    </div>
                    <div className='row-2'></div>
                </div>
            <div className='main-container'>{console.log('state: ', boxes, ', storage: ', getBoxes(), boxes.increment)}
                {boxes.map((item, index)=> {return (<div className={item.className} key={index} id={item.id}>
                    {(item.containsPlayer)?
                        <div className={(playMode === 'two-players')?getPlayer(index).className :(getPlayer(index).className.includes('square'))?'computer-player':getPlayer(index).className} draggable={(playMode === 'two-players')?'true':((getPlayer(index).className.includes('square') )?'false':'true')} id={getPlayer(index).idText} >
                            {(getPlayer(index).moveStatus)?'':<SVG name='lock' color='white' />}    
                        </div>
                        :''}
                    </div>)})}
            </div>
            <div className='notification-container hidden' id='notification-container'>
                <div className='success-notification hidden' id='success-notification'>
                    <div>
                        <SVG name='trophy' color='gold' />
                    </div>
                    <div>
                        <p>You won!</p>
                        <div>
                            {/* <SVG name='user-unfilled' color='blue' /> */}
                        </div>
                    </div>
                    <div>
                        <button className='start-over-btn' type='button' onClick={()=> notificationToggle({})}>
                            <span>Start again</span>
                        </button>
                    </div>
                </div>
                <div className='failure-notification hidden' id='failure-notification'>
                    <div>
                        <SVG name='face-frown' color='red' />
                    </div>
                    <div>
                        <p>You lost!</p>
                    </div>
                    <div>
                        <button className='start-over-btn' type='button' onClick={()=> notificationToggle({})}>
                            <span>Start again</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}