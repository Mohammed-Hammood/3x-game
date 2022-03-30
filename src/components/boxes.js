import '../styles/home.scss';
import { getBoxes, getPlayer, getGameInfo } from './local-storage';
import SVG from './svg';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { myContext } from './context';

export default function RenderBoxes(props){
    const {boxes, ...rest} = useContext(myContext);
    return (<>
            <div className='main-container'>
             
                {boxes.map((item, index)=> {return (
                        <div className={item.className} key={index} id={item.id}>
                        {(item.containsPlayer)? 
                            <div className={(getGameInfo('playMode') === 'two-players')?(getPlayer(index).className) :
                                ((getPlayer(index).className.includes('square'))?'computer-player':getPlayer(index).className)} 
                                draggable={(getGameInfo('playMode') === 'two-players')?'true':((getPlayer(index).className.includes('square') )?'false':'true')} id={getPlayer(index).idText} >
                                {(getPlayer(index).moveStatus)?<span id='fake-icon'></span>:<SVG name='lock' color='white' />}    
                            </div>
                            :null} 
                    </div>)})}
            </div>
        </>);
}

// <div className='main-container'>{console.log('render, ', getBoxes(), getGameInfo('playMode'))}
// {getBoxes().map((item, index)=> {return (<div className={item.className} key={index} id={item.id}>
//     {console.log(item.containsPlayer)}
//     {(item.containsPlayer)? 
//         <div className={(getGameInfo('playMode') === 'two-players')?
//         getPlayer(index).className :
//             (getPlayer(index).className.includes('square'))?'computer-player':getPlayer(index).className} draggable={(getGameInfo('playMode') === 'two-players')?'true':((getPlayer(index).className.includes('square') )?'false':'true')} id={getPlayer(index).idText} >
//             {(getPlayer(index).moveStatus)?<span id='fake-icon'></span>:<SVG name='lock' color='white' />}    
//         </div>
//         :null} 
//     </div>)})}
// </div>