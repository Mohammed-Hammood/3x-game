import React from 'react';
import style from '../styles/navbar.module.scss';
import { getGameInfo, resetGame as resetGameInLocalStorage, startGameOver, UpdateGameInfo } from './local-storage';
import SVG from './svg';
import { myContext } from './context';

export default class Navbar extends React.Component {
    static contextType = myContext;
    
    resetGame = ()=> {
        resetGameInLocalStorage();
        let {playMode, setPlayMode, ...rest} = this.context;
        setPlayMode( () => getGameInfo('playMode'));
    }
    startAgain = ()=> {
        startGameOver();
        let {playMode, setPlayMode, ...rest} = this.context;
        setPlayMode( () => getGameInfo('playMode'));
    }
    playMode = ()=> {
        UpdateGameInfo({type:'playMode'});
        let {playMode, setPlayMode, ...rest} = this.context;
        setPlayMode( () => getGameInfo('playMode'));
    }
    render(){
        let {playMode, ...rest} = this.context;
        return (<div className={style.navbarContainer}> 
                <button className={style.startOverButton} type='button' onClick={()=> this.startAgain()}>
                    <span>Start over</span>
                </button>
                <div className={style.centerContainer}>

                    <span className={style.modeTextContainer}>Play Mode</span>
                    <button className={style.playModeButton} type='button' onClick={()=> this.playMode()}>
                        {(playMode === 'two-players')?
                            <span id='two-mode-icon-container'>
                                <SVG name='user-group' color='black'  />
                            </span>
                            :<span id='single-mode-icon-container'> <SVG name='user' color='black' /> </span>}
                    </button>
                </div>
                <button className={style.resetButton} type='button' onClick={()=> this.resetGame()}>
                    <span>Reset Game</span>
                </button>
            </div>)
    }
}