import { LitElement, html, css, unsafeCSS } from 'lit';
import { PlayerService } from '../../services/player-service.js';
import styles from './game-head-style.js';

class GameHead extends LitElement {
  static properties = {
    gameInProgress: { type: Boolean },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();
    const playerService = PlayerService.getInstance();
    this.playerName = playerService.getPlayerName();
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
            <span>${this.playerName}</span>
          </div>
        </div>
        <div class="right">
          <label>Nivel</label>
          <select
            @change=${this.handleDifficultyChange}
            ?disabled=${this.gameInProgress}
          >
            <option value="0">Bajo</option>
            <option value="1">Medio</option>
            <option value="2">Alto</option>
          </select>
        </div>
      </header>
    `;
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
