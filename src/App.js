import React, { useState } from 'react';
import Block from './components/block/block';

import './App.css';

function App() {
    const [currentSign, setCurrentSign] = useState('X');
    const [winner, setWinner] = useState(null);
    const [blocks, setBlocks] = useState(Array(9).fill(null));

    const checkWinner = (blocks) => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of winningLines) {
            const [a, b, c] = line;
            if (
                blocks[a] &&
                blocks[a] === blocks[b] &&
                blocks[a] === blocks[c]
            ) {
                return blocks[a];
            }
        }

        return null;
    };

    const handleClick = (index) => {
        if (!blocks[index] && !winner) {
            const newBlocks = [...blocks];
            newBlocks[index] = currentSign;
            setBlocks(newBlocks);

            const winnerResult = checkWinner(newBlocks);
            if (winnerResult) {
                setWinner(winnerResult);
            } else {
                setCurrentSign(currentSign === 'X' ? 'O' : 'X');
            }
        }
    };

    const renderBlocks = () => {
        const blocksList = blocks.map((value, index) => (
            <Block
                key={index}
                value={value}
                onClick={() => handleClick(index)}
            />
        ));

        return blocksList;
    };

    function startOver() {
        setWinner(null);
        setBlocks(Array(9).fill(null));
    }

    const status = winner ? `Winner: ${winner}` : `Next player: ${currentSign}`;

    return (
        <AppLayout
            status={status}
            renderBlocks={renderBlocks}
            startOver={startOver}
        />
    );
}

function AppLayout({ status, renderBlocks, startOver }) {
    return (
        <>
            <div className="status">{status}</div>
            <div onClick={startOver} className="start-over">
                Start Over
            </div>
            <div className="App">
                <div className="board">{renderBlocks()}</div>
            </div>
        </>
    );
}

export default App;
