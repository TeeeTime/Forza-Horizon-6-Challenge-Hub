import { FORZA_DATA } from './forzaData.js';

export class ChallengeGenerator {
  constructor() {
    this.history = [];
  }

  // Utility random choice helper
  getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Utility random int range helper
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateSingleChallenge(options = {}) {
    // 1. Country Selection
    let availableCountries = FORZA_DATA.countries;
    if (options.selectedCountries && options.selectedCountries.length > 0) {
      const filtered = FORZA_DATA.countries.filter(c => options.selectedCountries.includes(c.id));
      if (filtered.length > 0) availableCountries = filtered;
    }
    const country = this.getRandomElement(availableCountries);

    // 2. PI Tuning Selection
    let piResult = {};
    const piMode = options.piMode || 'exact'; // 'exact', 'class', 'range'

    if (piMode === 'class') {
      const enabled = options.selectedClasses || [];
      const pool = enabled.length
        ? FORZA_DATA.classes.filter(c => enabled.includes(c.code))
        : FORZA_DATA.classes;
      const chosenClass = this.getRandomElement(pool.length ? pool : FORZA_DATA.classes);
      const targetPI = this.getRandomInt(chosenClass.min, chosenClass.max);
      piResult = {
        display: `${chosenClass.name} (${targetPI} PI)`,
        code: chosenClass.code,
        pi: targetPI,
        badgeColor: chosenClass.badgeColor
      };
    } else if (piMode === 'range') {
      const min = options.piMin || 100;
      const max = options.piMax || 999;
      const targetPI = this.getRandomInt(min, max);
      
      // Determine matching class code
      const matchedClass = FORZA_DATA.classes.find(c => targetPI >= c.min && targetPI <= c.max) || FORZA_DATA.classes[0];
      piResult = {
        display: `PI ${targetPI} (${matchedClass.code})`,
        code: matchedClass.code,
        pi: targetPI,
        badgeColor: matchedClass.badgeColor
      };
    } else {
      // Exact fixed PI target
      const targetPI = options.piExact != null
        ? options.piExact
        : (options.piMin != null ? options.piMin : 700);
      const matchedClass = FORZA_DATA.classes.find(c => targetPI >= c.min && targetPI <= c.max) || FORZA_DATA.classes[0];
      piResult = {
        display: `Exakt PI ${targetPI}`,
        code: matchedClass.code,
        pi: targetPI,
        badgeColor: matchedClass.badgeColor
      };
    }

    // 3. Drivetrain
    const drivetrain = options.includeDrivetrain !== false ? this.getRandomElement(FORZA_DATA.drivetrains) : null;

    // 4. Era / Baujahr
    const era = options.includeEra !== false ? this.getRandomElement(FORZA_DATA.eras) : null;

    // 5. Tuning / Special Restrictions
    const restriction = options.includeRestrictions !== false ? this.getRandomElement(FORZA_DATA.tuningRules) : null;

    // 6. Event Discipline & Location
    let event = null;
    if (options.includeEvent !== false) {
      let availableEvents = FORZA_DATA.eventTypes;
      if (options.selectedEvents && options.selectedEvents.length > 0) {
        const filtered = FORZA_DATA.eventTypes.filter(e => options.selectedEvents.includes(e.id));
        if (filtered.length > 0) availableEvents = filtered;
      }
      const rawEvent = this.getRandomElement(availableEvents);
      const location = this.getRandomElement(rawEvent.locations);
      event = {
        id: rawEvent.id,
        name: rawEvent.name,
        desc: rawEvent.desc,
        location: location
      };
    }

    // Example suggested brands for the chosen country
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
      // One challenge shared by all players
      const sharedChallenge = this.generateSingleChallenge(options);
      players.forEach(playerName => {
        results.push({
          player: playerName,
          challenge: sharedChallenge
        });
      });
    } else {
      // Individual challenge per player
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
