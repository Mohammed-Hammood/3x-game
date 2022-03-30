import '../styles/home.scss';
import {UpdateGameInfo, checkWinner, setData, getBoxes, getPlayer, getGameInfo } from './local-storage';
import SVG from './svg';
import {useContext, useState } from 'react';
import { PlayersAndAreas, notificationToggle } from './dom';
import RenderBoxes from './boxes';
import {myContext} from './context';


export default function Home(props){
  //const [boxes, setBoxes] = useState(getBoxes('state'));
 // const [playMode, setPlayMode] = useState(getGameInfo('playMode'));
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
                e.dataTransfer.setData("text", e.target.id);
        }
        function drop(e) {
            e = e||window.event;
            if(e.target.children.length === 0 && !e.target.className.includes('player')){
                e.preventDefault();
                let data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));
                let player = (e.srcElement.firstChild.id.includes('square'))?'computer':'user'
                setData({id:e.srcElement.firstChild.id, position:e.target.id, moveStatus:true, player:player});
                if(getGameInfo('playMode') === 'single-player'){
                    if(checkWinner(player)){
                        notificationToggle({type:'success', player:player});
                        UpdateGameInfo({player:player});
                        setUserScore(score => score + 1);
                    }else if(checkWinner('computer')) {
                        UpdateGameInfo({player:'computer'});
                        notificationToggle({type:'failure', player:'computer'});
                    }
                }
                else {
                    if(checkWinner(player)){
                        UpdateGameInfo({player:player});
                       // (player === 'computer')?setComputerScore(score => score + 1):setUserScore(s => s + 1);
                        notificationToggle({type:'success', player:player});
                    }
                }
            }
        }
        PlayersAndAreas({drop:drop, drag:drag, allowDrop:allowDrop});
    });
    return (<div className='home-container'>
                <div className='info-container'>


                    <div className='row-1'>
                        <div className='user-score'>
                            <div className='text' title='You'>
                                <SVG name='user' color='black' />
                            </div>
                            <div className='scores-1'>{userScore}</div>
                        </div>
                        <div className='computer-score'>
                            <div className='text' title='Your oponent'>
                            {(getGameInfo('playMode') === 'single-player')?
                                <SVG name='desktop' color='blue' />
                                :<SVG name='user-unfilled' color='blue' />}
                            </div>
                            <div className='scores-2'>{computerScore}</div>
                        </div>
                    </div>
                    <div className='row-2'></div>
                </div>
            
               <RenderBoxes playMode={getGameInfo('playMode')} />
           
            <div className='notification-container hidden' id='notification-container'>
               
                <div className='success-notification hidden' id='success-notification'>
                    <div className='row-1'>
                        <SVG name='trophy' color='gold' />
                    </div>
                    <div className='row-2'>
                        <div className='player1-icon hidden' id='player1-icon'>
                            <SVG name='user' color='black' />
                        </div>
                        <div className='player2-icon ' id='player2-icon'>
                            {<SVG name='user-unfilled' color='blue' />}
                        </div>
                        <div>
                            You won!
                        </div>
                    </div>
                    <div className='row-3'>
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