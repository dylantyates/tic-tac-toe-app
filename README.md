# Tic-Tac-Toe App

This guide follows the official [React Tutorial](https://reactjs.org/tutorial/tutorial.html) to create a simple tic-tac-toe game.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Initial Setup

I recommend using [Yarn](https://yarnpkg.com/en/) as an alternative to [npm](https://www.npmjs.com/).

```bash
brew install yarn
```

## Testing

Be sure to checkout [TESTING](https://github.com/dylantyates/js-guide/tree/master/react/tic-tac-toe-app/TESTING.md) for more information on testing the tic-tac-toe app.

## Overview

1. [Setup Local Development Environment](#setup-local-development-environment)
2. [Refactor Create React App](#refactor-create-react-app)
3. [Add Source Files](#add-source-files)
4. [Pass A Prop To Square](#pass-a-prop-to-square)
5. [Add Event Handler To Square](#add-event-handler-to-square)
6. [Initialize Game State In Square](#initialize-game-state-in-square)
7. [Lift Up Game State To Board](#lift-up-game-state-to-board)
8. [Remove Game State From Square](#remove-game-state-from-square)
9. [Add Game State Event Handler](#add-game-state-event-handler)
10. [Make Square A Functional Component](#make-square-a-functional-component)
11. [Add Player Turns To Game State](#add-player-turns-to-game-state)
12. [Add Game Winning Logic](#add-game-winning-logic)
13. [Lift Up Game State To Game](#lift-up-game-state-to-game)
14. [Show History Of Moves](#show-history-of-moves)

##### Additional Challenges

- [Display Location For Moves](#display-location-for-moves)
- [Highlight Current Move](#highlight-current-move)
- [Refactor Board With Two Loops](#refactor-board-with-two-loops)
- [Highlight Winning Squares](#highlight-winning-squares)
- [Game Logic For Draws](#game-logic-for-draws)

### Setup Local Development Environment

```bash
npm install -g create-react-app
cd react

yarn create react-app tic-tac-toe-app
cd tic-tac-toe-app
```

### Refactor Create React App

```bash
cd tic-tac-toe-app
rm -rfv src/*
```

### Add Source Files

```bash
touch index.js
touch index.css
```

Copy source code from the following pens: [index.js](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) and [index.css](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)

<strong>index.js</strong>

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This goes above your copied code
```

### Pass A Prop To Square

<strong>index.js</strong>

```js
// BOARD
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; // Pass props to Square
  }
}

// SQUARE
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value} // Add props to Square
      </button>
    );
  }
}
```

### Add Event Handler To Square

```js
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => alert('click')}> // Add onClick event handler
        {this.props.value}
      </button>
    );
  }
}
```

### Initialize Game State In Square

```js
class Square extends React.Component {
  // Add constuctor class to initialize state
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}> // Update state with onClick event handler
        {this.state.value} // Update from props to state
      </button>
    );
  }
}
```

### Lift Up Game State To Board

```js
class Board extends React.Component {
  // Initialize Board state
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // Pass Board State to Square
        onClick={() => this.handleClick(i)} /> // Maintain Board state's privacy
    ); // Added return (...); for legibility
  }

  // ... //
}
```

### Remove Game State From Square

```js
class Square extends React.Component {
  render() {

    // Remove constructor()

    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}> // Add game state onClick event handler
          {this.props.value} // Replace state with props
      </button>
    );
  }
}
```

### Add Game State Event Handler

```js
class Board extends React.Component {
  constructor(props) {
    ...
  }

  // Add game state event handler
  handleClick(i) {
    const squares = this.state.squares.slice(); // Use slice() for immutability
    squares[i] = 'X'; // Mark 'X' in Square
    this.setState({squares: squares}); // Set game state
  }

  renderSquare(i) {
    ...
  }

  render() {
    ...
  }
}

// NOTE: Square is now a CONTROLLED COMPONENT
```

### Make Square A Functional Component

```js
// Replace Square class with function
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

### Add Player Turns To Game State

```js
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      names: Array(2).fill('One', 'Two'), // Custom
      playerOne: true, // This is xIsNext in the original tutorial
      playerName: true, // Custom
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const names = this.state.square.slice(); // Custom
    names[i] = this.state.playerName ? 'One' : 'Two'; // Custom
    squares[i] = this.state.playerOne ? 'X' : 'O'; // Toggle values between 'X' and 'O'
    this.setState({
      squares: squares,
      names: names, // Custom
      playerOne: !this.state.playerOne, // Toggle boolean to switch turns
      playerName: !this.state.playerName, // Custom
    });
  }

  renderSquare(i) {
    ...
  }

  render() {
    const status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + '(' + (this.state.playerOne + ')'; // Custom
    ...
  }
}

// All lines noted with '//custom' are my own modifications for steez :)
```

### Add Game Winning Logic

```js
// Add helper function to check if player wins
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // Possible winning combos

  // Loop through game state and match winning values
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  ...
}

class Board extends React.Component {
  constructor(props) {
    ...
  }

  handleClick(i) {
    ...
    // Add early return to cancel clicks after player wins
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    ...
    });
  }

  renderSquare(i) {
    ...
  }

  render() {
    ...
    // Render helper function
    const winner = calculateWinner(this.state.squares);
    let status;
    // Render winning message or player turn
    if (winner) {
      status = 'Player ' + (!this.state.playerName ? 'One' : 'Two') + ' Wins!';
    } else {
      status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + ' (' + (this.state.playerOne ? 'X' : 'O') + ')';
    }
    ...
  }
}

class Game extends React.Component {
  ...
}

// ========================================

ReactDOM.render(
  ...
);
```

### Lift Up Game State To Game

There is a lot to this since our game state in `Board` was pretty well featured so I will break it down into sub-sections to understand the state lifting process better.

##### Initialize state in Game

```js
class Game extends React.Component {
  // Move constructor from Board to Game and add history prop
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          names: Array(2).fill('One','Two')
        }
    ],
      playerOne: true,
      playerName: true,
    };
  }
}
```

##### Transform the Board

```js
class Board extends React.Component {

  // Delete handleClick

  renderSquare(i) {
    return (
      // Convert from 'this.state' to 'this.props' in Square
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    // Remove everything before return()
    return (
      <div className="game-grid">
        // Remove status
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

##### Update Game's render() function

```js
class Game extends React.Component {

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Player ' + (!this.state.playerName ? 'One' : 'Two') + ' Wins!';
    } else {
      status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + ' (' + (this.state.playerOne ? 'X' : 'O') + ')';
    }

    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-board">
          // Add current.squares and handleClick()
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-board">
          // Move status into Game
          <div className="status">{status}</div>
          <ul>{/* Add moves in next section */}</ul>
        </div>
      </div>
    );
  }
}
```

##### Lift handleClick() up to Game

```js
class Game extends React.Component {

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const names = current.names.slice();
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    names[i] = this.state.playerName ? 'One' : 'Two';
    squares[i] = this.state.playerOne ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        names: names,
      }]),
      playerOne: !this.state.playerOne,
      playerName: !this.state.playerName,
    });
  }
}
```

### Show History Of Moves

```js
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          names: Array(2).fill('One','Two')
        }
      ],
      // Add stepNumber
      stepNumber: 0,
      playerOne: true,
      playerName: true,
    }
  }

  handleClick(i) {
    // Throw away future moves after time travel
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    ...

    this.setState({
      history: history.concat([{
        squares: squares,
        names: names,
      }]),
      // Set step number to last history entry
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
    })
  }

  render() {
    const history = this.state.history;
    // Render current move according to stepNumber
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // Map over history and return dynamic list of moves
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Reset Game';
      return (
        // Make sure to add unique key otherwise React throws error
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    ...

    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-board">
          <div className="status">{status}</div>
          // Add moves to list (changed from ol to ul for styling)
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}
```

That wraps up the Official React Tutorial with some basic customization.

## Additional Challenges

Below are the additional challenges in order from least to most difficult.

### Display Location For Moves

Create `getLocation()` function and `locations` object with corresponding rows and columns for each possible `move`

```js
function getLocation(move) {
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
```

Set `currentLocation` in the `handleClick()` event.

```js
class Game extends React.Component {
  constructor(props) {
    ...
  }
  handleClick(i) {
    ...
    this.setState({
      history: history.concat([
        {
          squares: squares,
          names: names,
          // Set currentLocation
          currentLocation: getLocation(i),
        }
    ]),
      ...
    });
  }
}
```

Add current location to `moves` array.

```js
const moves = history.map((step, move) => {
  // Add currentLocation conditional
  const currentLocation = step.currentLocation ? step.currentLocation : '';
  const desc = move ?
    // Refactored desc to be shorter for mobile
    'Move #' + move :
    'Reset Game';
  return (
    <li key={move}>
      <button onClick={() => this.jumpTo(move)}>
        // Add currentLocation to move button
        {desc} <small>{currentLocation}</small>
      </button>
    </li>
  );
});
```

### Highlight Current Move

Create your style class for the current move button in `index.css`

```css
.button-selected {
  color: rgba(255,255,255,1);
}
```

Add `currentMove` that toggles css class for current move.

```js
const moves = history.map((step, move) => {
  ...
  // Add css class to current move
  const currentMove = move === this.state.stepNumber ? 'button-selected' : ' ';
  ...
  return (
    <li key={move}>
      // Add JSX className on button for toggling css class
      <button className={currentMove} onClick={() => this.jumpTo(move)}>{desc} <small>{currentLocation}</small></button>
    </li>
  );
});
```

### Refactor Board With Two Loops

This all happens in your `Board` class. First add `createBoard()` function which loops through rows and columns and creates game board.

```js
createBoard(row, col) {
  const board = [];
  let cellCounter = 0;

  // Loop for rows
  for(let i = 0; i < row; i++) {
    const columns = [];
    // Loop for columns
    for(let j = 0; j < col; j++) {
      columns.push(this.renderSquare(cellCounter++));
    }
    // Each div needs a unique key !!!
    board.push(<div key={i} className="board-row">{columns}</div>);

  return board;
}
```

Add `key` to `renderSquare()` function.

```js
renderSquare(i) {
  return (
    <Square
      // Add unique keys for Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />
  );
}
```

Refactor render to use `createBoard()` function.

```js
render() {
  return (
    <div className="game-grid">
      {this.createBoard(3,3)}
    </div>
  );
}
```

### Highlight Winning Squares

Add winning class to `index.css`

```css
.winning {
  background-color: #ffff00;
}
```

Refactor `Square` className.

```js
function Square(props) {
  return (
    <button
      // Add JSX className to Square
      className={"square" + props.winningClass}
      onClick={props.onClick}>
        {props.value}
    </button>
  );
}
```

Refactor `render()` in `Game` class.

```js
render() {
  ...
  // Convert winner constant to an object with winner and winningRow
  const { winner, winningRow } = calculateWinner(current.squares)
  ...
}
```

Refactor `render()` in `Game` class.

```js
render() {
  ...
  // Convert winner constant to an object with winner and winningRow
  const { winner, winningRow } = calculateWinner(current.squares)
  ...

  return (
    <div className="game">
      ...
      <div className="game-board">
        <Board
          // Add winningRow to Board
          winningSquares={winningRow}
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}/>
      </div>
      ...
    </div>
  );
}
```

Refactor `handleClick()` function in `Game` class.

```js
handleClick(i) {
  ...
  // calculateWinner() returns an object so change to Object.key
  if (calculateWinner(squares).winner || squares[i]) {
    return;
  }
}
```

Refactor the `calculateWinner()` function to return an object with `winner` and `winningRow`

```js
function calculateWinner(squares) {
  ...
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Convert to object with winner and winningRow
      return { winner: squares[a], winningRow: lines[i] };
    }
  }
  // Return null for both object keys
  return { winner: null, winnerRow: null };
}
```

Refactor the `renderSquare()` function with your winning class.

```js
class Board extends React.Component {
  ...
  renderSquare(i) {
    const winningClass = this.props.winningSquares &&
    (this.props.winningSquares[0] === i ||
      this.props.winningSquares[1] === i ||
      // Note the space before winning !!!
      this.props.winningSquares[2] === i) ? ' winning' : '';

    return (
      <Square
        // Add winningClass to square
        winningClass={winningClass}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }
  ...
}
```

### Game Logic For Draws

Add game logic for draws in the `Game` class.

```js
let status;
if (winner) {
  status = 'Player ' + (!this.state.playerName ? 'One' : 'Two') + ' Wins';
  // If history array is full the game is a tie
} else if (history.length === 10) {
  status = 'Draw';
} else {
  status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + ' (' + (this.state.playerOne ? 'X' : 'O') + ')';
}
```

You should now have a pretty good understanding of the React basics. For further information check out the [official React docs](https://reactjs.org/docs/getting-started.html) for advanced guides, API reference, and more.
