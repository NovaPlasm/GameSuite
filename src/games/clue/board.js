/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BoardBackground from './assets/board2.png';
import MissScarlett from './assets/MissScarlett.png';
import cards from './assets/cards';
const pieces = [MissScarlett];

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };

  onClick = id => {
    if (this.isActive(id)) {
      this.props.moves.MovePlayer(id);
    }
  };

  isActive(id) {
    return this.props.isActive && this.props.G.cells[id] === null;
  }

  playerCards() {
    let ret = [];
    ret.push(<span><img src={cards["Ballroom"]} /></span>);
    ret.push(<span><img src={cards["Conservatory"]} /></span>)
    ret.push(<span><img src={cards["Study"]} /></span>)
    ret.push(<span><img src={cards["Knife"]} /></span>)
    ret.push(<span><img src={cards["White"]} /></span>)

    return ret;
  }

  cheatSheet() {
    let tbody = [<h3>Players</h3>];
    const titles = [
      {
        name: "Suspects",
        headers: [
          "Col. Mustard",
          "Prof. Plum",
          "Mr. Green",
          "Mrs. Peacock",
          "Miss Scarlett",
          "Mrs. White"
        ]
      },
      {
        name: "Weapons",
        headers: [
          "Knife",
          "Candlestick",
          "Revolver",
          "Rope",
          "Lead Pipe",
          "Wrench"
        ]
      },
      {
        name: "Rooms",
        headers: [
          "Hall",
          "Lounge",
          "Dining Room",
          "Kitchen",
          "Ball Room",
          "Conservatory",
          "Library",
          "Study"
        ]
      },
    ];
    tbody.push(<tr><th></th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>);
    for (let section of titles) {
      tbody.push(<h3>{section.name}</h3>);
      let rows = [];
      for (let cell of section.headers){
        let cells = [];
        cells.push(<th>{cell}</th>);
        for (let i = 0; i < 6; i++) cells.push(<td key={i}><input /></td>);
        rows.push(<tr key={cell}>{cells}</tr>);
      }
      tbody.push(rows);
    }

    return tbody;
  }

  render() {
    let tbody = [];
    for (let i = 0; i < 25; i++) {
      let cells = [];
      for (let j = 0; j < 24; j++) {
        const id = 25 * i + j;
        cells.push(
          <td
            key={id}
            className={this.isActive(id) ? `active` : ''}
            style={this.props.G.cells[id] ? {
              backgroundImage: `url(${pieces[this.props.G.cells[id]]})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            } : null}
            onClick={() => this.onClick(id)}
          >
            
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    let disconnected = null;
    if (this.props.isMultiplayer && !this.props.isConnected) {
      disconnected = <div>Disconnected!</div>;
    }

    let winner = null;
    if (this.props.ctx.gameover) {
      console.log(this.props.ctx.gameover.winner)
    }

    let player = null;
    if (this.props.playerID) {
      player = <div id="player">Player: {this.props.playerID}</div>;
    }

    if (this.props.isPreview) {
      disconnected = player = null;
    }

    return (
      <GameContainer>
        <Players>
          <div>
            <h3>Player 1</h3>
            <span><img src={cards["Mustard"]} /></span>
          </div>
          <div>
            <h3>Player 2's turn</h3>
            <span><img src={cards["Plum"]} /></span>
          </div>
          <div>
            <h3>Player 3</h3>
            <span><img src={cards["Green"]} /></span>
          </div>
          <div>
            <h3>Player 4</h3>
            <span><img src={cards["Peacock"]} /></span>
          </div>
          <div>
            <h3>Player 5</h3>
            <span><img src={cards["Scarlett"]} /></span>
          </div>
          <div>
            <h3>Player 6</h3>
            <span><img src={cards["White"]} /></span>
          </div>
        </Players>
        <Div>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table>
        </Div>
        <Sheet>
          <table>
            <tbody>{this.cheatSheet()}</tbody>
          </table>
        </Sheet>
        <Cards>
          {this.playerCards()}
        </Cards>
      </GameContainer>
    );
  }
}

const GameContainer = styled.section`
  display: grid;
  grid-template-columns: 275px 950px 1fr;
  grid-gap: 10px 20px;
  margin-left: auto;
  margin-right: auto;
  width: 1650px;
`;

const Players = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(204, 204, 204, 0.5);
  padding: 10px 15px;
  position: relative;

  div {
    display: grid;
    grid-template-columns: 1fr 93px;
    height: 145px;
    margin-bottom: 10px;
    
    h3 {
      margin-top: 0;
    }

    img {
      position: absolute;
      width: 93px;
      right: 0;
      transition: width 0.6s ease-in-out, right 0.6s ease-in-out;
    }

    span:hover {
      img {
        position: absolute;
        width: 200px;
        right: -250px;
        z-index: 2;
      }
    }
  }
`;

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(204, 204, 204, 0.5);
  padding: 0 20px;
  height: 950px;
  overflow-y: scroll;

  h3 {
    margin-left: 5px;
    margin-bottom: 0px;
  }

  th {
    width: 80px;
    text-align: left;
  }

  td {
    width: 49px;
    height: 43px;
    border: none;
    background: none;

    input {
      width: 30px;
      height: 30px;
      font-size: 20px;
    }
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  grid-column-end: span 3;
  justify-content: center;
  position: relative;

  img {
    width: 125px;
    transition: width 0.6s ease-in-out, top 0.6s ease-in-out;
    top: 0;
    position: absolute;
  }

  span {
    width: 125px;
    margin: 0 10px;

    &:hover {
      img {
        position: absolute;
        width: 200px;
        top: -300px;
        z-index: 2;
      }
    }
  }
`;

const Div = styled.div`
  background-image: url(${BoardBackground});
  background-size: cover;
  width: 900px;
  height: 900px;
  padding-top: 38px;
  padding-left: 48px;

  td {
    background: none;
    width: 35.5px;
    height: 34.9px;
    border: 3px solid rgba(0, 0, 0, 0);
    line-height: 0px;
    font-size: 10px;
    box-sizing: border-box;
    background: transparent;


    &.active:hover {
      background-color: rgba(238, 255, 255, 0.3);
    }
  }
`;

export default Board;
