/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { html, fixture, expect } from '@open-wc/testing';
import './memory-cards.js';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

describe('MemoryCards', () => {
  it('should render outlet element correctly', async () => {
    const el = await fixture(html`<memory-cards></memory-cards>`);
    const outlet = el.shadowRoot.querySelector('#outlet');
    expect(outlet).to.exist;
  });

  it('should set routes when first updated', async () => {
    const routerStub = sinon.stub(Router.prototype, 'setRoutes');
    const el = await fixture(html`<memory-cards></memory-cards>`);
    await el.updateComplete;
    expect(routerStub).to.have.been.calledWith([
      { path: '/', component: 'home-view' },
      { path: '/game', component: 'game-view' },
      { path: '(.*)', component: 'home-view' },
    ]);
    routerStub.restore();
  });
});
