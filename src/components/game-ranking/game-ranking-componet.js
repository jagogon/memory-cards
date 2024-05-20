import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { PlayerService } from '../../services/player-service.js';
import styles from './game-ranking-style.js';

class GameRanking extends LitElement {
  static properties = {
    gameInProgress: { type: Boolean },
    ranking: { type: Array },
  };

  static styles = styles;

  playerService = PlayerService.getInstance();

  constructor() {
    super();
    this.ranking = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.playerService.getRanking().then(ranking => {
      this.ranking = ranking;
    });
  }

  renderRow(entry) {
    return html`
      <tr>
        <td>${entry.position}</td>
        <td>
          <a href="/game" @click="${() => this.handleNavigation(entry.key)}"
            >${entry.key}</a
          >
        </td>
        <td>${entry.value}</td>
      </tr>
    `;
  }

  render() {
    return html`
      ${this.ranking && this.ranking.length > 0
        ? html`
            <h2>Clasificación</h2>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Máxima puntuación</th>
                </tr>
              </thead>
              <tbody>
                ${this.ranking.map(entry => this.renderRow(entry))}
              </tbody>
            </table>
          `
        : html``}
    `;
  }

  handleNavigation(key) {
    this.playerService.setPlayerName(key);
    Router.go(`/game`);
  }
}

customElements.define('game-ranking', GameRanking);
