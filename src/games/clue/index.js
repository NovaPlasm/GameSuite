/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Multiplayer from './multiplayer';
import Spectator from './spectator';

const routes = [
  {
    path: '/clue/',
    text: 'Multiplayer',
    component: Multiplayer,
  },
  {
    path: '/clue/spectator',
    text: 'Spectator',
    component: Spectator,
  },
];

export default { routes };
