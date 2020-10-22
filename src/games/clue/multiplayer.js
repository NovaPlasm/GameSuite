/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import Clue from './game';
import Board from './board';

const App = Client({
  game: Clue,
  board: Board,
  debug: false,
  multiplayer: Local(),
});

const Multiplayer = () => (
  <div>
    <h1>Multiplayer</h1>
    <App matchID="multi" playerID="0" />
  </div>
);

export default Multiplayer;
