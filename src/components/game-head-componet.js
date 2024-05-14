import { LitElement, html, css, unsafeCSS } from 'lit';
import { PlayerService } from '../services/player-service.js';
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
            <!-- <img src="user-icon.png" alt="Icono de usuario"> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#ffffff"
            >
              <path
                d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6zm0 4c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              />
            </svg>

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
