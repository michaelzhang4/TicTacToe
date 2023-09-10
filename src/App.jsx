import { useState } from "react";
import Square from "./components/Square";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  let xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function Back() {
    if (currentMove === 0) return;
    setCurrentMove(currentMove - 1);
  }

  function newGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="Game">
      <div className="Game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          handlePlay={handlePlay}
        />
      </div>
      <div className="Game-info">
        <ul className="list-group">
          <li>
            <button className={"buttons"} onClick={() => newGame()}>
              New Game
            </button>
          </li>
          <li>
            <button className={"buttons"} onClick={() => Back()}>
              Back
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, handlePlay }) {
  function handleClick(index) {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  }
  let status;
  let winner = calculateWinner(squares);
  status = winner ? "Winner is " + winner : xIsNext ? "X to move" : "O to move";
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
