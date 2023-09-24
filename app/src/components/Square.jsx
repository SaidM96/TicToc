import { useState } from "react";

export const Square = (props) => {
    const [state, setState] = useState(`${props.value}`)

    const Onclick = () => {
        if (state === `${props.value}` && props.result === ''){
            setState(props.turn);
            props.toSetBoard(props.id);
            props.Onclick();
        }
    }
    return <button
        id={props.id}
        onClick={Onclick}
        className="border-4 border-cyan-800 w-[100px] h-[100px]">
        {state === 'undefined' ? '' : state}
    </button>
}
