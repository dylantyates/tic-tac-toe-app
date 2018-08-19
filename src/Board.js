import React from 'react';
import Square from './Square';

class Board extends React.Component {
  createBoard(row, col) {
    const board = [];
    let cellCounter = 0;

    for(let i = 0; i < row; i++) {
      const columns = [];
      for(let j = 0; j < col; j++) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
    }

    return board;
  }

  renderSquare(i) {
    const winningClass = this.props.winningSquares &&
    (this.props.winningSquares[0] === i ||
      this.props.winningSquares[1] === i ||
      this.props.winningSquares[2] === i) ? ' winning' : '';

    return (
      <Square
        winningClass={winningClass}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div className="game-grid">
        {this.createBoard(3,3)}
      </div>
    );
  }
}

export default Board;
