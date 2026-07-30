export class LobbyManager {
  constructor() {
    this.players = this.loadPlayers();
    this.scores = this.loadScores();
  }

  loadPlayers() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('fh_lobby_players');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load lobby players', e);
    }
    return ['Du (Host)', 'Kumpel 1'];
  }

  savePlayers() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fh_lobby_players', JSON.stringify(this.players));
      }
    } catch (e) {
      console.warn('Could not save lobby players', e);
    }
  }

  loadScores() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('fh_lobby_scores');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load lobby scores', e);
    }
    return {};
  }

  saveScores() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('fh_lobby_scores', JSON.stringify(this.scores));
      }
    } catch (e) {
      console.warn('Could not save lobby scores', e);
    }
  }

  addPlayer(name) {
    const trimmed = name.trim();
    if (!trimmed || this.players.includes(trimmed)) return false;
    this.players.push(trimmed);
    if (this.scores[trimmed] === undefined) {
      this.scores[trimmed] = 0;
    }
    this.savePlayers();
    this.saveScores();
    return true;
  }

  removePlayer(name) {
    this.players = this.players.filter(p => p !== name);
    delete this.scores[name];
    this.savePlayers();
    this.saveScores();
  }

  addPoint(name) {
    if (this.scores[name] === undefined) {
      this.scores[name] = 0;
    }
    this.scores[name] += 1;
    this.saveScores();
    return this.scores[name];
  }

  deductPoint(name) {
    if (this.scores[name] === undefined) {
      this.scores[name] = 0;
    } else if (this.scores[name] > 0) {
      this.scores[name] -= 1;
    }
    this.saveScores();
    return this.scores[name];
  }

  resetScores() {
    this.players.forEach(p => {
      this.scores[p] = 0;
    });
    this.saveScores();
  }
}

export const lobbyManager = new LobbyManager();
