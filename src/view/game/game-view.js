import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import { DifficultyLevel } from '../../models/difficulty-level-enum.js';
import styles from './game-style.js';
import '../../components/game-head/game-head-componet.js';

class GameView extends LitElement {
  static properties = {
    points: { type: Number },
    selectedDifficulty: { type: Number },
    timerDuration: { type: Number },
    gameInProgress: { type: Boolean },
    currentNumber: { type: Number },
    numberBoxes: { type: Array },
    selectionTime: { type: Boolean },
    msgUser: { type: String },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();

    const playerService = PlayerService.getInstance();
    if (!playerService.hasPlayerName()) Router.go('/home');
    this.selectedDifficulty = 0;
    this.reset();
  }

  render() {
    return html`
      <game-head></game-head>

      <main>
      <div class="container">
        <p>Puntos: ${this.points}</p>

        <button
          class="button-start"
          @click=${this.startGame}
          ?disabled=${this.gameInProgress}
        >
          ${this.gameInProgress ? html`Jugando` : html`Comenzar`}
        </button>

      </div>

      <div class='question'>
        <p>${this.msgUser}</p>
      </div>

      </div>

        <div class="card-container">
          ${this.numberBoxes.map(
            (number, index) => html`
              <div
                class="card"
                @click=${() => this.handleBoxClick(index)}
                @keydown=${() => {}}
              >
                <span>${this.selectionTime ? html`?` : html`${number}`}</span>
              </div>
            `
          )}
        </div>

      </main>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.changeLevelListener = this.handleLevelChange.bind(this);
    document.addEventListener('change:level', this.changeLevelListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('change:level', this.changeLevelListener);
  }

  handleLevelChange(event) {
    this.selectedDifficulty = event.detail.selectedDifficulty;
    this.setDurationTimeForDifficulty();
  }

  reset() {
    this.points = 0;
    this.gameInProgress = false;
    this.setDurationTimeForDifficulty();
    this.numberBoxes = [];
  }

  startGame() {
    this.msgUser = 'Memoriza las targetas';
    this.gameInProgress = true;
    this.setRandomNumbers(9);
    // this.currentNumber = this.numberBoxes[Math.floor(Math.random() * this.numberBoxes.length)];
    this.currentNumber = 1;
    setTimeout(() => {
      this.selectionTime = true;
      this.msgUser = `¿Donde se encuentra el numero: ${this.currentNumber}`;
    }, this.timerDuration);
  }

  setRandomNumbers(length) {
    this.numberBoxes = Array.from({ length }, (_, index) => index + 1).sort(
      () => Math.random() - 0.5
    );
  }

  handleBoxClick(index) {
    if (this.gameInProgress) {
      this.selectionTime = false;
      const cardElement = this.shadowRoot.querySelector(
        `.card:nth-child(${index + 1})`
      );

      if (this.numberBoxes[index] === this.currentNumber) {
        this.points += this.getPointsForDifficulty();
        cardElement.classList.add('correct');
        setTimeout(() => {
          cardElement.classList.remove('correct');
          this.startGame();
        }, 3000);
      } else {
        this.msgUser = 'ERROR, fin del juego';
        cardElement.classList.add('incorrect');
        setTimeout(() => {
          this.msgUser = '';
          cardElement.classList.remove('incorrect');
          this.reset();
        }, 1000);
      }
    }
  }

  getPointsForDifficulty() {
    switch (this.selectedDifficulty) {
      case DifficultyLevel.Low:
        return 10;
      case DifficultyLevel.Half:
        return 20;
      case DifficultyLevel.High:
        return 30;
      default:
        return 0;
    }
  }

  setDurationTimeForDifficulty() {
    switch (this.selectedDifficulty) {
      case DifficultyLevel.Low:
        this.timerDuration = 10000;
        break;
      case DifficultyLevel.Half:
        this.timerDuration = 5000;
        break;
      case DifficultyLevel.High:
        this.timerDuration = 2000;
        break;
      default:
    }
  }
}

customElements.define('game-view', GameView);
