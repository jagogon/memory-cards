/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html, expect } from '@open-wc/testing';
import './game-ranking-componet.js';

describe('GameRanking', () => {
  it('should render a table with ranking data', async () => {
    const el = await fixture(html`<game-ranking></game-ranking>`);

    el.ranking = [
      { position: 1, key: 'Player1', value: 100 },
      { position: 2, key: 'Player2', value: 90 },
      { position: 3, key: 'Player3', value: 80 },
    ];

    await el.updateComplete;

    const table = el.shadowRoot.querySelector('table');

    expect(table.querySelectorAll('tr')).to.have.lengthOf(
      el.ranking.length + 1
    ); // +1 por la fila de encabezado
  });
});
