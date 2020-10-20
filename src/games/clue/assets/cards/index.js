import Ballroom from './ballroom.png';
import Billiard from './billiard.png';
import Blank from './blank.png';
import Candlestick from './candlestick.png';
import Conservatory from './conservatory.png';
import Dining from './dining.png';
import Green from './green.png';
import Hall from './hall.png';
import Kitchen from './kitchen.png';
import Knife from './knife.png';
import Library from './library.png';
import Lounge from './lounge.png';
import Mustard from './mustard.png';
import Peacock from './peacock.png';
import Pipe from './pipe.png';
import Plum from './plum.png';
import Revolver from './revolver.png';
import Rope from './rope.png';
import Scarlett from './scarlett.png';
import Study from './study.png';
import White from './white.png';
import Wrench from './wrench.png';

const cards = {
  "Ballroom": Ballroom,
  "Billiards": Billiard,
  "Blank": Blank,
  "Candlestick": Candlestick,
  "Conservatory": Conservatory,
  "Dining": Dining,
  "Green": Green,
  "Hall": Hall,
  "Kitchen": Kitchen,
  "Knife": Knife,
  "Library": Library,
  "Lounge": Lounge,
  "Mustard": Mustard,
  "Peacock": Peacock,
  "Pipe": Pipe,
  "Plum": Plum,
  "Revolver": Revolver,
  "Rope": Rope,
  "Scarlett": Scarlett,
  "Study": Study,
  "White": White,
  "Wrench": Wrench
};

const cardTypes = [
  {
    name: "Suspects",
    headers: [
      "Col. Mustard",
      "Prof. Plum",
      "Mr. Green",
      "Mrs. Peacock",
      "Miss Scarlett",
      "Mrs. White"
    ],
    short: [
      "Mustard",
      "Plum",
      "Green",
      "Peacock",
      "Scarlett",
      "White"
    ]
  },
  {
    name: "Weapons",
    headers: [
      "Knife",
      "Candlestick",
      "Revolver",
      "Rope",
      "Lead Pipe",
      "Wrench"
    ],
    short: [
      "Knife",
      "Candlestick",
      "Revolver",
      "Rope",
      "Pipe",
      "Wrench"
    ]
  },
  {
    name: "Rooms",
    headers: [
      "Hall",
      "Lounge",
      "Dining Room",
      "Billiard Room",
      "Kitchen",
      "Ball Room",
      "Conservatory",
      "Library",
      "Study"
    ],
    short: [
      "Hall",
      "Lounge",
      "Dining",
      "Billiards",
      "Kitchen",
      "Ballroom",
      "Conservatory",
      "Library",
      "Study"
    ]
  },
];

export { cards, cardTypes };