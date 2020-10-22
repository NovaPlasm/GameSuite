/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Singleplayer from './singleplayer';
import Multiplayer from './multiplayer';

const routes = [
  {
    path: '/tic-tac-toe/',
    text: 'Singleplayer',
    component: Singleplayer,
  },
  {
    path: '/tic-tac-toe/multiplayer',
    text: 'Local Multiplayer',
    component: Multiplayer,
  }
];

export default { routes };
