/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { html, fixture, expect } from '@open-wc/testing';
import './game-head-componet.js';
import sinon from 'sinon';

describe('GameHead', () => {
  it('should render player name correctly', async () => {
    const playerName = 'Javier';
    const el = await fixture(
      html`<game-head .playerName=${playerName}></game-head>`
    );
    const userInfoElement = el.shadowRoot.querySelector('.user-info');
    expect(userInfoElement.textContent.trim()).to.equal(playerName);
  });

  it('should emit a custom event when difficulty changes', async () => {
    const el = await fixture(html`<game-head></game-head>`);
    const selectElement = el.shadowRoot.querySelector('select');
    const newDifficulty = 1;
    const dispatchEventSpy = sinon.spy(document, 'dispatchEvent');

    const event = new Event('change');
    selectElement.value = newDifficulty;
    selectElement.dispatchEvent(event);

    const changeLevelEvent = new CustomEvent('change:level', {
      detail: { selectedDifficulty: newDifficulty },
      bubbles: true,
      cancelable: true,
    });
    expect(dispatchEventSpy.calledWith(changeLevelEvent)).to.be.true;

    dispatchEventSpy.restore();
  });
});
