/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Server } from 'boardgame.io/server';
import TicTacToe from './src/games/tic-tac-toe/game';
import Clue from './src/games/clue/game';

const PORT = process.env.PORT || 5000;
const server = Server({ games: [TicTacToe, Clue] });
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
