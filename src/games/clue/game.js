import { ActivePlayers } from 'boardgame.io/core';

function doors() {
  return {
    "Conservatory": [[19,4]],
    "Ballroom": [[19,8], [17,9], [17,14], [19,15]],
    "Kitchen": [[18,19]],
    "Dining Room": [[12,16],[9,17]],
    "Billiard Room": [[15,5],[12,1]],
    "Library": [[10,3],[8,6]],
    "Study": [[3,6]],
    "Hall": [[4,9],[6,11],[6,12]],
    "Lounge": [[5,17]]
  };
}

function starts() {
  return {
    "Prof. Plum": [5,0],
    "Mrs. Peacock": [18,0],
    "Mr. Green": [24,9],
    "Mrs. White": [24,14],
    "Col. Mustard": [7,23],
    "Miss. Scarlett": [0,16]
  }
}

function activeCells() {
  let cells = new Array(25).fill("");

  // for (let i = 0; i < 25; i++) {
  //   for (let j = 0; j < 25; j++) {
  //     cells[i*25 + j] = `${i},${j}`;
  //   }
  // }

  for (let i = 4; i <= 5; i++) for (let j = 1; j <= 5; j++) cells[i*25 + j] = null;
  for (let j = 1; j <= 6; j++) cells[11*25 + j] = null;
  for (let i = 17; i <= 18; i++) for (let j = 1; j <= 4; j++) cells[i*25 + j] = null;
  for (let i = 17; i <= 19; i++) cells[i*25 + 5] = null;
  for (let i = 4; i <= 6; i++) cells[i*25 + 6] = null;
  for (let i = 17; i <= 18; i++) for (let j = 1; j <= 5; j++) cells[i*25 + j] = null;
  for (let i = 10; i <= 22; i++) cells[i*25 + 6] = null;
  for (let i = 0; i <= 23; i++) cells[i*25 + 7] = null;
  for (let i = 1; i <= 16; i++) cells[i*25 + 8] = null;
  for (let j = 9; j <= 13; j++) cells[7*25 + j] = null;
  for (let i = 15; i <= 16; i++) for (let j = 9; j <= 13; j++) cells[i*25 + j] = null;
  for (let i = 7; i <= 16; i++) cells[i*25 + 14] = null;
  for (let i = 1; i <= 16; i++) cells[i*25 + 15] = null;
  for (let i = 0; i <= 8; i++) cells[i*25 + 16] = null;
  for (let i = 15; i <= 23; i++) cells[i*25 + 16] = null;
  for (let j = 17; j <= 18; j++) cells[15*25 + j] = null;
  for (let i = 6; i <= 8; i++) for (let j = 17; j <= 22; j++) cells[i*25 + j] = null;
  for (let i = 16; i <= 22; i++) cells[i*25 + 17] = null;
  for (let i = 16; i <= 17; i++) for (let j = 18; j <= 22; j++) cells[i*25 + j] = null;
  cells[5*25 + 0] = cells[18*25 + 0] = cells[23*25 + 8] = cells[23*25 + 9] = null;
  cells[24*25 + 9] = cells[23*25 + 14] = cells[23*25 + 15] = cells[24*25 + 14] = null;
  cells[7*25 + 23] = cells[17*25 + 23] = null;

  for (const [_, coords] of Object.entries(doors())) {
    for (let coord of coords) {
      let [i, j] = coord;
      cells[i*25 + j] = null;
    }
  }

  return cells;
}

function playerLocations() {
  let locations = new Array(6);
  let i = 0;
  starts = starts();
  for (const value in starts) {
    locations[i] = starts[value][0]*25 + starts[value][1];
    i += 1;
  }

  return locations;
}

function IsVictory(cells) {
  return false;
}

function ClickCell(G, ctx, id) {
  const cells = [...G.cells];

  if (cells[id] === null) {
    cells[id] = ctx.currentPlayer;
    return { ...G, cells };
  }
}

function MakeGuess(G, ctx) {
  // guard to set nextPlayer to '0' if needed
  const nextPlayer = (ctx.playOrderPos === ctx.playOrder.length ? 0 : ctx.playOrderPos + 1);
  G.nextPlayer = nextPlayer;

  ctx.events.setActivePlayers({
    value: {
      [nextPlayer]: {stage: 'chooseOrPass', moveLimit: 1}
    }
  });
}

function ChooseOrPass(G, ctx) {
  let card = prompt("Card index? Or -1");

  console.log(card)
  const currentPlayer = G.nextPlayer;
  const nextPlayer = (currentPlayer + 1 === ctx.playOrder.length ? 0 : currentPlayer + 1);
  G.nextPlayer = nextPlayer;

  if (card === "-1") {
    // console.log(ctx.playOrderPos, nextPlayer);
    if (ctx.playOrderPos == nextPlayer) {
      ctx.events.endStage();
      // ctx.events.setActivePlayers({
      //   value: {
      //     [G.originalPlayer.toString()]: {stage: 'chooseOrPass', moveLimit: 1}
      //   }
      // });
      return;
    }
    ctx.events.endStage();
    
    ctx.events.setActivePlayers({
      value: {
        [nextPlayer]: {stage: 'chooseOrPass', moveLimit: 1}
      }
    });
  } else {
    G.showedCards[ctx.playOrderPos] = {[currentPlayer]: card};
  }
}

function MovePlayer(G, ctx, id) {
  const cells = [...G.cells];
  let locations = [...G.locations];

  if (cells[id] === null) {
    cells[locations[ctx.currentPlayer]] = null;
    cells[id] = ctx.currentPlayer;
    locations[ctx.currentPlayer] = id;
    return { ...G, cells, locations };
  }
}


const Clue = {
  name: 'clue',

  setup: () => ({
    cells: activeCells(),
    locations: playerLocations(),
    showedCards: new Array(6)
  }),

  moves: {
    // RollDice,
    MovePlayer,
    MakeGuess,
    // MakeAccusation
  },

  turn: {
    stages: {
      chooseOrPass: {
        moves: { ChooseOrPass },
      },
    },
  },

  events: {
    endPhase: false,
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (G.cells.filter(c => c === null).length === 0) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: G => {
      let r = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          r.push({ move: 'clickCell', args: [i] });
        }
      }
      return r;
    },
  },
};

export default Clue;
