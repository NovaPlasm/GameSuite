import tic_tac_toe from './games/tic-tac-toe';
import clue from './games/clue';
import secret_state from './secret-state';
import random from './random';
import threejs from './threejs';
import lobby from './lobby';
import simulator from './simulator';
import redacted_move from './redacted-move';
import undo from './undo';

const routes = [
  {
    name: 'Tic-Tac-Toe',
    routes: tic_tac_toe.routes,
  },
  {
    name: 'Clue',
    routes: clue.routes,
  },
  {
    name: 'Turn Orders',
    routes: simulator.routes,
  },
  {
    name: 'Random API',
    routes: random.routes,
  },
  {
    name: 'Secret State',
    routes: secret_state.routes,
  },
  {
    name: 'Redacted Move',
    routes: redacted_move.routes,
  },
  {
    name: 'Undo',
    routes: undo.routes,
  },
  {
    name: 'Other Frameworks',
    routes: threejs.routes,
  },
  {
    name: 'Lobby',
    routes: lobby.routes,
  },
];

export default routes;
