import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import styles from './game-head-style.js';

class GameHead extends LitElement {
  static properties = {
    gameInProgress: { type: Boolean },
  };

  static styles = styles;

  playerService = PlayerService.getInstance();

  constructor() {
    super();
    this.playerName = this.playerService.getPlayerName();
    this.gameInProgress = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.changeGameInProgress = this.handGameInProgress.bind(this);
    document.addEventListener(
      'change:gameInProgress',
      this.changeGameInProgress
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      'change:gameInProgress',
      this.changeGameInProgress
    );
  }

  handGameInProgress(event) {
    this.gameInProgress = event.detail.gameInProgress;
  }

  render() {
    return html`
      <header>
        <div class="left">
          <div class="user-info">
            <img src="assets/user.svg" alt="usuario" />
            <span>${this.playerName}</span>
          </div>
        </div>
        <div class="right">
          <div class="right-container">
            <label>Nivel</label>
            <select
              @change=${this.handleDifficultyChange}
              ?disabled=${this.gameInProgress}
            >
              <option value="0">Bajo</option>
              <option value="1">Medio</option>
              <option value="2">Alto</option>
            </select>

            <img
              src="assets/exit.svg"
              alt="exit"
              @click=${this.handleExit}
              @keydown=${this.handleExit}
            />
          </div>
        </div>
      </header>
    `;
  }

  handleExit() {
    this.playerName = this.playerService.setPlayerName('');
    Router.go(`/`);
  }

  // eslint-disable-next-line
  handleDifficultyChange(event) {
    const selectElement = event.target;
    const level = parseInt(selectElement.value, 10);
    const eventChangeLevel = new CustomEvent('change:level', {
      detail: { selectedDifficulty: level },
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(eventChangeLevel);
  }
}

customElements.define('game-head', GameHead);
