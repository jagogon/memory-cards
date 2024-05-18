/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect } from '@open-wc/testing';
import './game-head-componet.js';

describe('GameHead', () => {
  it('should render player name correctly', async () => {
    const playerName = 'Javier';
    const el = await fixture(
      html`<game-head .playerName=${playerName}></game-head>`
    );
    const userInfoElement = el.shadowRoot.querySelector('.user-info');
    expect(userInfoElement.textContent.trim()).to.equal(playerName);
  });
});
