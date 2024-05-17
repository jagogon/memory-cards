import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import { createRef, ref } from 'lit/directives/ref.js';
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
            ${this.gameInProgress ? html`Jugando` : html`Jugar`}
          </button>
        </div>

        <div class="question">
          <p>${this.msgUser}</p>
        </div>

        <div class="card-container">
          ${this.numberBoxes.map((number, index) => {
            const cardRef = createRef();
            this.cardElements[index] = cardRef;
            return html`
              <div
                class="card"
                @click=${() => this.handleBoxClick(index)}
                @keydown=${() => {}}
                ${ref(cardRef)}
              >
                <span>${this.selectionTime ? html`?` : html`${number}`}</span>
              </div>
            `;
          })}
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
    this.cardElements = [];
  }

  startGame() {
    this.msgUser = 'Memoriza las tarjetas';
    this.gameInProgress = true;
    this.setRandomNumbers(9);
    this.currentNumber =
      this.numberBoxes[Math.floor(Math.random() * this.numberBoxes.length)];
    setTimeout(() => {
      this.selectionTime = true;
      this.msgUser = `¿Dónde se encuentra el número: ${this.currentNumber}?`;
    }, this.timerDuration);
  }

  setRandomNumbers(length) {
    this.numberBoxes = Array.from({ length }, (_, index) => index + 1).sort(
      () => Math.random() - 0.5
    );
  }

  handleBoxClick(index) {
    if (this.gameInProgress && this.selectionTime) {
      this.selectionTime = false;
      const isCorrect = this.numberBoxes[index] === this.currentNumber;
      const cardElement = this.cardElements[index].value;

      if (cardElement) {
        if (isCorrect) {
          const addPoint = this.getPointsForDifficulty();
          this.points += addPoint;
          this.msgUser = `Correcto: +${addPoint} puntos`;
        } else {
          this.msgUser = 'ERROR, fin del juego';
        }

        cardElement.classList.add(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
          cardElement.classList.remove('correct', 'incorrect');
          this.msgUser = '';
          if (isCorrect) {
            this.startGame();
          } else {
            this.reset();
          }
        }, 3000);
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
