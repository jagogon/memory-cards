/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { PlayerService } from './player-service.js';

describe('PlayerService', () => {
  let service;
  let cachesOpenStub;
  let cacheMatchStub;
  let cachePutStub;

  beforeEach(() => {
    service = PlayerService.getInstance();
    service.setPlayerName('');

    cachesOpenStub = sinon.stub(window.caches, 'open').resolves({
      put: cachePutStub,
    });

    cacheMatchStub = sinon.stub().resolves({
      text: () => Promise.resolve('100'), // Simula que se encuentra un valor en la caché
    });

    cachePutStub = sinon.stub().resolves();
  });

  afterEach(() => {
    sinon.restore();
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

  xit('should resolve with 0 if playerName does not exist in cache', async () => {
    cachesOpenStub.resolves({
      match: cacheMatchStub,
    });

    const value = await service.getRankingValue('nonexistentPlayer');
    expect(value).to.equal(0);
  });

  // it('should update maxPoints and cache when points exceed current maxPoints', async () => {
  //   const points = 100;

  //   await service.setRanking(points);

  //   expect(getRankingValueStub.calledOnce).to.be.true;
  //   expect(service.maxPoints).to.equal(100);
  //   // expect(cachesOpenStub.calledOnceWith(service.cacheName)).to.be.true;

  // });
});
