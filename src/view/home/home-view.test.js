/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { html, fixture, expect } from '@open-wc/testing';
import './home-view.js';
import {
  INVALID_NAME_MESSAGE,
  EMPTY_NAME_MESSAGE,
} from '../../models/app-constants.js';

describe('HomeView', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<home-view></home-view>`);
  });

  it('should render the initial content', () => {
    const title = element.shadowRoot.querySelector('h1');
    const input = element.shadowRoot.querySelector('input');
    const button = element.shadowRoot.querySelector('button');

    expect(title.textContent).to.equal('Memorizar cartas');
    expect(input).to.exist;
    expect(button).to.exist;
  });

  it('should update inputValue on input', async () => {
    const input = element.shadowRoot.querySelector('input');
    input.value = 'John';
    input.dispatchEvent(new Event('input'));
    await element.updateComplete;

    expect(element.inputValue).to.equal('John');
  });

  it('should clear msg on input focus', async () => {
    const input = element.shadowRoot.querySelector('input');
    element.msg = 'Some message';
    input.dispatchEvent(new Event('focus'));
    await element.updateComplete;

    expect(element.msg).to.equal('');
  });

  it('should display error message on invalid input', async () => {
    const input = element.shadowRoot.querySelector('input');
    input.value = '123';
    input.dispatchEvent(new Event('input'));

    element.startGame();

    expect(element.msg).to.equal(INVALID_NAME_MESSAGE);
  });

  it('should display error message on empty input', async () => {
    const input = element.shadowRoot.querySelector('input');
    input.value = '';
    input.dispatchEvent(new Event('input'));

    element.startGame();

    expect(element.msg).to.equal(EMPTY_NAME_MESSAGE);
  });

  it('should return isValidName false and EMPTY_NAME_MESSAGE for empty name', () => {
    const { isValidName, msg } = element.validName('');
    expect(isValidName).to.be.false;
    expect(msg).to.equal(EMPTY_NAME_MESSAGE);
  });

  it('should return isValidName true for a valid name', () => {
    const validName = 'John';
    const { isValidName, msg } = element.validName(validName);
    expect(isValidName).to.be.true;
    expect(msg).to.equal('');
  });
});
