/* ==========================================================================
   FORZA HORIZON 6 — CHALLENGE HUB APPLICATION ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================
  // 1. FORZA HORIZON 6 DATASET
  // ==========================================
  const FORZA_DATA = {
    countries: [
      { id: 'de', name: 'Deutschland', code: 'DE', brands: ['BMW', 'Porsche', 'Audi', 'Mercedes-AMG', 'Volkswagen', 'Opel', 'Ruf', 'ALPINA'] },
      { id: 'jp', name: 'Japan', code: 'JP', brands: ['Nissan', 'Toyota', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru', 'Lexus', 'Infiniti', 'Nissan NISMO'] },
      { id: 'us', name: 'USA', code: 'US', brands: ['Ford', 'Chevrolet', 'Dodge', 'Shelby', 'Cadillac', 'Pontiac', 'Jeep', 'Hennessey', 'SRT', 'Buick'] },
      { id: 'it', name: 'Italien', code: 'IT', brands: ['Ferrari', 'Lamborghini', 'Maserati', 'Alfa Romeo', 'Pagani', 'Lancia', 'Fiat', 'Abarth'] },
      { id: 'gb', name: 'Grossbritannien', code: 'GB', brands: ['Aston Martin', 'McLaren', 'Jaguar', 'Lotus', 'Bentley', 'TVR', 'BAC', 'Mini', 'Caterham', 'Noble'] },
      { id: 'fr', name: 'Frankreich', code: 'FR', brands: ['Bugatti', 'Alpine', 'Renault', 'Peugeot', 'DS Automobiles'] },
      { id: 'se', name: 'Schweden', code: 'SE', brands: ['Koenigsegg', 'Volvo', 'Polestar'] },
      { id: 'sk', name: 'Suedkorea', code: 'KR', brands: ['Hyundai', 'Kia'] },
      { id: 'au', name: 'Australien', code: 'AU', brands: ['Holden', 'HSV'] },
      { id: 'at', name: 'Oesterreich', code: 'AT', brands: ['KTM'] }
    ],

    classes: [
      { name: 'D-Klasse', code: 'D', min: 100, max: 400 },
      { name: 'C-Klasse', code: 'C', min: 401, max: 500 },
      { name: 'B-Klasse', code: 'B', min: 501, max: 600 },
      { name: 'A-Klasse', code: 'A', min: 601, max: 700 },
      { name: 'S1-Klasse', code: 'S1', min: 701, max: 800 },
      { name: 'S2-Klasse', code: 'S2', min: 801, max: 900 },
      { name: 'R-Klasse', code: 'R', min: 901, max: 998 },
      { name: 'X-Klasse', code: 'X', min: 999, max: 999 }
    ],

    drivetrains: [
      { name: 'RWD', full: 'Heckantrieb', desc: 'Nur Hinterachse' },
      { name: 'AWD', full: 'Allradantrieb', desc: 'Alle 4 Raeder' },
      { name: 'FWD', full: 'Frontantrieb', desc: 'Nur Vorderachse' },
      { name: 'SERIE', full: 'Originalantrieb', desc: 'Kein Antriebs-Swap' }
    ],

    tuningRules: [
      { title: 'Stock Motor Pflicht', desc: 'Kein Motor-Swap erlaubt, Original-Motor tunen' },
      { title: 'Keine Aero-Teile', desc: 'Keine Spoiler, Frontsplitter oder Diffusoren' },
      { title: 'Sauger-Tuning Only', desc: 'Keine Turbolader oder Kompressoren' },
      { title: 'Sleeper Optics', desc: 'Serienoptik & Serienfelgen Pflicht' },
      { title: 'Maximaler Ladedruck', desc: 'Turbo oder Kompressor hoechster Stufe Pflicht' },
      { title: 'Offroad-Profil Pflicht', desc: 'Gelaendereifen und erhoehtes Fahrwerk' },
      { title: 'Drift-Fahrwerk Pflicht', desc: 'Fahrwerk muss auf Drift abgestimmt werden' },
      { title: 'Budget Limit: 50.000 CR', desc: 'Autopreis laut Automesse max. 50.000 CR' },
      { title: 'Budget Limit: 100.000 CR', desc: 'Autopreis laut Automesse max. 100.000 CR' },
      { title: 'Manuelle Schaltung', desc: 'Nur manuelle Gangschaltung erlaubt' },
      { title: 'Gewicht > 1.500 kg', desc: 'Gewichtsreduzierung nicht unter 1.500 kg' },
      { title: 'Leichtbau < 1.200 kg', desc: 'Auto muss unter 1.200 kg gebracht werden' },
      { title: 'Nur Downgrade', desc: 'Nur Leistung reduzieren, kein Upgrade erlaubt' },
      { title: 'Swap Pflicht', desc: 'Motor-Swap ist Pflicht, kein Originalmotor' },
      { title: 'Maximale Breite', desc: 'Breiteste Karosserie-Option muss verbaut werden' },
      { title: 'Freies Tuning', desc: 'Keine zusaetzlichen Tuning-Beschraenkungen' }
    ],

    eras: [
      { name: 'Klassiker (Vor 1980)', code: '<1980' },
      { name: 'Retro (80er & 90er)', code: '80s/90s' },
      { name: 'Modern Classic (2000-2012)', code: '2000s' },
      { name: 'Modern Performance (2013-2020)', code: '2010s' },
      { name: 'Next-Gen (2021+)', code: '2021+' }
    ],

    weatherConditions: [
      { name: 'Sonnig / Trocken', desc: 'Klare Bedingungen, trockene Fahrbahn' },
      { name: 'Leichter Regen', desc: 'Nasse Fahrbahn, leicht reduzierter Grip' },
      { name: 'Starkregen', desc: 'Aquaplaning-Gefahr, deutlich weniger Grip' },
      { name: 'Nacht', desc: 'Nachtrennen, eingeschraenkte Sicht' },
      { name: 'Nacht + Regen', desc: 'Dunkelheit und nasse Fahrbahn kombiniert' },
      { name: 'Sturm', desc: 'Starkregen, Wind und schlechte Sicht' },
      { name: 'Nebel', desc: 'Sichtweite stark eingeschraenkt' },
      { name: 'Schnee / Eis', desc: 'Winterliche Bedingungen, Eis auf der Strecke' }
    ],

    tireCompounds: [
      { name: 'Strassenreifen', desc: 'Standard Strassenreifen Pflicht' },
      { name: 'Sportreifen', desc: 'Sport-Compound Pflicht' },
      { name: 'Rennreifen / Slicks', desc: 'Rennslicks Pflicht' },
      { name: 'Rally-Reifen', desc: 'Offroad/Rally-Reifen Pflicht' },
      { name: 'Drag-Reifen', desc: 'Drag-Slicks hinten Pflicht' },
      { name: 'Winterreifen', desc: 'Winterreifen oder Snow-Compound' },
      { name: 'Serienreifen', desc: 'Original-Reifentyp, kein Wechsel erlaubt' },
      { name: 'Freie Wahl', desc: 'Reifentyp frei waehlbar' }
    ],

    assistRules: [
      { name: 'Keine Assists', desc: 'ABS, TCS und Stabilitaetskontrolle aus' },
      { name: 'Nur ABS', desc: 'Nur ABS erlaubt, TCS und Stabi aus' },
      { name: 'Cockpit-Pflicht', desc: 'Nur Cockpit- oder Stossstangen-Ansicht' },
      { name: 'Kein Rueckspulen', desc: 'Rueckspulen komplett deaktiviert' },
      { name: 'Simulation-Lenkung', desc: 'Simulation-Modus fuer Lenkung Pflicht' },
      { name: 'Nur Bremslinie', desc: 'Einziger Assist: Bremslinie erlaubt' },
      { name: 'Freie Assists', desc: 'Alle Assists frei waehlbar' }
    ],

    // Disziplin-Typen (echte Forza Horizon Kategorien, KEINE erfundenen Strecken)
    // Spezifische Streckennamen kommen nur vom Strecken-Editor (User-Import)
    disciplines: [
      { id: 'drag',    name: 'Drag Race',          typeLabel: 'Viertelmeile',   hint: 'Sucht euch eine Drag Strip / Landebahn auf der Map' },
      { id: 'circuit', name: 'Strassenrennen (Rundkurs)', typeLabel: 'Road Circuit',   hint: 'Waehlt ein Rundstrecken-Event auf der Map' },
      { id: 'sprint',  name: 'Strassenrennen (Sprint)',   typeLabel: 'Road Sprint',    hint: 'Waehlt ein Sprint/Etappen-Event auf der Map' },
      { id: 'drift',   name: 'Driftzone',           typeLabel: 'Horizon Drift',  hint: 'Sucht eine Driftzone auf der Map' },
      { id: 'speed',   name: 'Speed Zone / Blitzer', typeLabel: 'PR-Stunt',       hint: 'Sucht eine Speed Zone oder einen Blitzer' },
      { id: 'jump',    name: 'Gefahrenschild (Sprung)', typeLabel: 'PR-Stunt',    hint: 'Sucht ein Gefahrenschild auf der Map' },
      { id: 'dirt',    name: 'Schotterrennen',       typeLabel: 'Rallye/Dirt',    hint: 'Waehlt ein Dirt-/Schotterrennen auf der Map' },
      { id: 'cross',   name: 'Cross Country',        typeLabel: 'Offroad',        hint: 'Waehlt ein Cross-Country-Event auf der Map' },
      { id: 'trail',   name: 'Horizon Trail',        typeLabel: 'Trail',          hint: 'Waehlt einen Horizon Trail auf der Map' },
      { id: 'playground', name: 'Playground Games',  typeLabel: 'Minispiel',      hint: 'Startet eine Playground Games Session' }
    ],

    // Player accent colors
    playerColors: [
      '#3b82f6', '#10b981', '#f59e0b', '#a855f7',
      '#ec4899', '#06b6d4', '#f97316', '#6366f1'
    ],

    // Mode descriptions
    modeDescriptions: {
      group: 'Alle Spieler: gleiches Land, gleiche Regeln.',
      individual: 'Jeder bekommt ein anderes Land, aber gleiche PI & Regeln. Fair!',
      escalation: 'PI startet niedrig und steigt pro Runde. Gleiches Auto upgraden!',
      chaos: 'Jeder Spieler bekommt komplett andere Regeln. Maximales Chaos!'
    }
  };

  // ==========================================
  // 2. AUDIO SYNTHESIZER
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
  // 1.5 OFFICIAL FH6 EVENT DATASET (128 EVENTS)
  // ==========================================
  var FH6_OFFICIAL_EVENTS = [
    // Street Races (Straßenrennen)
    { name: 'Cedar Run Street Race', mapRegion: 'Discover Japan / Hokubu', type: 'Sprint' },
    { name: 'Daikoku Chase Street Race', mapRegion: 'Discover Japan / Yokohama-Docks', type: 'Sprint' },
    { name: 'Festival Chase Street Race', mapRegion: 'Discover Japan / Festival-Umfeld', type: 'Sprint' },
    { name: 'Hokubu Ascent Street Race', mapRegion: 'Discover Japan / Hokubu', type: 'Sprint' },
    { name: 'Kita Ine Street Race', mapRegion: 'Discover Japan / Ine Kueste', type: 'Sprint' },
    { name: 'Matsumi Climb Street Race', mapRegion: 'Discover Japan / Matsumi', type: 'Sprint' },
    { name: 'Minami Chase Street Race', mapRegion: 'Discover Japan / Minamino', type: 'Sprint' },
    { name: 'Nachi Run Street Race', mapRegion: 'Discover Japan / Nachi', type: 'Sprint' },
    { name: 'Norikura Descent Street Race', mapRegion: 'Discover Japan / Sotoyama', type: 'Sprint' },
    { name: 'Okishinaimura Run Street Race', mapRegion: 'Discover Japan / Laendliche Region', type: 'Sprint' },
    { name: 'Rainbow Bridge Descent Street Race', mapRegion: 'Discover Japan / Tokio-Sued', type: 'Sprint' },
    { name: 'River Descent Street Race', mapRegion: 'Discover Japan / Flussdelta', type: 'Sprint' },
    { name: 'Shimanoyama Charge Street Race', mapRegion: 'Discover Japan / Shimanoyama', type: 'Sprint' },
    { name: 'Sunflower Charge Street Race', mapRegion: 'Discover Japan / Ito Region', type: 'Sprint' },
    { name: 'Tokyo City Docks Charge Street Race', mapRegion: 'Discover Japan / Hafen Tokio', type: 'Sprint' },

    // Road Races & Sprints
    { name: 'Coastline Sprint', mapRegion: 'Horizon Festival / Kuestenstrasse', type: 'Sprint' },
    { name: 'Daikoku Circuit', mapRegion: 'Horizon Festival / Daikoku', type: 'Rundstrecke' },
    { name: 'Electric Town Circuit', mapRegion: 'Horizon Festival / Tokio Akihabara', type: 'Rundstrecke' },
    { name: 'Festival Sprint', mapRegion: 'Horizon Festival / Hauptgelaende', type: 'Sprint' },
    { name: 'Highway Circuit', mapRegion: 'Horizon Festival / Autobahn-Ring', type: 'Rundstrecke' },
    { name: 'Hokubu Circuit', mapRegion: 'Horizon Festival / Hokubu', type: 'Rundstrecke' },
    { name: 'Irokawa Circuit Road Race', mapRegion: 'Horizon Festival / Nangan', type: 'Rundstrecke' },
    { name: 'Ito Sprint', mapRegion: 'Horizon Festival / Ito', type: 'Sprint' },
    { name: 'Legend Island Circuit', mapRegion: 'Horizon Festival / Legend Island', type: 'Rundstrecke' },
    { name: 'Narai-Juku Circuit', mapRegion: 'Horizon Festival / Historisches Dorf', type: 'Rundstrecke' },
    { name: 'Satta Sprint', mapRegion: 'Horizon Festival / Satta Pass', type: 'Sprint' },
    { name: 'Seaside Park Sprint', mapRegion: 'Horizon Festival / Kuestenpark', type: 'Sprint' },
    { name: 'Shikisai Sprint', mapRegion: 'Horizon Festival / Blumenfelder', type: 'Sprint' },
    { name: 'Shimanoyama Circuit', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Rundstrecke' },
    { name: 'Shimanoyama Sprint', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Sprint' },
    { name: 'Shirakawa Circuit', mapRegion: 'Horizon Festival / Shirakawa-go', type: 'Rundstrecke' },
    { name: 'Tateyama Kurobe Sprint', mapRegion: 'Horizon Festival / Alpenregion', type: 'Sprint' },
    { name: 'The Colossus', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Rundstrecke' },
    { name: 'The Goliath', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Rundstrecke' },
    { name: 'Venus Sprint', mapRegion: 'Horizon Festival / Venus Line', type: 'Sprint' },

    // Touge Bergduelle
    { name: 'Arashiyama Takao Touge Race', mapRegion: 'Arashiyama / Takao', type: 'Sprint' },
    { name: 'Bandai Azuma Touge Race', mapRegion: 'Shimanoyama / Bandai Azuma', type: 'Sprint' },
    { name: 'Hakone Nanamagari Touge Race', mapRegion: 'Nangan / Hakone-Pass', type: 'Sprint' },
    { name: 'Mt. Haruna Touge Race', mapRegion: 'Takashiro / Mt. Haruna', type: 'Sprint' },
    { name: 'Norikura Skyline Touge Race', mapRegion: 'Sotoyama / Norikura', type: 'Sprint' },

    // Drag Strips
    { name: 'Horizon Festival Drag Strip', mapRegion: 'Horizon Festival Hauptgelaende', type: 'Drag Race' },
    { name: 'Irokawa Space Center Drag Strip', mapRegion: 'Nangan / Space Center', type: 'Drag Race' },
    { name: 'Ito Airfield Drag Strip', mapRegion: 'Ito / Flugplatz', type: 'Drag Race' },

    // Rallye & Dirt
    { name: 'Airfield Trail', mapRegion: 'Horizon Festival / Ito', type: 'Offroad' },
    { name: 'Bamboo Forest Scramble', mapRegion: 'Horizon Festival / Bambuswald', type: 'Offroad' },
    { name: 'Cherry Field Trail', mapRegion: 'Horizon Festival / Kirschbluetenregion', type: 'Offroad' },
    { name: 'Chiheisen Scramble', mapRegion: 'Horizon Festival / Chiheisen', type: 'Offroad' },
    { name: 'Hirosaki Scramble', mapRegion: 'Horizon Festival / Hirosaki', type: 'Offroad' },
    { name: 'Hokubu Trail', mapRegion: 'Horizon Festival / Hokubu', type: 'Offroad' },
    { name: 'Horizon Stadium Scramble', mapRegion: 'Horizon Festival / Stadion', type: 'Offroad' },
    { name: 'Ine Scramble', mapRegion: 'Horizon Festival / Ine Kueste', type: 'Offroad' },
    { name: 'Ito Trail', mapRegion: 'Horizon Festival / Ito', type: 'Offroad' },
    { name: 'Kawazu Nanadaru Scramble', mapRegion: 'Horizon Festival / Nangan Loop', type: 'Offroad' },
    { name: 'Kinkaku-ji Trail', mapRegion: 'Horizon Festival / Tempelregion', type: 'Offroad' },
    { name: 'Legend Island Trail', mapRegion: 'Horizon Festival / Legend Island', type: 'Offroad' },
    { name: 'Nukabira Trail', mapRegion: 'Horizon Festival / Sotoyama', type: 'Offroad' },
    { name: 'Oyashirazu Trail', mapRegion: 'Horizon Festival / Kuestenklippen', type: 'Offroad' },
    { name: 'Sekibe Scramble', mapRegion: 'Horizon Festival / Sekibe', type: 'Offroad' },
    { name: 'Sotoyama Scramble', mapRegion: 'Horizon Festival / Sotoyama', type: 'Offroad' },
    { name: 'Sunflower Scramble', mapRegion: 'Horizon Festival / Ito', type: 'Offroad' },
    { name: 'Taiyaki Scramble', mapRegion: 'Horizon Festival / Taiyaki', type: 'Offroad' },
    { name: 'Takashiro Trail', mapRegion: 'Horizon Festival / Takashiro', type: 'Offroad' },
    { name: 'The Gauntlet', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Offroad' },

    // Cross Country (Querfeldein)
    { name: 'City Docks Cross Country Circuit', mapRegion: 'Horizon Festival / Hafen Tokio', type: 'Cross Country' },
    { name: 'Edogawa Cross Country Circuit', mapRegion: 'Horizon Festival / Edogawa', type: 'Cross Country' },
    { name: 'Izu Cross Country', mapRegion: 'Horizon Festival / Izu-Halbinsel', type: 'Cross Country' },
    { name: 'Legend Island Cross Country Circuit', mapRegion: 'Horizon Festival / Legend Island', type: 'Cross Country' },
    { name: 'Nangan Cross Country Circuit', mapRegion: 'Horizon Festival / Nangan', type: 'Cross Country' },
    { name: 'Naruo Cross Country Circuit', mapRegion: 'Horizon Festival / Naruo', type: 'Cross Country' },
    { name: 'Oka Cross Country Circuit', mapRegion: 'Horizon Festival / Oka Huegel', type: 'Cross Country' },
    { name: 'Ruriko-ji Cross Country', mapRegion: 'Horizon Festival / Tempelpark', type: 'Cross Country' },
    { name: 'Shimanoyama Cross Country', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Cross Country' },
    { name: 'Shinjuku Gyoen Cross Country', mapRegion: 'Horizon Festival / Park Shinjuku', type: 'Cross Country' },
    { name: 'Snow Forest Cross Country Circuit', mapRegion: 'Horizon Festival / Sotoyama Schnee', type: 'Cross Country' },
    { name: 'Soni Highlands Cross Country', mapRegion: 'Horizon Festival / Soni-Ebene', type: 'Cross Country' },
    { name: 'Takashiro Cross Country', mapRegion: 'Horizon Festival / Takashiro', type: 'Cross Country' },
    { name: 'Tateyama Alpine Cross Country', mapRegion: 'Horizon Festival / Tateyama', type: 'Cross Country' },
    { name: 'Temple Cross Country', mapRegion: 'Horizon Festival / Tempel-Areal', type: 'Cross Country' },
    { name: 'The Titan', mapRegion: 'Horizon Festival / Gelaendeweit', type: 'Cross Country' },
    { name: 'Wind Farm Cross Country', mapRegion: 'Horizon Festival / Windpark', type: 'Cross Country' },
    { name: 'Yahikoyama Cross Country', mapRegion: 'Horizon Festival / Yahiko Berg', type: 'Cross Country' },

    // Driftzonen
    { name: 'Hakone Nanamagari', mapRegion: 'Nangan Region (Serpentinen)', type: 'Driftzone' },
    { name: 'Kawazu Nanadaru Loop Bridge', mapRegion: 'Nangan Region (Spiralkonstruktion)', type: 'Driftzone' },
    { name: 'Bandai Azuma Skyline', mapRegion: 'Shimanoyama Region', type: 'Driftzone' },
    { name: 'Inner City Run', mapRegion: 'Tokio Stadtzentrum', type: 'Driftzone' },
    { name: 'River Run', mapRegion: 'Tokio Hafenbereich', type: 'Driftzone' },
    { name: 'Seaside Trail', mapRegion: 'Ito Region (Suedkueste)', type: 'Driftzone' },
    { name: 'Meoto Iwa Turn', mapRegion: 'Legend Island (Norden)', type: 'Driftzone' },
    { name: 'Kodachi Run', mapRegion: 'Ito Region (Westen)', type: 'Driftzone' },
    { name: 'Sunflower Fields', mapRegion: 'Ito Region (Zentrum)', type: 'Driftzone' },
    { name: 'Shirakawa Curves', mapRegion: 'Minamino Region', type: 'Driftzone' },
    { name: 'Turbine Trail', mapRegion: 'Ito Region (Norden)', type: 'Driftzone' },
    { name: 'Mt. Haruna', mapRegion: 'Takashiro Region (Suedosten)', type: 'Driftzone' },
    { name: 'Cedar Grove', mapRegion: 'Hokubu Region (Norden)', type: 'Driftzone' },
    { name: 'Shiro Switch', mapRegion: 'Sotoyama Region', type: 'Driftzone' },
    { name: 'Nukabira Turn', mapRegion: 'Sotoyama Region (Osten)', type: 'Driftzone' },
    { name: 'Thunderbird', mapRegion: 'Takashiro Region (Nordwesten)', type: 'Driftzone' },
    { name: 'Minamino Horseshoe', mapRegion: 'Minamino Region (Nordwesten)', type: 'Driftzone' },
    { name: 'Red Road', mapRegion: 'Shimanoyama Region', type: 'Driftzone' },
    { name: 'Hairpin', mapRegion: 'Takashiro Bergpass', type: 'Driftzone' },
    { name: 'Tokyo City Docks', mapRegion: 'Tokio Hafen Industrie', type: 'Driftzone' },

    // PR Stunts (Jumps / Blitzer)
    { name: 'Festival Leap', mapRegion: 'Ohtani', type: 'PR-Stunt' },
    { name: 'Mt. Fuji View', mapRegion: 'Ohtani', type: 'PR-Stunt' },
    { name: 'Rollercoaster Leap', mapRegion: 'Minamino', type: 'PR-Stunt' },
    { name: 'Stadium Jump', mapRegion: 'Shimanoyama', type: 'PR-Stunt' },
    { name: 'Highway Jump', mapRegion: 'Shimanoyama', type: 'PR-Stunt' },
    { name: 'Clifftop Crest', mapRegion: 'Sotoyama', type: 'PR-Stunt' },
    { name: 'Alpine Heights', mapRegion: 'Sotoyama', type: 'PR-Stunt' },
    { name: 'Highlands', mapRegion: 'Takashiro', type: 'PR-Stunt' },
    { name: 'Circuit Leap', mapRegion: 'Hokubu', type: 'PR-Stunt' },
    { name: 'Airfield Take-Off', mapRegion: 'Ito Airfield', type: 'PR-Stunt' },
    { name: 'Seaside Heights', mapRegion: 'Ito', type: 'PR-Stunt' },
    { name: 'Tanbo Launch', mapRegion: 'Ito', type: 'PR-Stunt' },
    { name: 'Shirakawa-go', mapRegion: 'Minamino', type: 'PR-Stunt' },
    { name: 'Azure Drive', mapRegion: 'Ito', type: 'PR-Stunt' },
    { name: 'Farmland Falls', mapRegion: 'Takashiro', type: 'PR-Stunt' },
    { name: 'Irokawa Launch', mapRegion: 'Nangan', type: 'PR-Stunt' },
    { name: 'Nangan Heights', mapRegion: 'Nangan', type: 'PR-Stunt' },
    { name: 'Tokyo City Lookout', mapRegion: 'Shimanoyama', type: 'PR-Stunt' },
    { name: 'Tokyo City Dockside', mapRegion: 'Tokio Stadt', type: 'PR-Stunt' },
    { name: 'Railway Bridge', mapRegion: 'Hokubu', type: 'PR-Stunt' },
    { name: 'Bamboo Hilltop', mapRegion: 'Hokubu / Bambuswald', type: 'PR-Stunt' },
    { name: 'Ine Beach', mapRegion: 'Ine Kuestenstrasse', type: 'PR-Stunt' },
    { name: 'Shirakawa-go Straight', mapRegion: 'Minamino / Shirakawa', type: 'PR-Stunt' },
    { name: 'Airfield Runway', mapRegion: 'Ito Airfield', type: 'PR-Stunt' },
    { name: 'Shibuya Crossing', mapRegion: 'Tokio Zentrum', type: 'PR-Stunt' },
    { name: 'Jodogahama Grove', mapRegion: 'Jodogahama Kueste', type: 'PR-Stunt' },
    { name: 'Ocean Highway', mapRegion: 'Kuesten-Autobahn', type: 'PR-Stunt' }
  ];

  // ==========================================
  // 3. LOBBY STORE
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
      var cleanType = (type || 'Rundstrecke').trim();
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
      var t = rawType.toLowerCase();
      if (t.indexOf('drift') !== -1) return 'Driftzone';
      if (t.indexOf('drag') !== -1 || t.indexOf('pull') !== -1 || t.indexOf('0-300') !== -1 || t.indexOf('viertelmeile') !== -1) return 'Drag Race';
      if (t.indexOf('rund') !== -1 || t.indexOf('circuit') !== -1 || t.indexOf('colossus') !== -1 || t.indexOf('goliath') !== -1) return 'Rundstrecke';
      if (t.indexOf('sprint') !== -1 || t.indexOf('etappe') !== -1 || t.indexOf('touge') !== -1 || t.indexOf('street') !== -1) return 'Sprint';
      if (t.indexOf('querfeldein') !== -1 || t.indexOf('cross') !== -1) return 'Cross Country';
      if (t.indexOf('rally') !== -1 || t.indexOf('dirt') !== -1 || t.indexOf('trail') !== -1 || t.indexOf('scramble') !== -1 || t.indexOf('gauntlet') !== -1) return 'Offroad';
      if (t.indexOf('gefahren') !== -1 || t.indexOf('blitzer') !== -1 || t.indexOf('tempo') !== -1 || t.indexOf('stunt') !== -1 || t.indexOf('jump') !== -1) return 'PR-Stunt';
      return this.detectTrackType(name);
    }

    detectTrackType(name) {
      var n = name.toLowerCase();
      if (n.indexOf('drift') !== -1) return 'Driftzone';
      if (n.indexOf('drag') !== -1 || n.indexOf('pull') !== -1 || n.indexOf('0-300') !== -1 || n.indexOf('viertelmeile') !== -1) return 'Drag Race';
      if (n.indexOf('sprint') !== -1 || n.indexOf('etappe') !== -1) return 'Sprint';
      if (n.indexOf('offroad') !== -1 || n.indexOf('rally') !== -1 || n.indexOf('schotter') !== -1 || n.indexOf('dirt') !== -1) return 'Offroad';
      if (n.indexOf('cross') !== -1) return 'Cross Country';
      if (n.indexOf('speed') !== -1 || n.indexOf('blitzer') !== -1 || n.indexOf('sprung') !== -1 || n.indexOf('jump') !== -1) return 'PR-Stunt';
      return 'Rundstrecke';
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
  // 4. UTILITY FUNCTIONS
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

  // ==========================================
  // 5. GENERATOR ENGINE
  // ==========================================
  function generateBaseRules(opts) {
    var piMin = parseInt(opts.piMin) || 100;
    var piMax = parseInt(opts.piMax) || 999;
    if (piMin > piMax) piMin = piMax;

    var piObj = {};
    if (opts.piMode === 'class') {
      // Erst Klasse wuerfeln (aus aktiven Toggles), dann PI innerhalb der Klasse
      var enabledCodes = opts.selectedClasses || [];
      var validClasses = FORZA_DATA.classes.filter(function(c) {
        return enabledCodes.indexOf(c.code) !== -1;
      });
      if (validClasses.length === 0) validClasses = FORZA_DATA.classes;
      var cls = randElem(validClasses);
      var val = randInt(cls.min, cls.max);
      piObj = { code: cls.code, pi: val, text: cls.name + ' (' + val + ' PI)' };
    } else if (opts.piMode === 'range') {
      var val2 = randInt(piMin, piMax);
      var cls2 = getClassForPI(val2);
      piObj = { code: cls2.code, pi: val2, text: 'PI ' + val2 + ' [' + cls2.code + ']' };
    } else {
      // Exakt: fester Ziel-PI (piMin === piMax vom Controller)
      var val3 = piMin;
      var cls3 = getClassForPI(val3);
      piObj = { code: cls3.code, pi: val3, text: 'EXAKT PI ' + val3 };
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
          var t = (ct.type || '').toLowerCase();
          var dId = disc.id.toLowerCase();
          var dName = disc.name.toLowerCase();
          var dTypeLabel = disc.typeLabel.toLowerCase();
          return t.indexOf(dId) !== -1 || dName.indexOf(t) !== -1 || t.indexOf(dTypeLabel) !== -1;
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

  // Generate completely independent rules for Chaos mode
  function generateChaosRules(opts) {
    var chaosMin = parseInt(opts.piMin) || 100;
    var chaosMax = parseInt(opts.piMax) || 999;
    if (chaosMin > chaosMax) chaosMin = chaosMax;
    var piVal = randInt(chaosMin, chaosMax);
    var cls = getClassForPI(piVal);
    var piObj = { code: cls.code, pi: piVal, text: 'PI ' + piVal + ' [' + cls.code + ']' };

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
          var t = (ct.type || '').toLowerCase();
          var dId = disc.id.toLowerCase();
          var dName = disc.name.toLowerCase();
          var dTypeLabel = disc.typeLabel.toLowerCase();
          return t.indexOf(dId) !== -1 || dName.indexOf(t) !== -1 || t.indexOf(dTypeLabel) !== -1;
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
      drivetrain: randElem(FORZA_DATA.drivetrains),
      era: randElem(FORZA_DATA.eras),
      restriction: randElem(FORZA_DATA.tuningRules),
      weather: opts.includeWeather ? randElem(FORZA_DATA.weatherConditions) : null,
      tires: opts.includeTires ? randElem(FORZA_DATA.tireCompounds) : null,
      assists: opts.includeAssists ? randElem(FORZA_DATA.assistRules) : null,
      stages: opts.includeEvent ? stages : []
    };
  }

  function generateSession(players, opts, escalationState) {
    var mode = opts.mode || 'group';

    var availableCountries = FORZA_DATA.countries;
    if (opts.selectedCountries && opts.selectedCountries.length > 0) {
      var filtered = FORZA_DATA.countries.filter(function(c) {
        return opts.selectedCountries.indexOf(c.id) !== -1;
      });
      if (filtered.length > 0) availableCountries = filtered;
    }

    var results = [];

    if (mode === 'chaos') {
      // CHAOS: Everything independently random per player
      var shuffledCountries = availableCountries.slice().sort(function() { return 0.5 - Math.random(); });
      players.forEach(function(p, idx) {
        var playerCountry = shuffledCountries[idx % shuffledCountries.length];
        var chaosRules = generateChaosRules(opts);
        results.push({
          player: p,
          playerIndex: idx,
          challenge: {
            country: playerCountry,
            brand: randElem(playerCountry.brands),
            pi: chaosRules.pi,
            drivetrain: chaosRules.drivetrain,
            era: chaosRules.era,
            restriction: chaosRules.restriction,
            weather: chaosRules.weather,
            tires: chaosRules.tires,
            assists: chaosRules.assists,
            stages: chaosRules.stages
          }
        });
      });
      return results;
    }

    if (mode === 'escalation') {
      // ESCALATION: PI increases each round, shared rules
      // Respektiert den PI-Slider als obere Grenze
      var escalMax = parseInt(opts.piMax) || 999;
      var escalMin = parseInt(opts.piMin) || 100;
      var escalPi;
      if (escalationState.round === 0) {
        // First round: start am unteren Ende des Slider-Bereichs
        var startMax = Math.min(escalMin + 200, escalMax);
        escalPi = randInt(escalMin, startMax);
        escalationState.country = randElem(availableCountries);
      } else {
        // Subsequent rounds: increase PI, aber nie ueber Slider-Max
        var increase = randInt(80, 160);
        escalPi = Math.min(escalMax, escalationState.lastPi + increase);
      }
      escalationState.round++;
      escalationState.lastPi = escalPi;

      var escalCls = getClassForPI(escalPi);
      var escalPiObj = { code: escalCls.code, pi: escalPi, text: 'PI ' + escalPi + ' [' + escalCls.code + ']' };

      // Generate shared rules but with escalation PI
      var escalOpts = Object.assign({}, opts, { piMode: 'exact', piMin: escalPi, piMax: escalPi });
      var escalRules = generateBaseRules(escalOpts);
      escalRules.pi = escalPiObj;

      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          escalationRound: escalationState.round,
          challenge: {
            country: escalationState.country,
            brand: randElem(escalationState.country.brands),
            pi: escalRules.pi,
            drivetrain: escalRules.drivetrain,
            era: escalRules.era,
            restriction: escalRules.restriction,
            weather: escalRules.weather,
            tires: escalRules.tires,
            assists: escalRules.assists,
            stages: escalRules.stages
          }
        });
      });
      return results;
    }

    // GROUP or INDIVIDUAL (VS) mode
    var sharedRules = generateBaseRules(opts);

    if (mode === 'group') {
      var sharedCountry = randElem(availableCountries);
      players.forEach(function(p, idx) {
        results.push({
          player: p,
          playerIndex: idx,
          challenge: {
            country: sharedCountry,
            brand: randElem(sharedCountry.brands),
            pi: sharedRules.pi,
            drivetrain: sharedRules.drivetrain,
            era: sharedRules.era,
            restriction: sharedRules.restriction,
            weather: sharedRules.weather,
            tires: sharedRules.tires,
            assists: sharedRules.assists,
            stages: sharedRules.stages
          }
        });
      });
    } else {
      // INDIVIDUAL (VS): different countries, same rules
      var shuffled = availableCountries.slice().sort(function() { return 0.5 - Math.random(); });
      players.forEach(function(p, idx) {
        var playerCountry = shuffled[idx % shuffled.length];
        results.push({
          player: p,
          playerIndex: idx,
          challenge: {
            country: playerCountry,
            brand: randElem(playerCountry.brands),
            pi: sharedRules.pi,
            drivetrain: sharedRules.drivetrain,
            era: sharedRules.era,
            restriction: sharedRules.restriction,
            weather: sharedRules.weather,
            tires: sharedRules.tires,
            assists: sharedRules.assists,
            stages: sharedRules.stages
          }
        });
      });
    }

    return results;
  }

  // ==========================================
  // 6. APPLICATION CONTROLLER
  // ==========================================
  class AppController {
    constructor() {
      this.mode = 'group';
      this.piMode = 'exact';
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
      this.updatePiModeUI();
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
      this.piExactInput = document.getElementById('pi-exact-input');
      this.piExactVal = document.getElementById('pi-exact-val');
      this.piExactBox = document.getElementById('pi-exact-box');
      this.piMinInput = document.getElementById('pi-min-input');
      this.piMaxInput = document.getElementById('pi-max-input');
      this.piMinVal = document.getElementById('pi-min-val');
      this.piMaxVal = document.getElementById('pi-max-val');
      this.piRangeBox = document.getElementById('pi-range-box');
      this.piClassBox = document.getElementById('pi-class-box');
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

      // PI mode
      document.querySelectorAll('.pi-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          audio.click();
          document.querySelectorAll('.pi-btn').forEach(function(b) { b.classList.remove('active'); });
          e.currentTarget.classList.add('active');
          self.piMode = e.currentTarget.dataset.piMode;
          self.updatePiModeUI();
        });
      });

      // PI range sliders
      this.piExactInput.addEventListener('input', function() {
        self.piExactVal.textContent = self.piExactInput.value;
      });
      this.piMinInput.addEventListener('input', function() {
        var min = parseInt(self.piMinInput.value);
        var max = parseInt(self.piMaxInput.value);
        if (min > max) { min = max; self.piMinInput.value = min; }
        self.piMinVal.textContent = min;
      });
      this.piMaxInput.addEventListener('input', function() {
        var min = parseInt(self.piMinInput.value);
        var max = parseInt(self.piMaxInput.value);
        if (max < min) { max = min; self.piMaxInput.value = max; }
        self.piMaxVal.textContent = max;
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
        self.btnToggleCountries.textContent = !allChecked ? 'Alle abwaehlen' : 'Alle auswaehlen';
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
        var type = self.inputTrackType ? self.inputTrackType.value : 'Rundstrecke';
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
        this.setPiMode('range');
        this.piMinInput.value = 800;
        this.piMaxInput.value = 999;
        this.piMinVal.textContent = 800;
        this.piMaxVal.textContent = 999;
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
        this.setPiMode('range');
        this.piMinInput.value = 300;
        this.piMaxInput.value = 600;
        this.piMinVal.textContent = 300;
        this.piMaxVal.textContent = 600;
        this.chkRestriction.checked = true;
        this.toast('Preset: Budget Build');
      }
      this.renderCountries();
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
        var pi = randInt(100, 999);
        var cls = getClassForPI(pi);
        label = 'PI-Zahl';
        value = pi + ' (' + cls.name + ')';
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
        var typeBadge = t.type ? '<span style="font-size:0.68rem; color:var(--accent); font-weight:600; margin-left:6px;">[' + self.escape(t.type) + ']</span>' : '';
        return '<div style="background:var(--bg-inset); border:1px solid var(--border-dim); padding:6px 10px; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">' +
          '<div style="display:flex; flex-direction:column;">' +
            '<div><strong style="font-size:0.78rem; color:var(--text-1);">' + self.escape(t.name) + '</strong>' + typeBadge + '</div>' +
            '<span style="font-size:0.7rem; color:var(--text-3);">' + self.escape(t.mapRegion) + '</span>' +
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
          '<span>' + c.name + ' [' + c.code + ']</span>' +
        '</label>';
      }).join('');

      this.countryGrid.querySelectorAll('input[type="checkbox"]').forEach(function(chk) {
        chk.addEventListener('change', function() { self.updateCountries(); });
      });
    }

    updateCountries() {
      this.selectedCountries = Array.from(this.countryGrid.querySelectorAll('input:checked')).map(function(i) { return i.value; });
    }

    // --- CLASSES ---
    updatePiModeUI() {
      var mode = this.piMode;
      this.piExactBox.classList.toggle('hidden', mode !== 'exact');
      this.piRangeBox.classList.toggle('hidden', mode !== 'range');
      this.piClassBox.classList.toggle('hidden', mode !== 'class');
    }

    setPiMode(mode) {
      this.piMode = mode;
      document.querySelectorAll('.pi-btn').forEach(function(b) {
        b.classList.toggle('active', b.dataset.piMode === mode);
      });
      this.updatePiModeUI();
    }

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
      if (this.piMode === 'class' && this.selectedClasses.length === 0) {
        this.toast('Bitte mindestens eine Klasse waehlen');
        return;
      }

      var players = lobby.players.length > 0 ? lobby.players : ['Spieler 1'];
      var piMin, piMax;
      if (this.piMode === 'exact') {
        piMin = piMax = parseInt(this.piExactInput.value) || 700;
      } else {
        piMin = parseInt(this.piMinInput.value);
        piMax = parseInt(this.piMaxInput.value);
      }
      var opts = {
        mode: this.mode,
        piMode: this.piMode,
        piMin: piMin,
        piMax: piMax,
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
        html += '<span class="val">' + c.country.name + ' [' + c.country.code + ']</span>';
        html += '<span class="sub">z.B. ' + c.brand + '</span></div>';

        html += '<div class="spec-item"><span class="lbl">PI Target</span>';
        html += '<span class="val" style="color:var(--accent);">' + c.pi.text + '</span></div>';

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
            html += '<div class="event-block">';
            html += '<div style="display:flex; justify-content:space-between; align-items:baseline;">';
            html += '<span class="ev-name">' + (c.stages.length > 1 ? 'Etappe ' + st.stageNum + ': ' : '') + st.name + '</span>';
            html += '<span style="font-size:0.68rem; color:var(--text-3);">' + st.typeLabel + '</span>';
            html += '</div>';
            html += '<div class="ev-track">' + st.trackName + '</div>';
            if (st.mapRegion) { html += '<div class="ev-region">Region: ' + st.mapRegion + '</div>'; }
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

      this.historyList.innerHTML = this.history.map(function(h) {
        var c = h.results[0].challenge;
        var stagesLabel = c.stages && c.stages.length > 1 ? c.stages.length + '-Etappen Cup' : 'Einzel-Event';
        var modeLabel = h.mode === 'chaos' ? ' [Chaos]' : h.mode === 'escalation' ? ' [Eskalation]' : '';
        return '<div class="history-entry">' +
          '<div>' +
            '<strong>' + c.country.name + ' [' + c.country.code + '] \u2014 ' + c.pi.text + '</strong>' +
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
        text += 'PI TARGET: ' + c.pi.text + '\n';
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
