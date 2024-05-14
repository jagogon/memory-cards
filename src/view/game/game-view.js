import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import { DifficultyLevel } from '../../models/difficulty-level-enum.js';
import styles from './game-style.js';
import '../../components/game-head-componet.js';

class GameView extends LitElement {
  static properties = {
    points: { type: Number },
    selectedDifficulty: { type: Number },
    timerDuration: { type: Number },
    gameInProgress: { type: Boolean },
    currentNumber: { type: Number },
    numberBoxes: { type: Array },
    selectionTime: { type: Boolean },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();

    const playerService = PlayerService.getInstance();
    if (!playerService.hasPlayerName()) Router.go('/home');
    this.reset();
  }

  render() {
    return html`
      <game-head></game-head>

      <main>
        <p>Puntos: ${this.points}</p>

        <button
          class="button-start"
          @click=${this.startGame}
          ?disabled=${this.gameInProgress}
        >
          ${this.gameInProgress ? html`Jugando` : html`Comenzar`}
        </button>

        ${this.selectionTime
          ? html`<p>¿Donde se encuentra el numero: ${this.currentNumber}?</p>`
          : html``}

        <div>
          ${this.numberBoxes.map(
            (number, index) => html`
              <div
                class="box"
                @click=${() => this.handleBoxClick(index)}
                @keydown=${() => {}}
              >
                ${this.selectionTime ? html`?` : html`${number}`}
              </div>
            `
          )}
        </div>

        <!-- <game-card></game-card> -->
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
    this.gameInProgress = true;
    this.setRandomNumbers(9);
    this.currentNumber =
      this.numberBoxes[Math.floor(Math.random() * this.numberBoxes.length)];
    setTimeout(() => {
      this.selectionTime = true;
    }, this.timerDuration);
  }

  setRandomNumbers(length) {
    // Generar números únicos aleatorios del 1 al length
    this.numberBoxes = Array.from({ length }, (_, index) => index + 1).sort(
      () => Math.random() - 0.5
    );
  }

  handleBoxClick(index) {
    if (this.gameInProgress) {
      this.selectionTime = false;
      if (this.numberBoxes[index] === this.currentNumber) {
        this.points += this.getPointsForDifficulty();
        this.startGame();
      } else {
        this.reset();
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
