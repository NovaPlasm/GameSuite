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

function rooms() {
  return {
    479: "Conservatory",
    483: "Ballroom",
    434: "Ballroom",
    439: "Ballroom",
    490: "Ballroom",
    469: "Kitchen",
    316: "Dining",
    242: "Dining",
    380: "Billiards",
    301: "Billiards",
    253: "Library",
    206: "Library",
    81: "Study",
    109: "Hall",
    161: "Hall",
    162: "Hall",
    142: "Lounge"
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

function cards() {
  return {
    suspects: ["Green", "Mustard", "Peacock", "Plum", "Scarlett", "White"],
    weapons: ["Candlestick", "Knife", "Pipe", "Revolver", "Rope", "Wrench"],
    rooms: ["Ballroom", "Billiard", "Conservatory", "Dining", "Hall", "Kitchen", "Library", "Lounge", "Study"]
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
  }

  if (playerID < 3) {
    playerLoc += parseInt(playerID);
  } else {
    playerLoc += 25 + parseInt(playerID);
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

export { doors, rooms, starts, cards, roomLocation, playerLocations, idToCard };