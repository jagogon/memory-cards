import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import styles from './home-style.js';
import {
  INVALID_NAME_MESSAGE,
  EMPTY_NAME_MESSAGE,
  LETTERS_ONLY_REGEX,
} from '../../models/app-constants.js';

class HomeView extends LitElement {
  static properties = {
    msg: { type: String },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();
    this.inputValue = '';
  }

  render() {
    return html`
      <div class="container">
        <h1>Memorizar cartas</h1>
        <h2>Introduce tu nombre</h2>
        <p class="msg">${this.msg}</p>
        <input
          type="text"
          placeholder="Nombre"
          .value=${this.inputValue}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />
        <button @click=${this.startGame}>Iniciar Juego</button>
      </div>
    `;
  }

  handleInput(event) {
    this.inputValue = event.target.value.trim();
  }

  handleFocus() {
    this.msg = '';
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.startGame();
    }
  }

  startGame() {
    const playerName = this.inputValue.trim();
    const { isValidName, msg } = this.validName(playerName);

    if (isValidName) {
      PlayerService.getInstance().setPlayerName(playerName);
      Router.go(`/game/`);
    } else {
      this.msg = msg;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validName(playerName) {
    let isValidName = false;
    let msg = EMPTY_NAME_MESSAGE;

    if (playerName) {
      if (LETTERS_ONLY_REGEX.test(playerName)) {
        isValidName = true;
        msg = '';
      } else {
        msg = INVALID_NAME_MESSAGE;
      }
    }

    return { isValidName, msg };
  }
}

customElements.define('home-view', HomeView);
