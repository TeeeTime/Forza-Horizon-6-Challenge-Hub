export class ChallengeGenerator {
  constructor() {
    this.history = [];
  }

  getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateSingleChallenge(options = {}) {
    const data = (typeof FORZA_DATA !== 'undefined') ? FORZA_DATA : null;
    if (!data) throw new Error('FORZA_DATA missing — load js/forzaData.js first');

    let availableCountries = data.countries;
    if (options.selectedCountries && options.selectedCountries.length > 0) {
      const filtered = data.countries.filter(c => options.selectedCountries.includes(c.id));
      if (filtered.length > 0) availableCountries = filtered;
    }
    const country = this.getRandomElement(availableCountries);

    const enabled = options.selectedClasses || [];
    const pool = enabled.length
      ? data.classes.filter(c => enabled.includes(c.code))
      : data.classes;
    const chosenClass = this.getRandomElement(pool.length ? pool : data.classes);
    const targetPI = this.getRandomInt(chosenClass.min, chosenClass.max);
    const piResult = {
      display: `${chosenClass.name} (${targetPI} PI)`,
      code: chosenClass.code,
      pi: targetPI
    };

    const drivetrain = options.includeDrivetrain !== false ? this.getRandomElement(data.drivetrains) : null;
    const era = options.includeEra !== false ? this.getRandomElement(data.eras) : null;
    const restriction = options.includeRestrictions !== false ? this.getRandomElement(data.tuningRules) : null;

    let event = null;
    if (options.includeEvent !== false) {
      const disc = this.getRandomElement(data.disciplines);
      event = {
        id: disc.id,
        name: disc.name,
        desc: disc.hint,
        location: disc.typeLabel
      };
    }

    const suggestedBrand = this.getRandomElement(country.brands);

    return {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      country: country,
      suggestedBrand: suggestedBrand,
      pi: piResult,
      drivetrain: drivetrain,
      era: era,
      restriction: restriction,
      event: event,
      timestamp: new Date().toISOString()
    };
  }

  generateSession(players = ['Spieler 1'], options = {}) {
    const isGroupMode = options.mode !== 'individual';
    const results = [];

    if (isGroupMode) {
      const sharedChallenge = this.generateSingleChallenge(options);
      players.forEach(playerName => {
        results.push({
          player: playerName,
          challenge: sharedChallenge
        });
      });
    } else {
      players.forEach(playerName => {
        results.push({
          player: playerName,
          challenge: this.generateSingleChallenge(options)
        });
      });
    }

    const session = {
      id: 'session-' + Date.now(),
      mode: options.mode || 'group',
      timestamp: new Date(),
      results: results
    };

    this.history.unshift(session);
    if (this.history.length > 30) this.history.pop();

    return session;
  }
}

export const challengeGenerator = new ChallengeGenerator();
