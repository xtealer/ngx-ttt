import { Component, OnInit } from '@angular/core';

interface Player {
  name: string;
  gamesPlayed: number;
  token: string;
  wonGames: number;
}

interface Game {
  moves: number;
  tableItems: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
  };
  currentPlayer: string;
  players: {
    o: Player;
    x: Player;
  };
  playerWon: boolean;
  draw: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor() {}

  // available players
  playerToken = ['o', 'x'];
  // game data
  game: Game = {
    moves: 0,
    tableItems: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    },
    currentPlayer: '',
    players: {
      o: {
        name: 'none',
        gamesPlayed: 0,
        token: 'O',
        wonGames: 0
      },
      x: {
        name: 'none',
        gamesPlayed: 0,
        token: 'X',
        wonGames: 0
      }
    },
    playerWon: false,
    draw: false
  };

  status = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    disabled: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    }
  };
  playerName = '';

  startGame(player: string): void {
    this.game.currentPlayer = player;
  }

  incompletePlayers(): boolean {
    return (
      this.game.players.x.name === 'none' || this.game.players.o.name === 'none'
    );
  }

  playerIs(): string {
    return this.game.currentPlayer === 'x' ? 'o' : 'x';
  }

  storeName(): void {
    this.game.players[
      this.game.currentPlayer
    ].name = this.playerName.toUpperCase();
    this.playerName = '';
    this.game.currentPlayer = this.playerIs();
  }

  restartGame(): void {
    for (const key in this.game.tableItems) {
      if (this.game.tableItems[key] !== '') {
        this.game.tableItems[key] = '';
        this.status.disabled[key] = false;
      }
    }
    // tslint:disable-next-line: forin
    for (const player in this.game.players) {
      this.game.players[player].gamesPlayed++;
    }
    // resets any triggered game states
    if (this.game.playerWon) {
      this.game.playerWon = false;
    } else if (this.game.draw) {
      this.game.draw = false;
    }
    // restarts game moves counter
    this.game.moves = 0;
  }

  // check game status
  checkGame(token: string): boolean {
    // horizontals
    for (let i = 0; i < 9; i += 3) {
      if (
        token === this.game.tableItems[i + 1] &&
        token === this.game.tableItems[i + 2] &&
        token === this.game.tableItems[i + 3]
      ) {
        return true;
      }
    }
    // verticals
    for (let i = 0; i < 3; i++) {
      if (
        token === this.game.tableItems[i + 1] &&
        token === this.game.tableItems[i + 4] &&
        token === this.game.tableItems[i + 7]
      ) {
        return true;
      }
    }
    // diagonal left-up
    if (
      token === this.game.tableItems[1] &&
      token === this.game.tableItems[5] &&
      token === this.game.tableItems[9]
    ) {
      return true;
    }
    // diagonal left-down
    if (
      token === this.game.tableItems[3] &&
      token === this.game.tableItems[5] &&
      token === this.game.tableItems[7]
    ) {
      return true;
    }
    // winner combination has not been found
    return false;
  }

  hasWon(): boolean {
    if (this.checkGame(this.game.currentPlayer.toUpperCase())) {
      this.game.players[this.game.currentPlayer].wonGames++;
      this.game.playerWon = true;
      console.log('player has won');
      return true;
    } else if (this.game.moves > 8) {
      this.game.draw = true;
      console.log('Game Over!');
    }
    return false;
  }

  playerChoice(position: number): void {
    if (!this.status.disabled[position] && !this.game.playerWon) {
      this.status.disabled[position] = true;
      this.game.tableItems[position] = this.game.players[
        this.game.currentPlayer
      ].token;
      this.status[position] =
        this.game.tableItems[position] === 'X' ? true : false;
      this.game.moves++;
      // sets next playera as active
      if (!this.hasWon()) {
        this.game.currentPlayer = this.playerIs();
      }
    }
  }

  ngOnInit() {
    this.startGame('x');
  }
}
