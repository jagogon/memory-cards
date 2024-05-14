import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import styles from './home-style.js';

class HomeView extends LitElement {
  static properties = {
    msg: { type: String },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div class="container">
        <h1>Memorizar cartas</h1>
        <h2>Introduce tu nombre</h2>
        <p class="msg">${this.msg}</p>
        <input id="nameInput" type="text" placeholder="Nombre" />
        <button @click=${this.startGame}>Iniciar Juego</button>
      </div>
    `;
  }

  startGame() {
    const nameInput = this.shadowRoot?.querySelector('#nameInput');
    const playerName = nameInput.value.trim();
    if (playerName) {
      const LETTERS_ONLY_REGEX = /^[a-zA-Z\s]*$/;

      if (LETTERS_ONLY_REGEX.test(playerName)) {
        PlayerService.getInstance().setPlayerName(playerName);

        Router.go(`/game/`);
      } else {
        this.msg =
          'Por favor, introduce un nombre válido (solo letras y espacios).';
      }
    } else {
      this.msg = 'Por favor, introduce un nombre válido.';
    }
  }
}

customElements.define('home-view', HomeView);
