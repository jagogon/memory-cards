export class PlayerService {
  static instance;

  playerName = '';

  static getInstance() {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  getPlayerName() {
    return this.playerName;
  }

  setPlayerName(name) {
    this.playerName = name;
  }

  hasPlayerName() {
    return this.playerName.trim() !== '';
  }
}
