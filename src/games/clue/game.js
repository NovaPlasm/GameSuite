// import { ActivePlayers } from 'boardgame.io/core';
import { doors, rooms, starts, cards, roomLocation, playerLocations, idToCard } from './boardHelpers';

function shuffledCards() {
  let { suspects, weapons, rooms } = cards();
  
  // Shuffle suspects
  for(let i = suspects.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = suspects[i];
    suspects[i] = suspects[j];
    suspects[j] = temp;
  }

  // Shuffle weapons
  for(let i = weapons.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = weapons[i];
    weapons[i] = weapons[j];
    weapons[j] = temp;
  }

  // Shuffle rooms
  for(let i = rooms.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = rooms[i];
    rooms[i] = rooms[j];
    rooms[j] = temp;
  }  

  // Grab solution cards
  const solution = [suspects.pop(), weapons.pop(), rooms.pop()];

  return {
    solution,
    cards: suspects.concat(weapons, rooms)
  };
}

function activeCells(numPlayers) {
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

  for (const [, coords] of Object.entries(doors())) {
    for (let coord of coords) {
      let [i, j] = coord;
      cells[i*25 + j] = null;
    }
  }

  const playerLoc = playerLocations();
  for (let i = 0; i < numPlayers; i++) {
    console.log('player',i)
    cells[playerLoc[i]] = i.toString();
  }

  return cells;
}

function IsVictory(cells) {
  return false;
}

function MakeGuess(G, ctx, suspect, weapon, room) {

  // guard to set nextPlayer to '0' if needed
  const nextPlayer = (ctx.playOrderPos + 1 === ctx.playOrder.length ? 0 : ctx.playOrderPos + 1);

  const guessedCards = [suspect, weapon, room];
  
  ctx.events.setActivePlayers({
    value: {
      [nextPlayer]: {stage: 'chooseOrPass', moveLimit: 1}
    }
  });

  const effectedPlayer = idToCard.indexOf(suspect);

  if (effectedPlayer < ctx.playOrder.length) {
    let cells = [...G.cells];
    let locations = [...G.locations];

    const door = doors()[room][0];
    console.log(door);
    const newLoc = roomLocation(door[0]*25 + door[1], effectedPlayer.toString())

    cells[locations[effectedPlayer]] = null;
    cells[newLoc] = effectedPlayer;
    locations[effectedPlayer] = newLoc;

    return { ...G, cells, locations };
  } else {
    return { ...G, nextPlayer, guessedCards}
  }
}

function ChooseOrPass(G, ctx, card) {
  console.log('chooseorpass');
  const [ suspect, weapon, room ] = G.guessedCards;
  console.log("cards:",suspect, weapon, room);
  console.log("chosen:",card)
  const currentPlayer = G.nextPlayer;
  console.log('currentplayer',currentPlayer,'playeroder',ctx.playOrder.length)
  const nextPlayer = (currentPlayer + 1 === ctx.playOrder.length ? 0 : currentPlayer + 1);
  G.nextPlayer = nextPlayer;

  if (card === "Pass") {
    if (ctx.playOrderPos === nextPlayer) {
      ctx.events.endStage();
      ctx.events.endTurn();
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
    ctx.events.endStage();
    ctx.events.endTurn();
  }
}

function MovePlayer(G, ctx, id, distance) {
  let cells = [...G.cells];
  let locations = [...G.locations];
  let dice = G.dice - distance;

  if (cells[id] === null) {
    cells[locations[ctx.currentPlayer]] = null;

    const doorLocs = Object.keys(rooms());

    if (doorLocs.includes(id.toString())) {
      id = roomLocation(id, ctx.currentPlayer);
    }

    cells[id] = ctx.currentPlayer;
    locations[ctx.currentPlayer] = id;
    return { ...G, cells, locations, dice };
  }
}

const Clue = {
  name: 'clue',

  setup: (ctx) => ({
    cells: activeCells(ctx.numPlayers),
    locations: playerLocations(),
    showedCards: new Array(ctx.numPlayers),
    solutionAndCards: shuffledCards(),
    guessedCards: new Array(3)
  }),

  moves: {
    RollDice: (G, ctx) => ({ ...G, dice: ctx.random.D6() }),
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
};

export default Clue;
