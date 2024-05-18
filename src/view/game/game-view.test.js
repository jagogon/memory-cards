/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { html, fixture, expect } from '@open-wc/testing';
import { PlayerService } from '../../services/player-service.js';
import { DifficultyLevel } from '../../models/difficulty-level-enum.js';
import './game-view.js';

describe('GameView', () => {
  let element;

  beforeEach(async () => {
    // Mock del PlayerService para que siempre tenga un nombre de jugador
    const playerService = PlayerService.getInstance();
    playerService.setPlayerName('Javier');
    element = await fixture(html`<game-view></game-view>`);
  });

  it('should initialize correctly', () => {
    expect(element.points).to.equal(0);
    expect(element.gameInProgress).to.be.false;
    expect(element.selectedDifficulty).to.equal(0);
  });

  it('should display player name correctly', () => {
    const gameHeadElement = element.shadowRoot.querySelector('game-head');
    expect(gameHeadElement).to.exist;
  });

  it('should start the game and update the UI correctly', async () => {
    const button = element.shadowRoot.querySelector('.button-start');
    button.click();
    await element.updateComplete;

    expect(element.gameInProgress).to.be.true;
    expect(element.msgUser).to.equal('Memoriza las tarjetas');
  });

  it('should handle difficulty change correctly', async () => {
    const newDifficulty = DifficultyLevel.High;
    const event = new CustomEvent('change:level', {
      detail: { selectedDifficulty: newDifficulty },
    });
    document.dispatchEvent(event);
    await element.updateComplete;

    expect(element.selectedDifficulty).to.equal(newDifficulty);
    expect(element.timerDuration).to.equal(2000);
  });

  it('should handle box click correctly and update points', async () => {
    element.startGame();
    await element.updateComplete;

    element.selectionTime = true;
    await element.updateComplete;

    const [card] = element.shadowRoot.querySelectorAll('.card');
    element.currentNumber = element.numberBoxes[0]; // eslint-disable-line prefer-destructuring
    card.click();
    await element.updateComplete;

    expect(element.points).to.be.greaterThan(0);
    expect(element.msgUser).to.include('Correcto: +10 puntos');
  });

  it('should reset the game correctly', async () => {
    element.reset();
    await element.updateComplete;

    expect(element.points).to.equal(0);
    expect(element.gameInProgress).to.be.false;
    expect(element.numberBoxes).to.be.empty;
  });

  it('should set the correct timer duration based on difficulty', () => {
    element.selectedDifficulty = DifficultyLevel.Low;
    element.setDurationTimeForDifficulty();
    expect(element.timerDuration).to.equal(10000);

    element.selectedDifficulty = DifficultyLevel.Half;
    element.setDurationTimeForDifficulty();
    expect(element.timerDuration).to.equal(5000);

    element.selectedDifficulty = DifficultyLevel.High;
    element.setDurationTimeForDifficulty();
    expect(element.timerDuration).to.equal(2000);
  });
});
