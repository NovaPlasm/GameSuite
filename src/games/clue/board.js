/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { roomLocation, doors, idToCard } from './boardHelpers';
import BoardBackground from './assets/board2.png';
import { Mustard, Plum, Green, Peacock, Scarlett, White } from './assets/pieces';
import { cards, cardTypes} from './assets/cards';
const pieces = [Mustard, Plum, Green, Peacock, Scarlett, White];

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    console.log("player id",props.playerID);
    
    this.state = { notifiedTurn: false, rolled: false, showGuessModal: false, showChooseModal: false };
  }

  onClick = id => {
    if (this.isActive(id)) {
      const currLoc = this.props.G.locations[this.props.ctx.playOrderPos];
      const x1 = Math.floor(currLoc/25);
      const y1 = Math.floor(currLoc - x1*25);
      const x2 = Math.floor(id/25);
      const y2 = Math.floor(id - x2*25);

      const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);

      this.props.moves.MovePlayer(id, distance);
    }
  };

  isActive(id) {
    const currLoc = this.props.G.locations[this.props.ctx.playOrderPos];

    // TODO: Move radius from doors
    let roomLoc = roomLocation(id, this.props.playerID);

    const x1 = Math.floor(currLoc/25);
    const y1 = Math.floor(currLoc - x1*25);
    const x2 = Math.floor(id/25);
    const y2 = Math.floor(id - x2*25);

    const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    return this.props.isActive && this.props.G.cells[id] === null && this.props.G.dice >= distance;
    
  }

  playerCards() {
    let ret = [];
    let gameCards = this.props.G.solutionAndCards.cards
    for (let i = 0; i < gameCards.length; i++) {
      if ((i % this.props.ctx.numPlayers).toString() === this.props.playerID) {
        ret.push(<span><img alt={gameCards[i]} src={cards[gameCards[i]]} /></span>);
      }
    }

    return ret;
  }

  cheatSheet() {
    let tbody = [<tr><th className="header">Players</th></tr>];
    const titles = cardTypes;
    tbody.push(<tr><th></th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>);
    for (let section of titles) {
      tbody.push(<tr><th className="header">{section.name}</th></tr>);
      let rows = [];
      for (let cell of section.headers){
        let cells = [];
        cells.push(<th>{cell}</th>);
        for (let i = 0; i < 6; i++) cells.push(<td key={i}><input /></td>);
        rows.push(<tr key={cell}>{cells}</tr>);
      }
      tbody.push(rows);
    }

    return tbody;
  }

  showPlayers() {
    let players = [];

    // const { matchData } = this.props; //-- for lobby

    const matchData = [{name: "Beau"}, {name: "Bob"}];

    const cardFromId = idToCard;

    for (let i = 0; i < this.props.ctx.numPlayers; i++) {
      players.push(
        <div key={i}>
          <span className="btnContainer">
            <h3>{matchData[i].name}{i.toString() === this.props.ctx.currentPlayer ? "'s turn" : ""}</h3>
            {
              i.toString() === this.props.playerID ? (
                <>
                  <Button disabled={i.toString() !== this.props.ctx.currentPlayer} onClick={() => this.setGuessModalShow(true)}>Guess</Button>
                  <Button disabled={i.toString() !== this.props.ctx.currentPlayer}>Accusation</Button>
                </>
              ) : null
            }
          </span>
          <span className="imgContainer">
            <img alt={cardFromId[i]} src={cards[cardFromId[i]]} />
          </span>
        </div>
      );
    }

    return players;
  }

  setModalShow(show) {
    this.setState({showModal: show});
  }

  onDiceRoll() {
    this.props.moves.RollDice();
    this.setState({rolled: true});
  }

  setGuessModalShow(show) {
    this.setState({showGuessModal: show});
  }

  onGuessChosen(suspect, weapon, room) {
    this.setGuessModalShow(false);
    this.props.moves.MakeGuess(suspect, weapon, room);
  }

  setChooseModalShow(show) {
    this.setState({showChooseModal: show});
  }

  onCardChosen(card) {
    this.setChooseModalShow(false);
    this.props.moves.ChooseOrPass(card);
  }

  render() {
    console.log(this.props);

    if (!this.state.notifiedTurn && this.props.playerID === this.props.ctx.currentPlayer) {
      this.setModalShow(true);
      this.setState({notifiedTurn: true});
    } else if (this.props.playerID !== this.props.ctx.currentPlayer && this.state.notifiedTurn) this.setState({ notifiedTurn: false, rolled: false});

    if (!this.state.showChooseModal && this.props.ctx.activePlayers && this.props.ctx.activePlayers[this.props.playerID] === "chooseOrPass") this.setChooseModalShow(true);

    let tbody = [];
    for (let i = 0; i < 25; i++) {
      let cells = [];
      for (let j = 0; j < 24; j++) {
        const id = 25 * i + j;
        cells.push(
          <td
            key={id}
            className={this.isActive(id) ? `active` : ''}
            style={this.props.G.cells[id] ? {
              backgroundImage: `url(${pieces[this.props.G.cells[id]]})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            } : null}
            onClick={() => this.onClick(id)}
          >
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    
    if (this.props.isMultiplayer && !this.props.isConnected) {
      console.log('Disconnected!');
    }

    if (this.props.ctx.gameover) {
      console.log(this.props.ctx.gameover.winner)
    }

    return (
      <>
        <GameContainer>
          <Players>
            { this.showPlayers() }
          </Players>
          <Div>
            <table id="board">
              <tbody>{tbody}</tbody>
            </table>
          </Div>
          <Sheet>
            <table>
              <tbody>{ this.cheatSheet() }</tbody>
            </table>
          </Sheet>
          <Cards>
            { this.playerCards() }
          </Cards>
        </GameContainer>
        <BeginTurnPopup
          show={this.state.showModal}
          rolled={this.state.rolled}
          diceVal={this.props.G.dice}
          onRoll={() => this.onDiceRoll()}
          onHide={() => this.setModalShow(false)}
        />
        <GuessPopup
          show={this.state.showGuessModal}
          onHide={(suspect, weapon, room) => this.onGuessChosen(suspect, weapon, room)}
        />
        <ChooseOrPassPopup
          show={this.state.showChooseModal}
          guessedCards={this.props.G.guessedCards}
          onHide={(card) => this.onCardChosen(card)}
        />
      </>
    );
  }
}

function BeginTurnPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          It's your turn!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.rolled ? (
            <p>
              You rolled a {props.diceVal}!  Go ahead and move where you want on the board.
            </p>
          ) : (
            <p>
              Roll your dice if you want to move, or you can go straight to making a guess!
            </p>
          )
        }
        
      </Modal.Body>
      <Modal.Footer>
        { props.rolled ? null : <Button onClick={props.onRoll}>Roll Dice</Button> }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class GuessPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chosenSuspect: "Blank", chosenWeapon: "Blank", chosenRoom: "Blank",
      expandSuspect: false, expandWeapon: false, expandRoom: false
    };
  }

  displaySuspects() {
    let ret = []
    const suspects = cardTypes[0].short;

    if (this.state.expandSuspect) {
      for (let suspect of suspects) {
        ret.push(<span><img className="enableHover" onClick={() => this.setState({chosenSuspect: suspect, expandSuspect: false})} alt={suspect} src={cards[suspect]} /></span>);
      }
    } else {
      ret.push(<span><img onClick={() => this.setState({expandSuspect: true, expandWeapon: false, expandRoom: false})} alt={this.state.chosenSuspect} src={cards[this.state.chosenSuspect]} /></span>);
    }

    return ret;
  }

  displayWeapons() {
    let ret = []
    const weapons = cardTypes[1].short;

    if (this.state.expandWeapon) {
      for (let weapon of weapons) {
        ret.push(<span><img className="enableHover" onClick={() => this.setState({chosenWeapon: weapon, expandWeapon: false})} alt={weapon} src={cards[weapon]} /></span>);
      }
    } else {
      ret.push(<span><img onClick={() => this.setState({expandSuspect: false, expandWeapon: true, expandRoom: false})} alt={this.state.chosenWeapon} src={cards[this.state.chosenWeapon]} /></span>);
    }

    return ret;
  }

  displayRooms() {
    let ret = []
    const rooms = cardTypes[2].short;

    if (this.state.expandRoom) {
      for (let room of rooms) {
        ret.push(<span><img className="enableHover" onClick={() => this.setState({chosenRoom: room, expandRoom: false})} alt={room} src={cards[room]} /></span>);
      }
    } else {
      ret.push(<span><img onClick={() => this.setState({expandSuspect: false, expandWeapon: false, expandRoom: true})} alt={this.state.chosenRoom} src={cards[this.state.chosenRoom]} /></span>);
    }

    return ret;
  }

  buttonClicked(chosenSuspect, chosenWeapon, chosenRoom) {
    this.props.onHide(chosenSuspect, chosenWeapon, chosenRoom);
    this.setState({
      chosenSuspect: "Blank", chosenWeapon: "Blank", chosenRoom: "Blank",
      expandSuspect: false, expandWeapon: false, expandRoom: false
    });
  }

  render() {
    const { chosenSuspect, chosenWeapon, chosenRoom } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Make a guess!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChooseCard>
            <h4>Suspects</h4>
            <span className="row">{ this.displaySuspects () }</span>
            <h4>Weapons</h4>
            <span className="row">{ this.displayWeapons () }</span>
            <h4>Rooms</h4>
            <span className="row">{ this.displayRooms () }</span>
          </ChooseCard>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={ !(chosenSuspect !== "Blank" && chosenWeapon !== "Blank" && chosenRoom !== "Blank") }
            onClick={ () => this.buttonClicked(chosenSuspect, chosenWeapon, chosenRoom) }
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class ChooseOrPassPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chosenCard: null
    };
  }

  displayCards() {
    let ret = []
    const guessedCards = this.props.guessedCards;

    for (let card of guessedCards) {
      ret.push(<span><img className={`enableHover ${this.state.chosenCard === card ? 'chosen' : null}`} onClick={() => this.setState({chosenCard: card})} alt={card} src={cards[card]} /></span>);
    }

    return ret;
  }

  buttonClicked(card) {
    this.props.onHide(card);
    this.setState({chosenCard: null});
  }

  render() {
    const { chosenCard } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Do you have any of these cards?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChooseCard>
            <h4>Choose one or pass!</h4>
            <span className="row chosen">{ this.displayCards () }</span>
          </ChooseCard>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={ !(chosenCard) }
            onClick={ () => this.buttonClicked(chosenCard) }
          >
            Confirm
          </Button>
          <Button
            onClick={ () => this.buttonClicked("Pass") }
          >
            I don't have any!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const ChooseCard = styled.section`
  display: grid;
  grid-template-rows: 30px 1fr 30px 1fr 30px 1fr;

  h4 {
    font-size: 20px;
  }

  .row {
    position: relative;
    margin-bottom: 10px;
    margin-left: 0;

    &.chosen {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin-top: 20px;
    }

    span {
      width: 80px;
      height: 125px;
      margin: 0 5px;

      img {
        width: 80px;
        transition: width 0.6s ease-in-out, top 0.6s ease-in-out, box-shadow 0.6s ease-in-out;
        top: 0;
        position: initial;

        &.chosen {
          box-shadow: 0px 0px 10px 10px rgba(251,255,0,0.54);
        }
      }

      &:hover {
        .enableHover {
          position: absolute;
          width: 200px;
          top: -150px;
          z-index: 2;

          &.chosen {
            box-shadow: 0px 0px 20px 20px rgba(251,255,0,0.54);
          }
        }
      }
    }
  }
`;

const GameContainer = styled.section`
  display: grid;
  grid-template-columns: 275px 950px 1fr;
  grid-gap: 10px 20px;
  margin-left: auto;
  margin-right: auto;
  width: 1650px;
`;

const Players = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(204, 204, 204, 0.5);
  padding: 10px 15px;
  position: relative;

  div {
    display: grid;
    grid-template-columns: 1fr 93px;
    height: 145px;
    margin-bottom: 10px;
    
    h3 {
      margin-top: 0;
    }

    img {
      position: absolute;
      width: 93px;
      right: 15px;
      transition: width 0.6s ease-in-out, right 0.6s ease-in-out;
    }

    .btnContainer {
      button {
        margin-top: 10px;
      }
    }

    .imgContainer:hover {
      img {
        position: absolute;
        width: 200px;
        right: -250px;
        z-index: 2;
      }
    }
  }
`;

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(204, 204, 204, 0.5);
  padding: 0 20px;
  height: 950px;
  overflow-y: scroll;

  .header {
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 0px;
    padding-top: 15px;
  }

  th {
    width: 80px;
    text-align: left;
  }

  td {
    width: 49px;
    height: 43px;
    border: none;
    background: none;

    input {
      width: 30px;
      height: 30px;
      font-size: 20px;
    }
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  grid-column-end: span 3;
  justify-content: center;
  position: relative;

  img {
    width: 125px;
    transition: width 0.6s ease-in-out, top 0.6s ease-in-out;
    top: 0;
    position: absolute;
  }

  span {
    width: 125px;
    height: 194px;
    margin: 0 10px;

    &:hover {
      img {
        position: absolute;
        width: 200px;
        top: -300px;
        z-index: 2;
      }
    }
  }
`;

const Div = styled.div`
  background-image: url(${BoardBackground});
  background-size: cover;
  width: 900px;
  height: 900px;
  padding-top: 38px;
  padding-left: 48px;

  td {
    background: none;
    width: 35.5px;
    height: 34.9px;
    border: 3px solid rgba(0, 0, 0, 0);
    line-height: 0px;
    font-size: 10px;
    box-sizing: border-box;
    background: transparent;


    &.active {
      background-color: rgba(87, 173, 104, 0.3);
      &:hover {
        background-color: rgba(238, 255, 255, 0.3);
      }
    }
  }
`;

export default Board;
