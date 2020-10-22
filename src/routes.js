import tic_tac_toe from './games/tic-tac-toe';
import clue from './games/clue';

const routes = [
  {
    name: 'Tic-Tac-Toe',
    routes: tic_tac_toe.routes,
  },
  {
    name: 'Clue',
    routes: clue.routes,
  }
];

export default routes;
