export class PlayerService {
  static instance;

  playerName = '';

  maxPoints = 0;

  cacheName = 'cache-memory-card';

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

  getRankingValue() {
    return new Promise((resolve, reject) => {
      caches
        .open(this.cacheName)
        .then(cache => {
          cache
            .match(this.playerName)
            .then(response => {
              if (response) {
                response
                  .text()
                  .then(value => {
                    resolve(parseInt(value, 10));
                  })
                  .catch(error => {
                    reject(error);
                  });
              } else {
                resolve(0); // La clave no fue encontrada en la cache
              }
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  setRanking(points) {
    const response = new Response(JSON.stringify(points));
    this.getRankingValue().then(maxPointsCache => {
      this.maxPoints = maxPointsCache;
      if (points > this.maxPoints) {
        this.maxPoints = points;
        caches.open(this.cacheName).then(cache => {
          cache.put(this.playerName, response);
        });
      }
    });
  }

  async getRanking() {
    let keyValuePairs = [];
    const cache = await caches.open(this.cacheName);
    const requests = await cache.keys();

    await Promise.all(
      requests.map(async request => {
        const urlParts = request.url.split('/');
        const key = urlParts.pop();
        const response = await cache.match(request);
        const text = await response.text();
        const value = parseInt(text, 10);

        keyValuePairs.push({ key, value });
      })
    );

    keyValuePairs.sort((a, b) => b.value - a.value);

    keyValuePairs = keyValuePairs.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    return keyValuePairs;
  }
}
