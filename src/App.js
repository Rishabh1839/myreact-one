// import useState that is a special function by React
// it allows it to remember things
import { useState } from 'react';

// edited the square component that receives value prop from Board component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}\

// function for creating a 3x3 board 
function Board({xIsNext, squares, onPlay}) {
  /* Handle Click function creates a copy of squares array (nextSquares) with the JS slide array method
  then it updates the nextSquares array to add x to the first [0] index square.
  Calling the setSquares function lets React know the state of component is changed.
  This triggers a re render of the components that use the squares state board as well as its child components
  (the Square components that make up the board)
  */
  function handleClick(i) {
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    // if statement 
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  /* to declare that the game is over, we will display text on who wins X or O, 
  we add status section to the Board component. This will display the winner if the game is over
  or if the game is ongoing you'll display which player goes next */
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player" + (xIsNext ? "X" : "O");
  }

  /* () => is an arrow function which is shorter way to define functions.
  when this square is clicked the code after => arrow will run calling out the handleClick(0). */ 
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

// adding a Game component that renders the board component and some markup
export default function Game() {
  // creates an array of 9 elements and sets them all to null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /* using map to transform history of moves into react elements representing
  buttons on the screen, and display a list of buttons to jump past moves.*/
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// creating new function to declare the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
