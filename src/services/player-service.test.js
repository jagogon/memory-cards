/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { PlayerService } from './player-service.js';

describe('PlayerService', () => {
  let service;

  beforeEach(() => {
    service = PlayerService.getInstance();
    // Reset player name before each test
    service.setPlayerName('');
  });

  it('should return the same instance', () => {
    const service1 = PlayerService.getInstance();
    const service2 = PlayerService.getInstance();
    expect(service1).to.equal(service2);
  });

  it('should initially have an empty player name', () => {
    expect(service.getPlayerName()).to.equal('');
  });

  it('should set and get the player name correctly', () => {
    const name = 'Javier';
    service.setPlayerName(name);
    expect(service.getPlayerName()).to.equal(name);
  });

  it('should correctly determine if a player name has been set', () => {
    /* eslint-disable no-unused-expressions */
    expect(service.hasPlayerName()).to.be.false;
    service.setPlayerName('Javier');
    expect(service.hasPlayerName()).to.be.true;
    /* eslint-enable no-unused-expressions */
  });

  it('should trim the player name', () => {
    const name = 'Javier';
    service.setPlayerName(name);
    expect(service.getPlayerName()).to.equal(name.trim());
  });
});
