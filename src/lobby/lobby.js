import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as BoardTicTacToe } from '../games/tic-tac-toe/board';
import { default as BoardClue } from '../games/clue/board';
import { default as GameTicTacToe } from '../games/tic-tac-toe/game';
import { default as GameClue } from '../games/clue/game';
import './lobby.css';

GameTicTacToe.minPlayers = 1;
GameTicTacToe.maxPlayers = 2;
GameClue.minPlayers = 3;
GameClue.maxPlayers = 6;

const hostname = window.location.hostname;
const importedGames = [
  { game: GameTicTacToe, board: BoardTicTacToe },
  { game: GameClue, board: BoardClue },
];

const LobbyView = () => (
  <div style={{ padding: 50 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer={`http://${hostname}:8000`}
      lobbyServer={`http://${hostname}:8000`}
      gameComponents={importedGames}
    />
  </div>
);

export default LobbyView;
