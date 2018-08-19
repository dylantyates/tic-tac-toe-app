import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          names: Array(2).fill('One','Two'),
        }
    ],
      stepNumber: 0,
      playerOne: true,
      playerName: true,
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningRow: lines[i] };
      }
    }
    return { winner: null, winnerRow: null };
  }

  getLocation(move) {
    const locations = {
      0: '[row: 1 | column: 1]',
      1: '[row: 1 | column: 2]',
      2: '[row: 1 | column: 3]',
      3: '[row: 2 | column: 1]',
      4: '[row: 2 | column: 2]',
      5: '[row: 2 | column: 3]',
      6: '[row: 3 | column: 1]',
      7: '[row: 3 | column: 2]',
      8: '[row: 3 | column: 3]'
    }
    return locations[move];
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const names = current.names.slice();
    if (this.calculateWinner(squares).winner || squares[i]) {
      return;
    }
    names[i] = this.state.playerName ? 'One' : 'Two';
    squares[i] = this.state.playerOne ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          names: names,
          currentLocation: this.getLocation(i),
        }
    ]),
      stepNumber: history.length,
      playerOne: !this.state.playerOne,
      playerName: !this.state.playerName,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerName: (step % 2) === 0,
      playerOne: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningRow } = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const currentLocation = step.currentLocation ? step.currentLocation : '';
      const currentMove = move === this.state.stepNumber ? 'button-selected' : ' ';
      const desc = move ?
        'Move #' + move :
        'Reset Game';
      return (
        <li key={move}>
          <button
            className={currentMove}
            onClick={() => this.jumpTo(move)}>
              {desc} <small>{currentLocation}</small>
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Player ' + (!this.state.playerName ? 'One' : 'Two') + ' Wins';
    } else if (history.length === 10) {
      status = 'Draw';
    } else {
      status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + ' (' + (this.state.playerOne ? 'X' : 'O') + ')';
    }

    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-board">
          <Board
            winningSquares={winningRow}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-board">
          <div className="status">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
