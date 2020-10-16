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
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    let player = null;
    if (this.props.playerID) {
      player = <div id="player">Player: {this.props.playerID}</div>;
    }

    if (this.props.isPreview) {
      disconnected = player = null;
    }

    return (
      <Div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {player}
        {winner}
        {disconnected}
      </Div>
    );
  }
}

const Div = styled.div`
  background-image: url(${BoardBackground});
  background-size: cover;
  width: 900px;
  height: 900px;
  padding-top: 38px;
  padding-left: 48px;

  td {
    background: none;
    width: 30.5px;
    height: 29.8px;
    border: 3px solid rgba(0, 0, 0, 0);
    line-height: 0px;
    font-size: 10px;

    &.active:hover {
      background-color: rgba(238, 255, 255, 0.3);
    }
  }
`;

export default Board;
