import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props){
    let [counter , setCounter]=useState(0);
    function setRandom(){
        setCounter(Math.random());
    }
    return <CounterContext.Provider value={{counter , setRandom , setCounter}}>
        {props.children}
    </CounterContext.Provider>

}
