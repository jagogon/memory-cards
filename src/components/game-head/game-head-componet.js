import { LitElement, html, css, unsafeCSS } from 'lit';
import { PlayerService } from '../../services/player-service.js';
import styles from './game-head-style.js';

class GameHead extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();
    const playerService = PlayerService.getInstance();
    this.playerName = playerService.getPlayerName();
  }

  render() {
    return html`
      <header>
        <div class="left">
          <div class="user-info">
            <img src="/assets/user.svg" alt="user" />
            <span>${this.playerName}</span>
          </div>
        </div>
        <div class="right">
          <span>Nivel</span>
          <select @change=${this.handleDifficultyChange}>
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
