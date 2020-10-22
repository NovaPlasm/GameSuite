function doors() {
  return {
    "Conservatory": [[19,4],[5,23]],
    "Ballroom": [[19,8], [17,9], [17,14], [19,15]],
    "Kitchen": [[18,19],[3,0]],
    "Dining": [[12,16],[9,17]],
    "Billiards": [[15,5],[12,1]],
    "Library": [[10,3],[8,6]],
    "Study": [[3,6],[23,18]],
    "Hall": [[4,9],[6,11],[6,12]],
    "Lounge": [[5,17],[19,1]]
  };
}

function rooms() {
  return {
    479: "Conservatory",
    148: "Conservatory",
    483: "Ballroom",
    434: "Ballroom",
    439: "Ballroom",
    490: "Ballroom",
    469: "Kitchen",
    75:  "Kitchen",
    316: "Dining",
    242: "Dining",
    380: "Billiards",
    301: "Billiards",
    253: "Library",
    206: "Library",
    81:  "Study",
    593: "Study",
    109: "Hall",
    161: "Hall",
    162: "Hall",
    142: "Lounge",
    476: "Lounge"
  };
}

function diagonals() {
  return {
    "Study": 75,
    "Lounge": 148,
    "Conservatory": 476,
    "Kitchen": 593
  }
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

function cards() {
  return {
    suspects: ["Green", "Mustard", "Peacock", "Plum", "Scarlett", "White"],
    weapons: ["Candlestick", "Knife", "Pipe", "Revolver", "Rope", "Wrench"],
    rooms: ["Ballroom", "Billiards", "Conservatory", "Dining", "Hall", "Kitchen", "Library", "Lounge", "Study"]
  }
}

function roomLocation(door, playerID) {
  // Study - 1,2/2,4
  // Library - 7,2/8,4
  // Billiards - 14,1/15,3
  // Conservatory - 21,2/22,4
  // Ballroom - 20,11/21,13
  // Kitchen - 21,20/22,22
  // Dining - 11,19/12,21
  // Lounge - 2,19/3,21
  // Hall - 2,10/3,12

  let playerLoc = 0;

  const roomsObj = rooms();

  if (!(door in roomsObj)) {
    return "Not door";
  }

  switch (roomsObj[door]) {
    case "Study": playerLoc = (1*25 + 2); break;
    case "Library": playerLoc = (7*25 + 2); break;
    case "Billiards": playerLoc = (14*25 + 1); break;
    case "Conservatory": playerLoc = (21*25 + 2); break;
    case "Ballroom": playerLoc = (20*25 + 11); break;
    case "Kitchen": playerLoc = (21*25 + 20); break;
    case "Dining": playerLoc = (11*25 + 19); break;
    case "Lounge": playerLoc = (2*25 + 19); break;
    case "Hall": playerLoc = (2*25 + 10); break;
    default: playerLoc = 0;
  }

  if (playerID < 3) {
    playerLoc += parseInt(playerID);
  } else {
    playerLoc += 24 + parseInt(playerID);
  }

  return playerLoc;
}

function playerLocations() {
  let locations = new Array(6);
  let i = 0;
  let startLocations = starts();
  for (const value in startLocations) {
    locations[i] = startLocations[value][0]*25 + startLocations[value][1];
    i += 1;
  }

  return locations;
}

const idToCard = [
  "Mustard",
  "Plum",
  "Green",
  "Peacock",
  "Scarlett",
  "White"
];

function inRoom(currLoc, playerID) {
  if (playerID < 3) {
    currLoc -= parseInt(playerID);
  } else {
    currLoc -= (25 + parseInt(playerID));
  }

  switch (currLoc) {
    case (1*25 + 2): return "Study";
    case (7*25 + 2): return "Library";
    case (14*25 + 1): return "Billiards";
    case (21*25 + 2): return "Conservatory";
    case (20*25 + 11): return "Ballroom";
    case (21*25 + 20): return "Kitchen";
    case (11*25 + 19): return "Dining";
    case (2*25 + 19): return "Lounge";
    case (2*25 + 10): return "Hall";
    default: return "No";
  }
}

export { doors, rooms, starts, cards, roomLocation, playerLocations, idToCard, inRoom, diagonals };