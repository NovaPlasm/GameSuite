/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Multiplayer from './multiplayer';
import Lobby from './lobby';

const routes = [
  {
    path: '/clue/',
    text: 'Online Multiplayer',
    component: Lobby,
  },
  {
    path: '/clue/multiplayer',
    text: 'Test Multiplayer',
    component: Multiplayer,
  }
];

export default { routes };
