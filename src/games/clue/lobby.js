import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { default as BoardClue } from './board';
import { default as GameClue } from './game';
import './lobby.css';

GameClue.minPlayers = 3;
GameClue.maxPlayers = 6;

const hostname = window.location.hostname;
const importedGames = [
  { game: GameClue, board: BoardClue },
];

const LobbyView = () => (
  <div>
    <Lobby
      gameServer={`http://${hostname}:8000`}
      lobbyServer={`http://${hostname}:8000`}
      gameComponents={importedGames}
    />
  </div>
);

export default LobbyView;
