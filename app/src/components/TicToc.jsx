import { useState } from "react";
import { Square } from "./Square"

export const TicToc = () => {
    const [turn,setTurn] = useState('X');
    const [result, setResult] = useState('');
    const size = 4;

    const generateBord = (size) => {
        let board = [];
        let line = [];
        let id = 1;
        for(let i = 0; i < size; ++i){
            line = new Array(size).fill(i)
            for(let j = 0; j < size; ++j){
                line[j] = id;
                id++;
            }
            board.push(line);
        }
        return board;
    }
    const [Board, setboard] = useState(generateBord(size));
    

    const Onclick = () => {
        turn === 'X' ? setTurn('O') : setTurn('X');
    }

    const checkRows = (b) => {
        let ggR = 0;
        let last = '';
        for(let i = 0; i < size; ++i){
            last = b[i][0];
            for(let j = 0; j < size; ++j)
                if (last === b[i][j]) ggR++;
            if (ggR === size) return true;
            ggR = 0;
        }
        return false;
    }

    const checkColumns = (b) => {
        let ggC = 0;
        let last = '';
        for(let j = 0; j < size; ++j){
            last = b[0][j];
            for(let i = 0; i < size; ++i)
                if (last === b[i][j]) ggC++;
            if (ggC === 3) return true;
            ggC = 0;
        }
        return false;
    }


    const checkDiagonal = (b) => {
        let ggD = 0;
        let rCorner = b[0][size - 1];
        let lCorner = b[0][0];
        let i = 0;
        let j = 0;
        for(; i < size; ++i){
            if (lCorner === b[i][j]) ggD++;
            j++;
        }
        if (ggD === size) return true;
        ggD = 0;
        j = size - 1;
        for(i = 0; i < size; ++i){
            if (rCorner === b[i][j]) ggD++;
            j--;
        }
        if (ggD === size) return true;
        return false
    }

    const checkWinner = (boa) => {
        if (checkRows(boa) || checkColumns(boa) || checkDiagonal(boa)){
            setResult(`Winner is ${turn}`);
            
        }
    }

    const update = (id) => {
        if (result === ''){
            let newBoard = Board;
            for(let j = 0; j < size; ++j){
                for(let i = 0; i < size; ++i){
                    newBoard[j][i] = (id === newBoard[j][i]) ? turn : newBoard[j][i];
                }
            }
            setboard(newBoard);
            checkWinner(Board);
        }
    }

    return <div className=''>
        <h1 className="relative left-[100px] bottom-[50px]">{result}</h1>
        <div className={`grid grid-cols-${size}`}>
            {
                Board.map((square) => square.map((square) =>  <Square board={Board} result={result} toSetBoard={update} id={square} value={undefined} turn={turn} Onclick={Onclick} />))
            }
        </div>
        <button className="rounded" onClick={() => window.location.reload()}>Reset</button>
    </div>
}