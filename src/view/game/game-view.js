import { LitElement, html } from 'lit';

class GameView extends LitElement {
  // static properties = {
  //   header: { type: String },
  // };

  render() {
    return html` <span>game</span> `;
  }
}

customElements.define('game-view', GameView);
