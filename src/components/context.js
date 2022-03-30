import React, { useState } from "react";
import { getBoxes, getGameInfo } from "./local-storage";

export const myContext = React.createContext();

export const ContextProvider = (props)=> {
    const [boxes, setBoxes] = useState(getBoxes());  
    const [playMode, setPlayMode] = useState(getGameInfo('playMode'));

    const defaultValues = {
        boxes:boxes,
        setBoxes:setBoxes,
        playMode:playMode,
        setPlayMode:setPlayMode
    }
    return <myContext.Provider value={defaultValues}>
        {props.children}
    </myContext.Provider>
}
