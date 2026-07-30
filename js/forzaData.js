// Forza Horizon 6 - shared challenge data
var FORZA_DATA = {
    countries: [
      { id: 'de', name: 'Deutschland', code: 'DE', brands: ['BMW', 'Porsche', 'Audi', 'Mercedes-AMG', 'Volkswagen', 'Opel', 'Ruf', 'ALPINA'] },
      { id: 'jp', name: 'Japan', code: 'JP', brands: ['Nissan', 'Toyota', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru', 'Lexus', 'Infiniti', 'Nissan NISMO'] },
      { id: 'us', name: 'USA', code: 'US', brands: ['Ford', 'Chevrolet', 'Dodge', 'Shelby', 'Cadillac', 'Pontiac', 'Jeep', 'Hennessey', 'SRT', 'Buick'] },
      { id: 'it', name: 'Italien', code: 'IT', brands: ['Ferrari', 'Lamborghini', 'Maserati', 'Alfa Romeo', 'Pagani', 'Lancia', 'Fiat', 'Abarth'] },
      { id: 'gb', name: 'UK', code: 'GB', brands: ['Aston Martin', 'McLaren', 'Jaguar', 'Lotus', 'Bentley', 'TVR', 'BAC', 'Mini', 'Caterham', 'Noble'] },
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
