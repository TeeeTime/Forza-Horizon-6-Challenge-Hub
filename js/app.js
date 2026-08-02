/* ==========================================================================
   FORZA HORIZON 6 — CHALLENGE HUB APPLICATION ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================
  // 1. AUDIO SYNTHESIZER
  // ==========================================
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    click() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      var osc = this.ctx.createOscillator();
      var gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    }

    tick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      var osc = this.ctx.createOscillator();
      var gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    }

    success() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      var now = this.ctx.currentTime;
      var freqs = [440, 554.37, 659.25];
      for (var i = 0; i < freqs.length; i++) {
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freqs[i], now + i * 0.06);
        gain.gain.setValueAtTime(0.001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.22);
      }
    }
  }

  var audio = new AudioEngine();

  // ==========================================
  // 2. LOBBY STORE
  // ==========================================
  class LobbyStore {
    constructor() {
      this.players = this._load('fh6_lobby_p', ['Du (Host)', 'Kumpel 1']);
      this.scores = this._load('fh6_lobby_s', {});
      this.customTracks = this._load('fh6_user_tracks', FH6_OFFICIAL_EVENTS.slice());
    }

    _load(key, fallback) {
      try {
        if (typeof localStorage !== 'undefined') {
          var val = localStorage.getItem(key);
          if (val) return JSON.parse(val);
        }
      } catch (e) {}
      return fallback;
    }

    _save() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('fh6_lobby_p', JSON.stringify(this.players));
          localStorage.setItem('fh6_lobby_s', JSON.stringify(this.scores));
          localStorage.setItem('fh6_user_tracks', JSON.stringify(this.customTracks));
        }
      } catch (e) {}
    }

    add(name) {
      var clean = name.trim();
      if (!clean || this.players.indexOf(clean) !== -1) return false;
      this.players.push(clean);
      this.scores[clean] = 0;
      this._save();
      return true;
    }

    remove(name) {
      this.players = this.players.filter(function(p) { return p !== name; });
      delete this.scores[name];
      this._save();
    }

    addPoint(name) {
      this.scores[name] = (this.scores[name] || 0) + 1;
      this._save();
    }

    subPoint(name) {
      if (this.scores[name] > 0) {
        this.scores[name] -= 1;
        this._save();
      }
    }

    reset() {
      var self = this;
      this.players.forEach(function(p) { self.scores[p] = 0; });
      this._save();
    }

    addCustomTrack(name, region, type) {
      var cleanName = name.trim();
      if (!cleanName) return false;
      var cleanRegion = (region || 'Map-Position').trim();
      var cleanType = (type || 'Track').trim();
      this.customTracks.push({ name: cleanName, mapRegion: cleanRegion, type: cleanType });
      this._save();
      return true;
    }

    removeCustomTrack(index) {
      if (index >= 0 && index < this.customTracks.length) {
        this.customTracks.splice(index, 1);
        this._save();
      }
    }

    clearCustomTracks() {
      this.customTracks = [];
      this._save();
    }

    loadOfficialTracks() {
      this.customTracks = FH6_OFFICIAL_EVENTS.slice();
      this._save();
      return this.customTracks.length;
    }

    cleanRawType(rawType, name) {
      if (!rawType) return this.detectTrackType(name);
      var t = rawType.toLowerCase().replace(/\s+/g, '');
      if (t.indexOf('drift') !== -1) return 'Driftzone';
      if (t.indexOf('drag') !== -1 || t.indexOf('pull') !== -1 || t.indexOf('0-300') !== -1 || t.indexOf('viertelmeile') !== -1) return 'Drag Race';
      if (t.indexOf('trailblazer') !== -1) return 'Trailblazer';
      if (t.indexOf('speedtrap') !== -1 || t.indexOf('blitzer') !== -1 || t.indexOf('speedcamera') !== -1) return 'Speedtrap';
      if (t.indexOf('speedzone') !== -1) return 'Speedzone';
      if (t.indexOf('jump') !== -1 || t.indexOf('gefahren') !== -1 || t.indexOf('sprung') !== -1) return 'Jump';
      if (t.indexOf('touge') !== -1) return 'Touge';
      if (t.indexOf('street') !== -1 || t.indexOf('strasse') !== -1) return 'Street';
      if (t.indexOf('cross') !== -1 || t.indexOf('querfeldein') !== -1) return 'Crosscountry';
      if (t.indexOf('dirt') !== -1 || t.indexOf('rally') !== -1 || t.indexOf('offroad') !== -1 || t.indexOf('scramble') !== -1 || t.indexOf('gauntlet') !== -1 || t === 'trail') return 'Dirt';
      if (t.indexOf('track') !== -1 || t.indexOf('rund') !== -1 || t.indexOf('circuit') !== -1 || t.indexOf('sprint') !== -1 || t.indexOf('colossus') !== -1 || t.indexOf('goliath') !== -1) return 'Track';
      if (t.indexOf('stunt') !== -1 || t.indexOf('pr-stunt') !== -1 || t.indexOf('prstunt') !== -1) return 'Jump';
      return this.detectTrackType(name);
    }

    detectTrackType(name) {
      var n = name.toLowerCase();
      if (n.indexOf('drift') !== -1) return 'Driftzone';
      if (n.indexOf('drag') !== -1 || n.indexOf('pull') !== -1 || n.indexOf('0-300') !== -1 || n.indexOf('viertelmeile') !== -1) return 'Drag Race';
      if (n.indexOf('trailblazer') !== -1) return 'Trailblazer';
      if (n.indexOf('speedtrap') !== -1 || n.indexOf('blitzer') !== -1) return 'Speedtrap';
      if (n.indexOf('speedzone') !== -1 || n.indexOf('speed zone') !== -1) return 'Speedzone';
      if (n.indexOf('jump') !== -1 || n.indexOf('leap') !== -1 || n.indexOf('launch') !== -1 || n.indexOf('sprung') !== -1) return 'Jump';
      if (n.indexOf('touge') !== -1) return 'Touge';
      if (n.indexOf('street') !== -1) return 'Street';
      if (n.indexOf('cross') !== -1) return 'Crosscountry';
      if (n.indexOf('offroad') !== -1 || n.indexOf('rally') !== -1 || n.indexOf('schotter') !== -1 || n.indexOf('dirt') !== -1 || n.indexOf('scramble') !== -1 || n.indexOf('gauntlet') !== -1) return 'Dirt';
      return 'Track';
    }

    importBulk(text) {
      var lines = text.split('\n');
      var added = 0;
      var self = this;
      lines.forEach(function(line) {
        var trimmed = line.trim();
        if (!trimmed) return;
        // Ignore table header lines
        if (trimmed.toLowerCase().indexOf('name') === 0 && trimmed.toLowerCase().indexOf('region') !== -1) return;

        var parts;
        if (trimmed.indexOf('\t') !== -1) {
          parts = trimmed.split('\t');
        } else if (trimmed.indexOf('|') !== -1) {
          parts = trimmed.split('|');
        } else {
          parts = [trimmed];
        }

        var name = parts[0].trim();
        if (!name) return;

        var region = parts.length > 1 ? parts[1].trim() : 'Map-Position';
        var rawType = parts.length > 2 ? parts[2].trim() : '';

        var type = self.cleanRawType(rawType, name);

        self.customTracks.push({ name: name, mapRegion: region, type: type });
        added++;
      });
      if (added > 0) this._save();
      return added;
    }
  }

  var lobby = new LobbyStore();

  // ==========================================
  // 3. UTILITY FUNCTIONS
  // ==========================================
  function randElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getClassForPI(pi) {
    for (var i = 0; i < FORZA_DATA.classes.length; i++) {
      var c = FORZA_DATA.classes[i];
      if (pi >= c.min && pi <= c.max) return c;
    }
    return FORZA_DATA.classes[0];
  }

  function getPlayerColor(index) {
    return FORZA_DATA.playerColors[index % FORZA_DATA.playerColors.length];
  }

  function getEventTypeIconMarkup(type) {
    if (!type || typeof EVENT_TYPE_ICONS === 'undefined') return '';
    var key = String(type).trim();
    var aliases = {
      Drift: 'Driftzone',
      'Cross Country': 'Crosscountry',
      Race: 'Track',
      Speedcamera: 'Speedtrap',
      'PR-Stunt': 'Jump'
    };
    var resolved = EVENT_TYPE_ICONS[key] ? key : (aliases[key] || key);
    var svg = EVENT_TYPE_ICONS[resolved];
    if (!svg) return '';
    return '<span class="event-type-icon" title="' + key.replace(/"/g, '&quot;') + '">' + svg + '</span>';
  }

  var COUNTRY_FLAG_SVG = {
    de: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="5.33" y="0" fill="#000"/><rect width="24" height="5.33" y="5.33" fill="#D00"/><rect width="24" height="5.34" y="10.66" fill="#FFCE00"/></svg>',
    jp: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#fff"/><circle cx="12" cy="8" r="4.2" fill="#BC002D"/></svg>',
    us: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#B22234"/><rect y="1.23" width="24" height="1.23" fill="#fff"/><rect y="3.69" width="24" height="1.23" fill="#fff"/><rect y="6.15" width="24" height="1.23" fill="#fff"/><rect y="8.62" width="24" height="1.23" fill="#fff"/><rect y="11.08" width="24" height="1.23" fill="#fff"/><rect y="13.54" width="24" height="1.23" fill="#fff"/><rect width="9.6" height="8.62" fill="#3C3B6E"/><g fill="#fff"><circle cx="1.6" cy="1.2" r="0.45"/><circle cx="3.2" cy="1.2" r="0.45"/><circle cx="4.8" cy="1.2" r="0.45"/><circle cx="6.4" cy="1.2" r="0.45"/><circle cx="8" cy="1.2" r="0.45"/><circle cx="2.4" cy="2.4" r="0.45"/><circle cx="4" cy="2.4" r="0.45"/><circle cx="5.6" cy="2.4" r="0.45"/><circle cx="7.2" cy="2.4" r="0.45"/><circle cx="1.6" cy="3.6" r="0.45"/><circle cx="3.2" cy="3.6" r="0.45"/><circle cx="4.8" cy="3.6" r="0.45"/><circle cx="6.4" cy="3.6" r="0.45"/><circle cx="8" cy="3.6" r="0.45"/><circle cx="2.4" cy="4.8" r="0.45"/><circle cx="4" cy="4.8" r="0.45"/><circle cx="5.6" cy="4.8" r="0.45"/><circle cx="7.2" cy="4.8" r="0.45"/><circle cx="1.6" cy="6" r="0.45"/><circle cx="3.2" cy="6" r="0.45"/><circle cx="4.8" cy="6" r="0.45"/><circle cx="6.4" cy="6" r="0.45"/><circle cx="8" cy="6" r="0.45"/><circle cx="2.4" cy="7.2" r="0.45"/><circle cx="4" cy="7.2" r="0.45"/><circle cx="5.6" cy="7.2" r="0.45"/><circle cx="7.2" cy="7.2" r="0.45"/></g></svg>',
    it: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#CE2B37"/></svg>',
    gb: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#012169"/><path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" stroke-width="2.6"/><path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" stroke-width="1.2"/><path d="M12 0 V16 M0 8 H24" stroke="#fff" stroke-width="4.2"/><path d="M12 0 V16 M0 8 H24" stroke="#C8102E" stroke-width="2.4"/></svg>',
    fr: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ED2939"/></svg>',
    se: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#006AA7"/><rect x="7" width="3.2" height="16" fill="#FECC00"/><rect y="6.4" width="24" height="3.2" fill="#FECC00"/></svg>',
    sk: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#fff"/><circle cx="12" cy="8" r="3.6" fill="#CD2E3A"/><path d="M12 8a3.6 3.6 0 0 0-3.6 3.6A3.6 3.6 0 0 0 12 8a3.6 3.6 0 0 0 3.6 3.6A3.6 3.6 0 0 0 12 8z" fill="#0047A0"/><path d="M8.4 8h7.2" stroke="#fff" stroke-width="0.9"/></svg>',
    au: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="16" fill="#00008B"/><rect width="10" height="8" fill="#012169"/><path d="M0 0 L10 8 M10 0 L0 8" stroke="#fff" stroke-width="1.4"/><path d="M0 0 L10 8 M10 0 L0 8" stroke="#C8102E" stroke-width="0.7"/><path d="M5 0 V8 M0 4 H10" stroke="#fff" stroke-width="2.2"/><path d="M5 0 V8 M0 4 H10" stroke="#C8102E" stroke-width="1.2"/><g fill="#fff"><polygon points="17,2.2 17.35,3.3 18.5,3.3 17.55,4 17.9,5.1 17,4.4 16.1,5.1 16.45,4 15.5,3.3 16.65,3.3"/><polygon points="14.2,6.5 14.4,7.15 15.1,7.15 14.55,7.55 14.75,8.2 14.2,7.8 13.65,8.2 13.85,7.55 13.3,7.15 14,7.15"/><polygon points="19.8,6.5 20,7.15 20.7,7.15 20.15,7.55 20.35,8.2 19.8,7.8 19.25,8.2 19.45,7.55 18.9,7.15 19.6,7.15"/><polygon points="17,9.2 17.2,9.85 17.9,9.85 17.35,10.25 17.55,10.9 17,10.5 16.45,10.9 16.65,10.25 16.1,9.85 16.8,9.85"/><polygon points="12.5,10.5 12.7,11.15 13.4,11.15 12.85,11.55 13.05,12.2 12.5,11.8 11.95,12.2 12.15,11.55 11.6,11.15 12.3,11.15"/><polygon points="20.8,11.2 21,11.85 21.7,11.85 21.15,12.25 21.35,12.9 20.8,12.5 20.25,12.9 20.45,12.25 19.9,11.85 20.6,11.85"/></g></svg>',
    at: '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="5.33" y="0" fill="#ED2939"/><rect width="24" height="5.33" y="5.33" fill="#fff"/><rect width="24" height="5.34" y="10.66" fill="#ED2939"/></svg>'
  };

  function getCountryFlagMarkup(id) {
    return '<span class="country-flag">' + (COUNTRY_FLAG_SVG[id] || '') + '</span>';
  }

  // ==========================================
  // 4. GENERATOR ENGINE
  // ==========================================
  function getSelectedClasses(opts) {
    var enabledCodes = opts.selectedClasses || [];
    var validClasses = FORZA_DATA.classes.filter(function(c) {
      return enabledCodes.indexOf(c.code) !== -1;
    });
    return validClasses.length > 0 ? validClasses : FORZA_DATA.classes;
  }

  function generateBaseRules(opts) {
    var piObj;
    if (opts.exactPi != null) {
      var fixedPi = opts.exactPi;
      var fixedCls = getClassForPI(fixedPi);
      piObj = { code: fixedCls.code, pi: fixedPi, text: 'PI ' + fixedPi + ' [' + fixedCls.code + ']' };
    } else {
      var cls = randElem(getSelectedClasses(opts));
      var val = randInt(cls.min, cls.max);
      piObj = { code: cls.code, pi: val, text: cls.name + ' (' + val + ' PI)' };
    }

    var stageCount = parseInt(opts.stageCount || 1);
    var stages = [];
    var useUserTracks = opts.trackSource === 'custom' && lobby.customTracks.length > 0;
    var usedTrackNames = {};
    var usedDisciplines = {};

    for (var i = 0; i < stageCount; i++) {
      if (useUserTracks) {
        var availableDisciplines = FORZA_DATA.disciplines.filter(function(d) {
          return !usedDisciplines[d.id];
        });
        if (availableDisciplines.length === 0) availableDisciplines = FORZA_DATA.disciplines;
        var disc = randElem(availableDisciplines);
        usedDisciplines[disc.id] = true;

        var matchingTracks = lobby.customTracks.filter(function(ct) {
          var t = (ct.type || '').toLowerCase().replace(/\s+/g, '');
          var dId = disc.id.toLowerCase().replace(/\s+/g, '');
          var dTypeLabel = (disc.typeLabel || '').toLowerCase().replace(/\s+/g, '');
          return t === dTypeLabel || t === dId || t.indexOf(dId) !== -1 || dTypeLabel.indexOf(t) !== -1;
        });

        var unusedMatching = matchingTracks.filter(function(ct) {
          return !usedTrackNames[ct.name];
        });

        var chosenTrack;
        if (unusedMatching.length > 0) {
          chosenTrack = randElem(unusedMatching);
        } else {
          var unusedAny = lobby.customTracks.filter(function(ct) {
            return !usedTrackNames[ct.name];
          });
          chosenTrack = unusedAny.length > 0 ? randElem(unusedAny) : (matchingTracks.length > 0 ? randElem(matchingTracks) : randElem(lobby.customTracks));
        }

        usedTrackNames[chosenTrack.name] = true;

        stages.push({
          stageNum: i + 1,
          name: chosenTrack.name,
          typeLabel: chosenTrack.type || disc.typeLabel,
          trackName: chosenTrack.name,
          mapRegion: chosenTrack.mapRegion
        });
      } else {
        var availableDisciplines = FORZA_DATA.disciplines.filter(function(d) {
          return !usedDisciplines[d.id];
        });
        if (availableDisciplines.length === 0) availableDisciplines = FORZA_DATA.disciplines;
        var disc = randElem(availableDisciplines);
        usedDisciplines[disc.id] = true;

        stages.push({
          stageNum: i + 1,
          name: disc.name,
          typeLabel: disc.typeLabel,
          trackName: disc.hint,
          mapRegion: ''
        });
      }
    }

    return {
      pi: piObj,
      drivetrain: opts.includeDrivetrain ? randElem(FORZA_DATA.drivetrains) : null,
      era: opts.includeEra ? randElem(FORZA_DATA.eras) : null,
      restriction: opts.includeRestrictions ? randElem(FORZA_DATA.tuningRules) : null,
      weather: opts.includeWeather ? randElem(FORZA_DATA.weatherConditions) : null,
      tires: opts.includeTires ? randElem(FORZA_DATA.tireCompounds) : null,
      assists: opts.includeAssists ? randElem(FORZA_DATA.assistRules) : null,
      stages: opts.includeEvent ? stages : []
    };
  }

  function buildChallenge(country, rules) {
    return {
      country: country,
      brand: randElem(country.brands),
      pi: rules.pi,
      drivetrain: rules.drivetrain,
      era: rules.era,
      restriction: rules.restriction,
      weather: rules.weather,
      tires: rules.tires,
      assists: rules.assists,
      stages: rules.stages
    };
  }

  function filterCountries(opts) {
    if (opts.selectedCountries && opts.selectedCountries.length > 0) {
      var filtered = FORZA_DATA.countries.filter(function(c) {
        return opts.selectedCountries.indexOf(c.id) !== -1;
      });
      if (filtered.length > 0) return filtered;
    }
    return FORZA_DATA.countries;
  }

  function generateSession(players, opts, escalationState) {
    var mode = opts.mode || 'group';
    var availableCountries = filterCountries(opts);
    var results = [];

    if (mode === 'chaos') {
      // CHAOS: same parameter selection as other modes, rolled independently per player
      var shuffledCountries = availableCountries.slice().sort(function() { return 0.5 - Math.random(); });
      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          challenge: buildChallenge(shuffledCountries[idx % shuffledCountries.length], generateBaseRules(opts))
        });
      });
      return results;
    }

    if (mode === 'escalation') {
      // ESCALATION: PI increases each round within selected class bounds
      var escalClasses = getSelectedClasses(opts);
      var escalMin = Math.min.apply(null, escalClasses.map(function(c) { return c.min; }));
      var escalMax = Math.max.apply(null, escalClasses.map(function(c) { return c.max; }));
      var escalPi;
      if (escalationState.round === 0) {
        var startMax = Math.min(escalMin + 200, escalMax);
        escalPi = randInt(escalMin, startMax);
        escalationState.country = randElem(availableCountries);
      } else {
        var increase = randInt(80, 160);
        escalPi = Math.min(escalMax, escalationState.lastPi + increase);
      }
      escalationState.round++;
      escalationState.lastPi = escalPi;

      var escalRules = generateBaseRules(Object.assign({}, opts, { exactPi: escalPi }));

      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          escalationRound: escalationState.round,
          challenge: buildChallenge(escalationState.country, escalRules)
        });
      });
      return results;
    }

    // GROUP or INDIVIDUAL (VS): shared rules from the same parameter selection
    var sharedRules = generateBaseRules(opts);

    if (mode === 'group') {
      var sharedCountry = randElem(availableCountries);
      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          challenge: buildChallenge(sharedCountry, sharedRules)
        });
      });
    } else {
      // VS: different countries, same rules
      var shuffled = availableCountries.slice().sort(function() { return 0.5 - Math.random(); });
      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          challenge: buildChallenge(shuffled[idx % shuffled.length], sharedRules)
        });
      });
    }

    return results;
  }

  // ==========================================
  // 5. APPLICATION CONTROLLER
  // ==========================================
  class AppController {
    constructor() {
      this.mode = 'group';
      this.stageCount = 1;
      this.trackSource = 'custom';
      this.selectedCountries = FORZA_DATA.countries.map(function(c) { return c.id; });
      this.selectedClasses = FORZA_DATA.classes.map(function(c) { return c.code; });
      this.history = [];
      this.lastSession = null;

      // Escalation state
      this.escalation = { round: 0, lastPi: 0, country: null };

      this.bindDOM();
      this.bindEvents();
      this.renderCountries();
      this.renderClasses();
      this.renderLobby();
      this.renderCustomTracks();
    }

    bindDOM() {
      this.btnSpin = document.getElementById('btn-spin');
      this.btnQuickSpin = document.getElementById('btn-quick-spin');
      this.btnCopy = document.getElementById('btn-copy');
      this.btnReroll = document.getElementById('btn-reroll');
      this.btnAudio = document.getElementById('toggle-audio');
      this.btnShowRules = document.getElementById('btn-show-rules');
      this.btnCloseRules = document.getElementById('btn-close-rules');
      this.btnRulesOk = document.getElementById('btn-rules-ok');
      this.btnResetScores = document.getElementById('btn-reset-scores');
      this.btnClearHistory = document.getElementById('btn-clear-history');
      this.btnToggleCountries = document.getElementById('btn-toggle-countries');
      this.btnToggleReglement = document.getElementById('btn-toggle-reglement');
      this.reglementStack = document.getElementById('reglement-checkboxes');

      this.btnPodium = document.getElementById('btn-podium');
      this.podiumModal = document.getElementById('podium-modal');
      this.podiumContent = document.getElementById('podium-content');
      this.btnClosePodium = document.getElementById('btn-close-podium');

      this.btnOpenTrackMgr = document.getElementById('btn-open-track-mgr');
      this.trackModal = document.getElementById('track-modal');
      this.btnCloseTrack = document.getElementById('btn-close-track');
      this.btnCloseTrackOk = document.getElementById('btn-close-track-ok');
      this.addTrackForm = document.getElementById('add-track-form');
      this.inputTrackName = document.getElementById('input-track-name');
      this.inputTrackRegion = document.getElementById('input-track-region');
      this.inputTrackType = document.getElementById('input-track-type');
      this.bulkTrackInput = document.getElementById('bulk-track-input');
      this.btnImportBulk = document.getElementById('btn-import-bulk');
      this.btnClearTracks = document.getElementById('btn-clear-tracks');
      this.btnLoadOfficialTracks = document.getElementById('btn-load-official-tracks');
      this.customTrackListEl = document.getElementById('custom-track-list');
      this.trackCountEl = document.getElementById('track-count');

      this.addPlayerForm = document.getElementById('add-player-form');
      this.playerNameInput = document.getElementById('player-name-input');
      this.classGrid = document.getElementById('class-checkboxes');
      this.btnToggleClasses = document.getElementById('btn-toggle-classes');

      this.chkDrivetrain = document.getElementById('chk-drivetrain');
      this.chkEvent = document.getElementById('chk-event');
      this.chkRestriction = document.getElementById('chk-restriction');
      this.chkEra = document.getElementById('chk-era');
      this.chkWeather = document.getElementById('chk-weather');
      this.chkTires = document.getElementById('chk-tires');
      this.chkAssists = document.getElementById('chk-assists');

      this.countryGrid = document.getElementById('country-checkboxes');
      this.playerTable = document.getElementById('player-table');
      this.historyList = document.getElementById('history-list');
      this.idleScreen = document.getElementById('idle-screen');
      this.resultsArea = document.getElementById('results-area');
      this.resultsGrid = document.getElementById('results-grid');
      this.quickResult = document.getElementById('quick-result');
      this.quickResultLabel = document.getElementById('quick-result-label');
      this.quickResultValue = document.getElementById('quick-result-value');
      this.rulesModal = document.getElementById('rules-modal');
      this.toastStack = document.getElementById('toast-container');
      this.playerCountBadge = document.getElementById('player-count');
      this.modeHint = document.getElementById('mode-hint');

      this.quickSpinModal = document.getElementById('quick-spin-modal');
      this.btnCloseQuick = document.getElementById('btn-close-quick');
      this.quickSpinOutput = document.getElementById('quick-spin-output');
    }

    bindEvents() {
      var self = this;

      // Main spin
      this.btnSpin.addEventListener('click', function() { self.handleSpin(); });
      this.btnReroll.addEventListener('click', function() { self.handleSpin(); });
      this.btnCopy.addEventListener('click', function() { self.copyToClipboard(); });

      // Audio toggle
      this.btnAudio.addEventListener('click', function() {
        var active = audio.toggle();
        self.btnAudio.style.opacity = active ? '1' : '0.4';
        self.toast(active ? 'Audio aktiv' : 'Audio stumm');
      });

      // Presets
      document.querySelectorAll('.btn-preset').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          self.applyPreset(e.currentTarget.dataset.preset);
        });
      });

      // Mode selector
      document.querySelectorAll('.seg-btn[data-mode]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          document.querySelectorAll('.seg-btn[data-mode]').forEach(function(b) { b.classList.remove('active'); });
          e.currentTarget.classList.add('active');
          self.mode = e.currentTarget.dataset.mode;
          self.modeHint.textContent = FORZA_DATA.modeDescriptions[self.mode] || '';

          // Reset escalation when switching modes
          if (self.mode !== 'escalation') {
            self.escalation = { round: 0, lastPi: 0, country: null };
          }
        });
      });

      // Track source
      document.querySelectorAll('.track-src').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          document.querySelectorAll('.track-src').forEach(function(b) { b.classList.remove('active'); });
          e.currentTarget.classList.add('active');
          self.trackSource = e.currentTarget.dataset.source;
        });
      });

      // Stage count
      document.querySelectorAll('.stage-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          document.querySelectorAll('.stage-btn').forEach(function(b) { b.classList.remove('active'); });
          e.currentTarget.classList.add('active');
          self.stageCount = parseInt(e.currentTarget.dataset.stages);
        });
      });

      // Class toggle all
      this.btnToggleClasses.addEventListener('click', function() {
        audio.click();
        var chks = self.classGrid.querySelectorAll('input[type="checkbox"]');
        var allChecked = Array.from(chks).every(function(c) { return c.checked; });
        chks.forEach(function(c) { c.checked = !allChecked; });
        self.updateClasses();
        self.btnToggleClasses.textContent = !allChecked ? 'Alle abwaehlen' : 'Alle auswaehlen';
      });

      // Country toggle
      this.btnToggleCountries.addEventListener('click', function() {
        audio.click();
        var chks = self.countryGrid.querySelectorAll('input[type="checkbox"]');
        var allChecked = Array.from(chks).every(function(c) { return c.checked; });
        chks.forEach(function(c) { c.checked = !allChecked; });
        self.updateCountries();
      });

      // Reglement toggle all
      this.btnToggleReglement.addEventListener('click', function() {
        audio.click();
        var chks = self.reglementStack.querySelectorAll('input[type="checkbox"]');
        var allChecked = Array.from(chks).every(function(c) { return c.checked; });
        chks.forEach(function(c) { c.checked = !allChecked; });
        self.syncReglementToggleLabel();
      });
      this.reglementStack.querySelectorAll('input[type="checkbox"]').forEach(function(chk) {
        chk.addEventListener('change', function() { self.syncReglementToggleLabel(); });
      });
      this.syncReglementToggleLabel();

      // Foldable parameter sections
      document.querySelectorAll('.field-foldable').forEach(function(section) {
        var toggle = section.querySelector('.field-fold-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', function() {
          audio.click();
          var folded = section.classList.toggle('is-folded');
          toggle.setAttribute('aria-expanded', folded ? 'false' : 'true');
        });
      });

      // Podium
      this.btnPodium.addEventListener('click', function() {
        audio.click();
        self.renderPodium();
        self.podiumModal.classList.remove('hidden');
      });
      this.btnClosePodium.addEventListener('click', function() { self.podiumModal.classList.add('hidden'); });

      // Track manager
      this.btnOpenTrackMgr.addEventListener('click', function() {
        audio.click();
        self.trackModal.classList.remove('hidden');
      });
      this.btnCloseTrack.addEventListener('click', function() { self.trackModal.classList.add('hidden'); });
      this.btnCloseTrackOk.addEventListener('click', function() { self.trackModal.classList.add('hidden'); });

      this.addTrackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = self.inputTrackName.value;
        var region = self.inputTrackRegion.value;
        var type = self.inputTrackType ? self.inputTrackType.value : 'Track';
        if (lobby.addCustomTrack(name, region, type)) {
          audio.click();
          self.inputTrackName.value = '';
          self.inputTrackRegion.value = '';
          self.renderCustomTracks();
          self.toast('Strecke hinzugefuegt');
        }
      });

      this.btnImportBulk.addEventListener('click', function() {
        var text = self.bulkTrackInput.value;
        var count = lobby.importBulk(text);
        if (count > 0) {
          audio.success();
          self.bulkTrackInput.value = '';
          self.renderCustomTracks();
          self.toast(count + ' Strecken importiert');
        } else {
          self.toast('Keine Strecken zum Import gefunden');
        }
      });

      this.btnClearTracks.addEventListener('click', function() {
        if (confirm('Alle gespeicherten Strecken loeschen?')) {
          audio.click();
          lobby.clearCustomTracks();
          self.renderCustomTracks();
          self.toast('Strecken geloescht');
        }
      });

      if (this.btnLoadOfficialTracks) {
        this.btnLoadOfficialTracks.addEventListener('click', function() {
          audio.success();
          var count = lobby.loadOfficialTracks();
          self.renderCustomTracks();
          self.toast(count + ' Standard-Events geladen');
        });
      }

      // Player management
      this.addPlayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = self.playerNameInput.value;
        if (lobby.add(name)) {
          audio.click();
          self.playerNameInput.value = '';
          self.renderLobby();
          self.toast('Spieler "' + name + '" hinzugefuegt');
        }
      });

      this.btnResetScores.addEventListener('click', function() {
        if (confirm('Punkte fuer alle Spieler zuruecksetzen?')) {
          audio.click();
          lobby.reset();
          self.escalation = { round: 0, lastPi: 0, country: null };
          self.renderLobby();
          self.toast('Punkte und Eskalation zurueckgesetzt');
        }
      });

      this.btnClearHistory.addEventListener('click', function() {
        self.history = [];
        self.renderHistory();
        self.toast('Historie geleert');
      });

      // Rules modal
      this.btnShowRules.addEventListener('click', function() { audio.click(); self.rulesModal.classList.remove('hidden'); });
      this.btnCloseRules.addEventListener('click', function() { self.rulesModal.classList.add('hidden'); });
      this.btnRulesOk.addEventListener('click', function() { self.rulesModal.classList.add('hidden'); });

      // Quick spin
      this.btnQuickSpin.addEventListener('click', function() {
        audio.click();
        self.quickSpinModal.classList.remove('hidden');
      });
      this.btnCloseQuick.addEventListener('click', function() { self.quickSpinModal.classList.add('hidden'); });

      document.querySelectorAll('.quick-cat').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          self.handleQuickSpin(e.currentTarget.dataset.cat);
        });
      });

      // Close modals on backdrop click
      document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
        overlay.addEventListener('click', function(e) {
          if (e.target === overlay) overlay.classList.add('hidden');
        });
      });
    }

    // --- PRESETS ---
    applyPreset(key) {
      if (key === 'jdm') {
        this.selectedCountries = ['jp'];
        this.chkDrivetrain.checked = true;
        this.toast('Preset: JDM Drift');
      } else if (key === 'autobahn') {
        this.selectedCountries = ['de'];
        this.selectedClasses = ['S2', 'R', 'X'];
        this.toast('Preset: Autobahn Speed');
      } else if (key === 'muscle') {
        this.selectedCountries = ['us'];
        this.chkRestriction.checked = true;
        this.toast('Preset: Muscle Drag');
      } else if (key === 'rallye') {
        this.chkDrivetrain.checked = true;
        this.chkRestriction.checked = true;
        this.chkTires.checked = true;
        this.toast('Preset: Offroad Rallye');
      } else if (key === 'touge') {
        this.selectedCountries = ['jp'];
        this.chkDrivetrain.checked = true;
        this.chkWeather.checked = true;
        this.toast('Preset: Touge Night');
      } else if (key === 'budget') {
        this.selectedClasses = ['D', 'C', 'B'];
        this.chkRestriction.checked = true;
        this.toast('Preset: Budget Build');
      }
      this.renderCountries();
      this.renderClasses();
      this.syncReglementToggleLabel();
    }

    // --- QUICK SPIN ---
    handleQuickSpin(category) {
      var label = '';
      var value = '';
      var availableCountries = FORZA_DATA.countries;
      if (this.selectedCountries.length > 0) {
        var filtered = FORZA_DATA.countries.filter(function(c) {
          return this.selectedCountries.indexOf(c.id) !== -1;
        }.bind(this));
        if (filtered.length > 0) availableCountries = filtered;
      }

      if (category === 'country') {
        var c = randElem(availableCountries);
        label = 'Land';
        value = c.name + ' [' + c.code + ']';
      } else if (category === 'pi') {
        var piCls = randElem(getSelectedClasses({ selectedClasses: this.selectedClasses }));
        var pi = randInt(piCls.min, piCls.max);
        label = 'PI-Zahl';
        value = pi + ' (' + piCls.name + ')';
      } else if (category === 'drivetrain') {
        var dt = randElem(FORZA_DATA.drivetrains);
        label = 'Antrieb';
        value = dt.name + ' - ' + dt.full;
      } else if (category === 'era') {
        var era = randElem(FORZA_DATA.eras);
        label = 'Epoche';
        value = era.name;
      } else if (category === 'restriction') {
        var r = randElem(FORZA_DATA.tuningRules);
        label = 'Reglement';
        value = r.title;
      } else if (category === 'weather') {
        var w = randElem(FORZA_DATA.weatherConditions);
        label = 'Wetter';
        value = w.name;
      } else if (category === 'tires') {
        var t = randElem(FORZA_DATA.tireCompounds);
        label = 'Reifen';
        value = t.name;
      } else if (category === 'track') {
        if (lobby.customTracks.length > 0) {
          var track = randElem(lobby.customTracks);
          label = 'Strecke';
          value = track.name;
        } else {
          var disc = randElem(FORZA_DATA.disciplines);
          label = 'Disziplin';
          value = disc.name;
        }
      }

      this.quickSpinOutput.innerHTML =
        '<div class="qo-label">' + this.escape(label) + '</div>' +
        '<div class="qo-value">' + this.escape(value) + '</div>';

      // Brief shake animation
      this.quickSpinOutput.style.animation = 'none';
      this.quickSpinOutput.offsetHeight; // trigger reflow
      this.quickSpinOutput.style.animation = 'quickPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

      audio.success();
    }

    // --- PODIUM ---
    renderPodium() {
      var players = lobby.players;
      var scores = lobby.scores;
      if (players.length === 0) {
        this.podiumContent.innerHTML = '<span class="muted">Keine Spieler in der Lobby.</span>';
        return;
      }

      var sorted = players.slice().sort(function(a, b) { return (scores[b] || 0) - (scores[a] || 0); });
      var self = this;

      this.podiumContent.innerHTML = sorted.map(function(p, idx) {
        var place = idx + 1;
        var score = scores[p] || 0;
        var pIdx = lobby.players.indexOf(p);
        var color = getPlayerColor(pIdx);
        return '<div style="background:var(--bg-inset); border:1px solid var(--border-dim); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border-left:3px solid ' + color + ';">' +
          '<div style="font-weight:600; color:var(--text-1);">Platz ' + place + ' \u2014 ' + self.escape(p) + '</div>' +
          '<div style="font-family:var(--font-mono); font-weight:700; color:var(--accent);">' + score + ' Siege</div>' +
        '</div>';
      }).join('');
    }

    // --- CUSTOM TRACKS ---
    renderCustomTracks() {
      var tracks = lobby.customTracks;
      this.trackCountEl.textContent = tracks.length;

      if (tracks.length === 0) {
        this.customTrackListEl.innerHTML = '<span class="muted">Keine gespeicherten Strecken.</span>';
        return;
      }

      var self = this;
      this.customTrackListEl.innerHTML = tracks.map(function(t, idx) {
        var icon = getEventTypeIconMarkup(t.type);
        var typeBadge = t.type ? '<span class="track-type-label">[' + self.escape(t.type) + ']</span>' : '';
        return '<div class="saved-track-row">' +
          '<div class="saved-track-main">' +
            '<div class="saved-track-title">' + icon + '<strong>' + self.escape(t.name) + '</strong>' + typeBadge + '</div>' +
            '<span class="saved-track-region">' + self.escape(t.mapRegion) + '</span>' +
          '</div>' +
          '<button class="del-btn" data-index="' + idx + '">&times;</button>' +
        '</div>';
      }).join('');

      this.customTrackListEl.querySelectorAll('.del-btn').forEach(function(b) {
        b.addEventListener('click', function(e) {
          var idx = parseInt(e.currentTarget.dataset.index);
          audio.click();
          lobby.removeCustomTrack(idx);
          self.renderCustomTracks();
        });
      });
    }

    // --- COUNTRIES ---
    renderCountries() {
      var self = this;
      this.countryGrid.innerHTML = FORZA_DATA.countries.map(function(c) {
        return '<label class="country-chk">' +
          '<input type="checkbox" value="' + c.id + '"' + (self.selectedCountries.indexOf(c.id) !== -1 ? ' checked' : '') + '>' +
          '<span class="country-name">' + c.name + '</span>' +
          getCountryFlagMarkup(c.id) +
        '</label>';
      }).join('');

      this.countryGrid.querySelectorAll('input[type="checkbox"]').forEach(function(chk) {
        chk.addEventListener('change', function() { self.updateCountries(); });
      });
      this.syncCountryToggleLabel();
    }

    updateCountries() {
      this.selectedCountries = Array.from(this.countryGrid.querySelectorAll('input:checked')).map(function(i) { return i.value; });
      this.syncCountryToggleLabel();
    }

    syncCountryToggleLabel() {
      var allOn = this.selectedCountries.length === FORZA_DATA.countries.length;
      this.btnToggleCountries.textContent = allOn ? 'Alle abwaehlen' : 'Alle auswaehlen';
    }

    syncReglementToggleLabel() {
      var chks = this.reglementStack.querySelectorAll('input[type="checkbox"]');
      var allOn = Array.from(chks).every(function(c) { return c.checked; });
      this.btnToggleReglement.textContent = allOn ? 'Alle abwaehlen' : 'Alle auswaehlen';
    }

    // --- CLASSES ---
    renderClasses() {
      var self = this;
      this.classGrid.innerHTML = FORZA_DATA.classes.map(function(c) {
        var on = self.selectedClasses.indexOf(c.code) !== -1;
        return '<label class="class-chk class-chk-' + c.code + (on ? ' is-on' : '') + '" title="' + c.name + ' (' + c.min + '-' + c.max + ')">' +
          '<input type="checkbox" value="' + c.code + '"' + (on ? ' checked' : '') + '>' +
          '<span class="class-code">' + c.code + '</span>' +
        '</label>';
      }).join('');

      this.classGrid.querySelectorAll('input[type="checkbox"]').forEach(function(chk) {
        chk.addEventListener('change', function() { self.updateClasses(); });
      });
      this.syncClassToggleLabel();
    }

    updateClasses() {
      this.selectedClasses = Array.from(this.classGrid.querySelectorAll('input:checked')).map(function(i) { return i.value; });
      this.classGrid.querySelectorAll('.class-chk').forEach(function(label) {
        var on = label.querySelector('input').checked;
        label.classList.toggle('is-on', on);
      });
      this.syncClassToggleLabel();
    }

    syncClassToggleLabel() {
      var allOn = this.selectedClasses.length === FORZA_DATA.classes.length;
      this.btnToggleClasses.textContent = allOn ? 'Alle abwaehlen' : 'Alle auswaehlen';
    }

    // --- LOBBY / SCOREBOARD ---
    renderLobby() {
      var players = lobby.players;
      var scores = lobby.scores;
      this.playerCountBadge.textContent = players.length + ' Spieler';

      if (players.length === 0) {
        this.playerTable.innerHTML = '<span class="muted">Keine Spieler vorhanden.</span>';
        return;
      }

      var maxScore = -1;
      players.forEach(function(p) {
        var s = scores[p] || 0;
        if (s > maxScore) maxScore = s;
      });

      var self = this;
      this.playerTable.innerHTML = players.map(function(p, idx) {
        var s = scores[p] || 0;
        var isLeader = maxScore > 0 && s === maxScore;
        var color = getPlayerColor(idx);
        return '<div class="player-row' + (isLeader ? ' leading' : '') + '">' +
          '<div class="p-name-group">' +
            '<div class="p-color-dot" style="background:' + color + ';"></div>' +
            '<span class="p-name">' + self.escape(p) + '</span>' +
            (isLeader ? '<span class="leader-pill">Fuehrung</span>' : '') +
          '</div>' +
          '<div class="score-group">' +
            '<button class="s-btn btn-sub" data-player="' + self.escape(p) + '">-</button>' +
            '<span class="s-val">' + s + '</span>' +
            '<button class="s-btn btn-add" data-player="' + self.escape(p) + '">+</button>' +
            '<button class="del-btn btn-del-player" data-player="' + self.escape(p) + '">&times;</button>' +
          '</div>' +
        '</div>';
      }).join('');

      this.playerTable.querySelectorAll('.btn-add').forEach(function(b) {
        b.addEventListener('click', function(e) {
          audio.success();
          lobby.addPoint(e.currentTarget.dataset.player);
          self.renderLobby();
        });
      });

      this.playerTable.querySelectorAll('.btn-sub').forEach(function(b) {
        b.addEventListener('click', function(e) {
          audio.click();
          lobby.subPoint(e.currentTarget.dataset.player);
          self.renderLobby();
        });
      });

      this.playerTable.querySelectorAll('.btn-del-player').forEach(function(b) {
        b.addEventListener('click', function(e) {
          audio.click();
          lobby.remove(e.currentTarget.dataset.player);
          self.renderLobby();
        });
      });
    }

    // --- MAIN SPIN ---
    handleSpin() {
      if (this.selectedCountries.length === 0) {
        this.toast('Bitte mindestens ein Land waehlen');
        return;
      }
      if (this.selectedClasses.length === 0) {
        this.toast('Bitte mindestens eine Klasse waehlen');
        return;
      }

      var players = lobby.players.length > 0 ? lobby.players : ['Spieler 1'];
      var opts = {
        mode: this.mode,
        selectedClasses: this.selectedClasses.slice(),
        stageCount: this.stageCount,
        trackSource: this.trackSource,
        selectedCountries: this.selectedCountries,
        includeDrivetrain: this.chkDrivetrain.checked,
        includeEvent: this.chkEvent.checked,
        includeRestrictions: this.chkRestriction.checked,
        includeEra: this.chkEra.checked,
        includeWeather: this.chkWeather.checked,
        includeTires: this.chkTires.checked,
        includeAssists: this.chkAssists.checked
      };

      // Hide idle/quick, show results
      this.idleScreen.classList.add('hidden');
      this.quickResult.classList.add('hidden');
      this.resultsArea.classList.remove('hidden');
      this.resultsGrid.classList.add('anim-spin');

      var self = this;
      var tickCount = 0;
      var interval = setInterval(function() {
        audio.tick();
        tickCount++;
        if (tickCount >= 8) {
          clearInterval(interval);
          self.resultsGrid.classList.remove('anim-spin');
          audio.success();

          var results = generateSession(players, opts, self.escalation);
          self.lastSession = results;

          self.history.unshift({ time: new Date(), results: results, stageCount: self.stageCount, mode: self.mode });
          if (self.history.length > 15) self.history.pop();

          self.renderTelemetry(results);
          self.renderHistory();
        }
      }, 40);
    }

    // --- RENDER TELEMETRY CARDS ---
    renderTelemetry(results) {
      var self = this;
      this.resultsGrid.innerHTML = results.map(function(r) {
        var c = r.challenge;
        var pIdx = r.playerIndex !== undefined ? r.playerIndex : 0;
        var color = getPlayerColor(pIdx);
        var piClass = 'pi-tag pi-tag-' + c.pi.code;

        var html = '<div class="tele-card" style="--player-color:' + color + ';">';

        // Top row
        html += '<div class="card-top-row">';
        html += '<span class="player-name"><span class="player-dot" style="background:' + color + ';"></span>' + self.escape(r.player);
        if (r.escalationRound) {
          html += '<span class="round-badge">Runde ' + r.escalationRound + '</span>';
        }
        html += '</span>';
        html += '<span class="' + piClass + '">' + c.pi.code + '</span>';
        html += '</div>';

        // Spec grid
        html += '<div class="spec-grid">';

        html += '<div class="spec-item"><span class="lbl">Herkunft & Marken</span>';
        html += '<span class="val country-val">' + self.escape(c.country.name) + ' ' + getCountryFlagMarkup(c.country.id) + '</span>';
        html += '<span class="sub">z.B. ' + self.escape(c.brand) + '</span></div>';

        html += '<div class="spec-item"><span class="lbl">PI Target</span>';
        html += '<span class="pi-tag pi-tag-' + c.pi.code + '" style="align-self:flex-start;margin-top:2px;">' + c.pi.code + ' ' + c.pi.pi + '</span></div>';

        if (c.drivetrain) {
          html += '<div class="spec-item"><span class="lbl">Antrieb</span>';
          html += '<span class="val">' + c.drivetrain.name + '</span>';
          html += '<span class="sub">' + c.drivetrain.full + '</span></div>';
        }

        if (c.era) {
          html += '<div class="spec-item"><span class="lbl">Epoche</span>';
          html += '<span class="val">' + c.era.name + '</span></div>';
        }

        if (c.restriction) {
          html += '<div class="spec-item" style="grid-column:span 2;"><span class="lbl">Tuning-Reglement</span>';
          html += '<span class="val">' + c.restriction.title + '</span>';
          html += '<span class="sub">' + c.restriction.desc + '</span></div>';
        }

        if (c.weather) {
          html += '<div class="spec-item"><span class="lbl">Wetter</span>';
          html += '<span class="val">' + c.weather.name + '</span>';
          html += '<span class="sub">' + c.weather.desc + '</span></div>';
        }

        if (c.tires) {
          html += '<div class="spec-item"><span class="lbl">Reifen</span>';
          html += '<span class="val">' + c.tires.name + '</span>';
          html += '<span class="sub">' + c.tires.desc + '</span></div>';
        }

        if (c.assists) {
          html += '<div class="spec-item"><span class="lbl">Assists</span>';
          html += '<span class="val">' + c.assists.name + '</span>';
          html += '<span class="sub">' + c.assists.desc + '</span></div>';
        }

        html += '</div>'; // close spec-grid

        // Stages / Events
        if (c.stages && c.stages.length > 0) {
          html += '<div class="stages-wrap">';
          html += '<span class="stages-label">' + (c.stages.length > 1 ? 'Cup Etappen (' + c.stages.length + ' Events)' : 'Renn-Strecke') + '</span>';

          c.stages.forEach(function(st) {
            var icon = getEventTypeIconMarkup(st.typeLabel);
            html += '<div class="event-block">';
            html += '<div class="event-block-top">';
            html += '<span class="ev-name">' + icon + (c.stages.length > 1 ? 'Etappe ' + st.stageNum + ': ' : '') + self.escape(st.name) + '</span>';
            html += '<span class="ev-type">' + self.escape(st.typeLabel || '') + '</span>';
            html += '</div>';
            html += '<div class="ev-track">' + self.escape(st.trackName) + '</div>';
            if (st.mapRegion) { html += '<div class="ev-region">Region: ' + self.escape(st.mapRegion) + '</div>'; }
            html += '</div>';
          });

          html += '</div>';
        }

        html += '</div>'; // close tele-card
        return html;
      }).join('');
    }

    // --- HISTORY ---
    renderHistory() {
      if (this.history.length === 0) {
        this.historyList.innerHTML = '<span class="muted">Noch keine Eintraege.</span>';
        return;
      }

      var self = this;
      this.historyList.innerHTML = this.history.map(function(h) {
        var c = h.results[0].challenge;
        var stagesLabel = c.stages && c.stages.length > 1 ? c.stages.length + '-Etappen Cup' : 'Einzel-Event';
        var modeLabel = h.mode === 'chaos' ? ' [Chaos]' : h.mode === 'escalation' ? ' [Eskalation]' : '';
        return '<div class="history-entry">' +
          '<div>' +
            '<strong class="history-country">' + self.escape(c.country.name) + ' ' + getCountryFlagMarkup(c.country.id) + ' \u2014 ' + c.pi.code + ' ' + c.pi.pi + '</strong>' +
            '<div class="muted">' + stagesLabel + ' (' + h.results.length + ' Spieler)' + modeLabel + '</div>' +
          '</div>' +
          '<span class="muted">' + h.time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) + '</span>' +
        '</div>';
      }).join('');
    }

    // --- COPY TO CLIPBOARD ---
    copyToClipboard() {
      if (!this.lastSession) return;

      var text = 'FORZA HORIZON 6 CHALLENGE\n';
      text += '====================================\n';

      this.lastSession.forEach(function(r) {
        var c = r.challenge;
        text += 'SPIELER: ' + r.player + '\n';
        text += 'LAND: ' + c.country.name + ' [' + c.country.code + '] (z.B. ' + c.brand + ')\n';
        text += 'PI TARGET: ' + c.pi.code + ' ' + c.pi.pi + '\n';
        if (c.drivetrain) text += 'ANTRIEB: ' + c.drivetrain.name + ' (' + c.drivetrain.full + ')\n';
        if (c.era) text += 'EPOCHE: ' + c.era.name + '\n';
        if (c.restriction) text += 'REGLEMENT: ' + c.restriction.title + ' (' + c.restriction.desc + ')\n';
        if (c.weather) text += 'WETTER: ' + c.weather.name + ' (' + c.weather.desc + ')\n';
        if (c.tires) text += 'REIFEN: ' + c.tires.name + ' (' + c.tires.desc + ')\n';
        if (c.assists) text += 'ASSISTS: ' + c.assists.name + ' (' + c.assists.desc + ')\n';

        if (c.stages && c.stages.length > 0) {
          text += 'STRECKEN:\n';
          c.stages.forEach(function(st) {
            text += '  - Etappe ' + st.stageNum + ': ' + st.trackName + '\n';
            if (st.mapRegion) { text += '    [Region: ' + st.mapRegion + ']\n'; }
          });
        }
        text += '------------------------------------\n';
      });

      var self = this;
      navigator.clipboard.writeText(text).then(function() {
        audio.success();
        // Visual feedback on copy button
        self.btnCopy.classList.add('btn-copied');
        var origText = self.btnCopy.textContent;
        self.btnCopy.textContent = 'Kopiert!';
        setTimeout(function() {
          self.btnCopy.classList.remove('btn-copied');
          self.btnCopy.textContent = origText;
        }, 1500);
      }).catch(function() {
        self.toast('Fehler beim Kopieren');
      });
    }

    // --- TOAST ---
    toast(msg) {
      var t = document.createElement('div');
      t.className = 'toast-msg';
      t.textContent = msg;
      this.toastStack.appendChild(t);
      setTimeout(function() { t.remove(); }, 2200);
    }

    // --- ESCAPE HTML ---
    escape(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { new AppController(); });
  } else {
    new AppController();
  }

})();
