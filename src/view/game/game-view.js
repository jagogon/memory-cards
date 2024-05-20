import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { createRef, ref } from 'lit/directives/ref.js';
import { PlayerService } from '../../services/player-service.js';
import { DifficultyLevel } from '../../models/difficulty-level-enum.js';
import styles from './game-style.js';
import '../../components/game-head/game-head-componet.js';
import {
  CORRECT_MESSAGE,
  ERROR_MESSAGE,
  CARD_MEMORY_MESSAGE,
  NUMBER_QUESTION_ERROR_MESSAGE,
} from '../../models/app-constants.js';

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
    maxPoint: { type: Number },
  };

  timeoutCard;

  timeOutStartGame;

  playerService = PlayerService.getInstance();

  static styles = styles;

  constructor() {
    super();
    if (!this.playerService.hasPlayerName()) Router.go('/home');
    this.selectedDifficulty = 0;
    this.reset();
  }

  firstUpdated() {
    this.playerService.getRankingValue().then(maxPointsCache => {
      this.maxPoint = maxPointsCache;
    });
  }

  renderData() {
    return html`
      <table>
        <tbody>
          <tr>
            <td>Máxima puntuación</td>
            <td>${this.maxPoint}</td>
          </tr>
          <tr>
            <td>Puntos</td>
            <td>${this.points}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  renderCards() {
    return html`
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
    `;
  }

  render() {
    return html`
      <game-head></game-head>

      <main>
        <div class="container">
          ${this.renderData()}

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

        <div class="card-container">${this.renderCards()}</div>
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
    if (this.timeoutCard) clearTimeout(this.timeoutCard);
    if (this.timeOutStartGame) clearTimeout(this.timeOutStartGame);
  }

  handleLevelChange(event) {
    this.selectedDifficulty = event.detail.selectedDifficulty;
    this.setDurationTimeForDifficulty();
  }

  reset() {
    this.points = 0;
    this.handleGameInProgress(false);
    this.setDurationTimeForDifficulty();
    this.numberBoxes = [];
    this.cardElements = [];
  }

  startGame() {
    this.msgUser = CARD_MEMORY_MESSAGE;
    this.handleGameInProgress(true);
    this.setRandomNumbers(9);
    // this.currentNumber =
    //   this.numberBoxes[Math.floor(Math.random() * this.numberBoxes.length)];

    this.currentNumber = 1;

    this.timeOutStartGame = setTimeout(() => {
      this.selectionTime = true;
      this.msgUser = NUMBER_QUESTION_ERROR_MESSAGE(this.currentNumber);
    }, this.timerDuration);
  }

  handleGameInProgress(gameInProgress) {
    this.gameInProgress = gameInProgress;
    const eventGameInProgress = new CustomEvent('change:gameInProgress', {
      detail: { gameInProgress },
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(eventGameInProgress);
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
      const points = this.getPointsForDifficulty();

      if (cardElement) {
        this.playerService.setRanking(this.points);
        if (isCorrect) {
          this.points += points;
          if (this.points > this.maxPoint) this.maxPoint = this.points;
          this.msgUser = CORRECT_MESSAGE(points);
        } else {
          this.msgUser = ERROR_MESSAGE;
        }

        cardElement.classList.add(isCorrect ? 'correct' : 'incorrect');

        this.timeoutCard = setTimeout(() => {
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
