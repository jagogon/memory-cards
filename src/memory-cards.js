import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import './view/home/home-view.js';
import './view/game/game-view.js';

class MemoryCards extends LitElement {
  firstUpdated() {
    const outlet = this.shadowRoot?.querySelector('#outlet');
    if (outlet) {
      const router = new Router(outlet);
      router.setRoutes([
        { path: '/', component: 'home-view' },
        { path: '/game', component: 'game-view' },
        { path: '(.*)', component: 'home-view' },
      ]);
    }
  }

  render() {
    return html` <div id="outlet"></div> `;
  }
}

customElements.define('memory-cards', MemoryCards);
