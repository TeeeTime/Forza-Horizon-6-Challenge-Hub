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

    // Disziplin-Typen — typeLabel muss den Event-Typen in FH6_OFFICIAL_EVENTS entsprechen
    disciplines: [
      { id: 'street',       name: 'Street Race',              typeLabel: 'Street',       hint: 'Waehlt ein Street-Race auf der Map' },
      { id: 'track',        name: 'Track Race',               typeLabel: 'Track',        hint: 'Waehlt ein Track-/Rundstrecken-Event auf der Map' },
      { id: 'touge',        name: 'Touge',                    typeLabel: 'Touge',        hint: 'Waehlt ein Touge-Duell auf der Map' },
      { id: 'drag',         name: 'Drag Race',                typeLabel: 'Drag Race',    hint: 'Sucht euch eine Drag Strip / Landebahn auf der Map' },
      { id: 'dirt',         name: 'Dirt / Rallye',            typeLabel: 'Dirt',         hint: 'Waehlt ein Dirt-/Schotterrennen auf der Map' },
      { id: 'crosscountry', name: 'Cross Country',            typeLabel: 'Crosscountry', hint: 'Waehlt ein Cross-Country-Event auf der Map' },
      { id: 'drift',        name: 'Driftzone',                typeLabel: 'Driftzone',    hint: 'Sucht eine Driftzone auf der Map' },
      { id: 'jump',         name: 'Jump / Gefahrenschild',    typeLabel: 'Jump',         hint: 'Sucht ein Gefahrenschild / Jump auf der Map' },
      { id: 'speedtrap',    name: 'Speed Trap / Blitzer',     typeLabel: 'Speedtrap',    hint: 'Sucht einen Speed Trap / Blitzer auf der Map' },
      { id: 'trailblazer',  name: 'Trailblazer',              typeLabel: 'Trailblazer',  hint: 'Sucht einen Trailblazer auf der Map' },
      { id: 'speedzone',    name: 'Speed Zone',               typeLabel: 'Speedzone',    hint: 'Sucht eine Speed Zone auf der Map' }
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
    // Street Races
    { name: 'Cedar Run Street Race', mapRegion: 'Discover Japan / Hokubu', type: 'Street' },
    { name: 'Daikoku Chase Street Race', mapRegion: 'Discover Japan / Yokohama-Docks', type: 'Street' },
    { name: 'Festival Chase Street Race', mapRegion: 'Discover Japan / Festival-Umfeld', type: 'Street' },
    { name: 'Hokubu Ascent Street Race', mapRegion: 'Discover Japan / Hokubu', type: 'Street' },
    { name: 'Kita Ine Street Race', mapRegion: 'Discover Japan / Ine Kueste', type: 'Street' },
    { name: 'Matsumi Climb Street Race', mapRegion: 'Discover Japan / Matsumi', type: 'Street' },
    { name: 'Minami Chase Street Race', mapRegion: 'Discover Japan / Minamino', type: 'Street' },
    { name: 'Nachi Run Street Race', mapRegion: 'Discover Japan / Nachi', type: 'Street' },
    { name: 'Norikura Descent Street Race', mapRegion: 'Discover Japan / Sotoyama', type: 'Street' },
    { name: 'Okishinaimura Run Street Race', mapRegion: 'Discover Japan / Laendliche Region', type: 'Street' },
    { name: 'Rainbow Bridge Descent Street Race', mapRegion: 'Discover Japan / Tokio-Sued', type: 'Street' },
    { name: 'River Descent Street Race', mapRegion: 'Discover Japan / Flussdelta', type: 'Street' },
    { name: 'Shimanoyama Charge Street Race', mapRegion: 'Discover Japan / Shimanoyama', type: 'Street' },
    { name: 'Sunflower Charge Street Race', mapRegion: 'Discover Japan / Ito Region', type: 'Street' },
    { name: 'Tokyo City Docks Charge Street Race', mapRegion: 'Discover Japan / Hafen Tokio', type: 'Street' },

    // Road Races
    { name: 'Coastline Sprint', mapRegion: 'Horizon Festival / Kuestenstrasse', type: 'Track' },
    { name: 'Daikoku Circuit', mapRegion: 'Horizon Festival / Daikoku', type: 'Track' },
    { name: 'Electric Town Circuit', mapRegion: 'Horizon Festival / Tokio Akihabara', type: 'Track' },
    { name: 'Festival Sprint', mapRegion: 'Horizon Festival / Hauptgelaende', type: 'Track' },
    { name: 'Highway Circuit', mapRegion: 'Horizon Festival / Autobahn-Ring', type: 'Track' },
    { name: 'Hokubu Circuit', mapRegion: 'Horizon Festival / Hokubu', type: 'Track' },
    { name: 'Irokawa Circuit Road Race', mapRegion: 'Horizon Festival / Nangan', type: 'Track' },
    { name: 'Ito Sprint', mapRegion: 'Horizon Festival / Ito', type: 'Track' },
    { name: 'Legend Island Circuit', mapRegion: 'Horizon Festival / Legend Island', type: 'Track' },
    { name: 'Narai-Juku Circuit', mapRegion: 'Horizon Festival / Historisches Dorf', type: 'Track' },
    { name: 'Satta Sprint', mapRegion: 'Horizon Festival / Satta Pass', type: 'Track' },
    { name: 'Seaside Park Sprint', mapRegion: 'Horizon Festival / Kuestenpark', type: 'Track' },
    { name: 'Shikisai Sprint', mapRegion: 'Horizon Festival / Blumenfelder', type: 'Track' },
    { name: 'Shimanoyama Circuit', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Track' },
    { name: 'Shimanoyama Sprint', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Track' },
    { name: 'Shirakawa Circuit', mapRegion: 'Horizon Festival / Shirakawa-go', type: 'Track' },
    { name: 'Tateyama Kurobe Sprint', mapRegion: 'Horizon Festival / Alpenregion', type: 'Track' },
    { name: 'The Colossus', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Track' },
    { name: 'The Goliath', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Track' },
    { name: 'Venus Sprint', mapRegion: 'Horizon Festival / Venus Line', type: 'Track' },

    // Touge Races
    { name: 'Arashiyama Takao Touge Race', mapRegion: 'Arashiyama / Takao', type: 'Touge' },
    { name: 'Bandai Azuma Touge Race', mapRegion: 'Shimanoyama / Bandai Azuma', type: 'Touge' },
    { name: 'Hakone Nanamagari Touge Race', mapRegion: 'Nangan / Hakone-Pass', type: 'Touge' },
    { name: 'Mt. Haruna Touge Race', mapRegion: 'Takashiro / Mt. Haruna', type: 'Touge' },
    { name: 'Norikura Skyline Touge Race', mapRegion: 'Sotoyama / Norikura', type: 'Touge' },

    // Drag Strips
    { name: 'Horizon Festival Drag Strip', mapRegion: 'Horizon Festival Hauptgelaende', type: 'Drag Race' },
    { name: 'Irokawa Space Center Drag Strip', mapRegion: 'Nangan / Space Center', type: 'Drag Race' },
    { name: 'Ito Airfield Drag Strip', mapRegion: 'Ito / Flugplatz', type: 'Drag Race' },

    // Dirt Races
    { name: 'Airfield Trail', mapRegion: 'Horizon Festival / Ito', type: 'Dirt' },
    { name: 'Bamboo Forest Scramble', mapRegion: 'Horizon Festival / Bambuswald', type: 'Dirt' },
    { name: 'Cherry Field Trail', mapRegion: 'Horizon Festival / Kirschbluetenregion', type: 'Dirt' },
    { name: 'Chiheisen Scramble', mapRegion: 'Horizon Festival / Chiheisen', type: 'Dirt' },
    { name: 'Hirosaki Scramble', mapRegion: 'Horizon Festival / Hirosaki', type: 'Dirt' },
    { name: 'Hokubu Trail', mapRegion: 'Horizon Festival / Hokubu', type: 'Dirt' },
    { name: 'Horizon Stadium Scramble', mapRegion: 'Horizon Festival / Stadion', type: 'Dirt' },
    { name: 'Ine Scramble', mapRegion: 'Horizon Festival / Ine Kueste', type: 'Dirt' },
    { name: 'Ito Trail', mapRegion: 'Horizon Festival / Ito', type: 'Dirt' },
    { name: 'Kawazu Nanadaru Scramble', mapRegion: 'Horizon Festival / Nangan Loop', type: 'Dirt' },
    { name: 'Kinkaku-ji Trail', mapRegion: 'Horizon Festival / Tempelregion', type: 'Dirt' },
    { name: 'Legend Island Trail', mapRegion: 'Horizon Festival / Legend Island', type: 'Dirt' },
    { name: 'Nukabira Trail', mapRegion: 'Horizon Festival / Sotoyama', type: 'Dirt' },
    { name: 'Oyashirazu Trail', mapRegion: 'Horizon Festival / Kuestenklippen', type: 'Dirt' },
    { name: 'Sekibe Scramble', mapRegion: 'Horizon Festival / Sekibe', type: 'Dirt' },
    { name: 'Sotoyama Scramble', mapRegion: 'Horizon Festival / Sotoyama', type: 'Dirt' },
    { name: 'Sunflower Scramble', mapRegion: 'Horizon Festival / Ito', type: 'Dirt' },
    { name: 'Taiyaki Scramble', mapRegion: 'Horizon Festival / Taiyaki', type: 'Dirt' },
    { name: 'Takashiro Trail', mapRegion: 'Horizon Festival / Takashiro', type: 'Dirt' },
    { name: 'The Gauntlet', mapRegion: 'Horizon Festival / Karteuebergreifend', type: 'Dirt' },

    // Cross Country Races
    { name: 'City Docks Cross Country Circuit', mapRegion: 'Horizon Festival / Hafen Tokio', type: 'Crosscountry' },
    { name: 'Edogawa Cross Country Circuit', mapRegion: 'Horizon Festival / Edogawa', type: 'Crosscountry' },
    { name: 'Izu Cross Country', mapRegion: 'Horizon Festival / Izu-Halbinsel', type: 'Crosscountry' },
    { name: 'Legend Island Cross Country Circuit', mapRegion: 'Horizon Festival / Legend Island', type: 'Crosscountry' },
    { name: 'Nangan Cross Country Circuit', mapRegion: 'Horizon Festival / Nangan', type: 'Crosscountry' },
    { name: 'Naruo Cross Country Circuit', mapRegion: 'Horizon Festival / Naruo', type: 'Crosscountry' },
    { name: 'Oka Cross Country Circuit', mapRegion: 'Horizon Festival / Oka Huegel', type: 'Crosscountry' },
    { name: 'Ruriko-ji Cross Country', mapRegion: 'Horizon Festival / Tempelpark', type: 'Crosscountry' },
    { name: 'Shimanoyama Cross Country', mapRegion: 'Horizon Festival / Shimanoyama', type: 'Crosscountry' },
    { name: 'Shinjuku Gyoen Cross Country', mapRegion: 'Horizon Festival / Park Shinjuku', type: 'Crosscountry' },
    { name: 'Snow Forest Cross Country Circuit', mapRegion: 'Horizon Festival / Sotoyama Schnee', type: 'Crosscountry' },
    { name: 'Soni Highlands Cross Country', mapRegion: 'Horizon Festival / Soni-Ebene', type: 'Crosscountry' },
    { name: 'Takashiro Cross Country', mapRegion: 'Horizon Festival / Takashiro', type: 'Crosscountry' },
    { name: 'Tateyama Alpine Cross Country', mapRegion: 'Horizon Festival / Tateyama', type: 'Crosscountry' },
    { name: 'Temple Cross Country', mapRegion: 'Horizon Festival / Tempel-Areal', type: 'Crosscountry' },
    { name: 'The Titan', mapRegion: 'Horizon Festival / Gelaendeweit', type: 'Crosscountry' },
    { name: 'Wind Farm Cross Country', mapRegion: 'Horizon Festival / Windpark', type: 'Crosscountry' },
    { name: 'Yahikoyama Cross Country', mapRegion: 'Horizon Festival / Yahiko Berg', type: 'Crosscountry' },

    // Driftzones
    { name: 'Bandai Azuma Skyline', mapRegion: 'Shimanoyama', type: 'Driftzone' },
    { name: 'Inner City Run', mapRegion: 'Tokio City', type: 'Driftzone' },
    { name: 'Kawazu Nanadaru Loop Bridge', mapRegion: 'Nangan', type: 'Driftzone' },
    { name: 'Red Road', mapRegion: 'Shimanoyama', type: 'Driftzone' },
    { name: 'Minamino Horseshoe', mapRegion: 'Minamino', type: 'Driftzone' },
    { name: 'Nukabira Turn', mapRegion: 'Sotoyama', type: 'Driftzone' },
    { name: 'Shiro Switch', mapRegion: 'Sotoyama', type: 'Driftzone' },
    { name: 'Thunderbird', mapRegion: 'Takashiro', type: 'Driftzone' },
    { name: 'Cedar Grove', mapRegion: 'Hokubu', type: 'Driftzone' },
    { name: 'Hakone Nanamagari', mapRegion: 'Nangan', type: 'Driftzone' },
    { name: 'Seaside Trail', mapRegion: 'Ito', type: 'Driftzone' },
    { name: 'Shirakawa Curves', mapRegion: 'Minamino', type: 'Driftzone' },
    { name: 'Turbine Trail', mapRegion: 'Ito', type: 'Driftzone' },
    { name: 'Mt. Haruna', mapRegion: 'Takashiro', type: 'Driftzone' },
    { name: 'Hairpin', mapRegion: 'Shimanoyama', type: 'Driftzone' },
    { name: 'River Run', mapRegion: 'Ohtani', type: 'Driftzone' },
    { name: 'Kodachi Run', mapRegion: 'Ito', type: 'Driftzone' },
    { name: 'Tokyo City Docks', mapRegion: 'Tokio City', type: 'Driftzone' },
    { name: 'Sunflower Fields', mapRegion: 'Ito', type: 'Driftzone' },
    { name: 'Meoto Iwa Turn', mapRegion: 'Ito', type: 'Driftzone' },
    
    // Jumps
    { name: 'Festival Leap', mapRegion: 'Ohtani', type: 'Jump' },
    { name: 'Mt. Fuji View', mapRegion: 'Ohtani', type: 'Jump' },
    { name: 'Rollercoaster Leap', mapRegion: 'Minamino', type: 'Jump' },
    { name: 'Stadium Jump', mapRegion: 'Shimanoyama', type: 'Jump' },
    { name: 'Highway Jump', mapRegion: 'Shimanoyama', type: 'Jump' },
    { name: 'Clifftop Crest', mapRegion: 'Sotoyama', type: 'Jump' },
    { name: 'Alpine Heights', mapRegion: 'Sotoyama', type: 'Jump' },
    { name: 'Highlands', mapRegion: 'Takashiro', type: 'Jump' },
    { name: 'Circuit Leap', mapRegion: 'Hokubu', type: 'Jump' },
    { name: 'Airfield Take-Off', mapRegion: 'Ito Airfield', type: 'Jump' },
    { name: 'Seaside Heights', mapRegion: 'Ito', type: 'Jump' },
    { name: 'Tanbo Launch', mapRegion: 'Ito', type: 'Jump' },
    { name: 'Shirakawa-go', mapRegion: 'Minamino', type: 'Jump' },
    { name: 'Azure Drive', mapRegion: 'Ito', type: 'Jump' },
    { name: 'Farmland Falls', mapRegion: 'Takashiro', type: 'Jump' },
    { name: 'Irokawa Launch', mapRegion: 'Nangan', type: 'Jump' },
    { name: 'Nangan Heights', mapRegion: 'Nangan', type: 'Jump' },
    { name: 'Tokyo City Lookout', mapRegion: 'Shimanoyama', type: 'Jump' },
    { name: 'Tokyo City Dockside', mapRegion: 'Tokio City', type: 'Jump' },
    { name: 'Railway Bridge', mapRegion: 'Hokubu', type: 'Jump' },

    // Speedtraps
    { name: 'River Split', mapRegion: 'Minamino', type: 'Speedtrap' },
    { name: 'Lakeside Valley', mapRegion: 'Shimanoyama', type: 'Speedtrap' },
    { name: 'Rainbow Run', mapRegion: 'Tokyo City', type: 'Speedtrap' },
    { name: 'Ito Straight', mapRegion: 'Ito', type: 'Speedtrap' },
    { name: 'Tokyo City Run-Up', mapRegion: 'Ohtani', type: 'Speedtrap' },
    { name: 'Festival Line', mapRegion: 'Ohtani', type: 'Speedtrap' },
    { name: 'Flower Run', mapRegion: 'Hokubu', type: 'Speedtrap' },
    { name: 'Crossover', mapRegion: 'Takashiro', type: 'Speedtrap' },
    { name: 'Hirosaki Castle', mapRegion: 'Takashiro', type: 'Speedtrap' },
    { name: 'Highland Road', mapRegion: 'Takashiro', type: 'Speedtrap' },
    { name: 'Takashiro Bridge', mapRegion: 'Takashiro', type: 'Speedtrap' },
    { name: 'Irabu Ohashi Bridge', mapRegion: 'Hokubu', type: 'Speedtrap' },
    { name: 'Shirakawa-go Straight', mapRegion: 'Minamino', type: 'Speedtrap' },
    { name: 'Akihabara Straight', mapRegion: 'Tokyo City', type: 'Speedtrap' },
    { name: 'Nangan Turn', mapRegion: 'Nangan', type: 'Speedtrap' },
    { name: 'Lake View', mapRegion: 'Shimanoyama', type: 'Speedtrap' },
    { name: 'Airfield Runway', mapRegion: 'Ito', type: 'Speedtrap' },
    { name: 'Ine Beach', mapRegion: 'Ito', type: 'Speedtrap' },
    { name: 'Bamboo Hilltop', mapRegion: 'Hokubu', type: 'Speedtrap' },
    { name: 'Crop Fields', mapRegion: 'Takashiro', type: 'Speedtrap' },
    { name: 'Daikoku Parking Area', mapRegion: 'Tokyo City', type: 'Speedtrap' },
    { name: 'Jodogahama Grove', mapRegion: 'Nagan', type: 'Speedtrap' },
    { name: 'Izu Skyline', mapRegion: 'Nagan', type: 'Speedtrap' },
    { name: 'Stadium Back Road', mapRegion: 'Shimanoyama', type: 'Speedtrap' },
    { name: 'Main Street', mapRegion: 'Shimanoyama', type: 'Speedtrap' },
    { name: 'Riverside', mapRegion: 'Ohtani', type: 'Speedtrap' },
    { name: 'Cedar Woodland', mapRegion: 'Minamino', type: 'Speedtrap' },
    { name: 'Shibuya Crossing', mapRegion: 'Tokyo City', type: 'Speedtrap' },
    { name: 'Snowbank', mapRegion: 'Sotoyama', type: 'Speedtrap' },
    { name: 'Island Road', mapRegion: 'Legend Island', type: 'Speedtrap' },

    // Trailblazer
    { name: 'Bridge Underpasses', mapRegion: 'Ohtani', type: 'Trailblazer' },
    { name: 'Kodachi Descent', mapRegion: 'Shimanoyama', type: 'Trailblazer' },
    { name: 'Nachi Falls', mapRegion: 'Sotoyama', type: 'Trailblazer' },
    { name: 'Mountain Descent', mapRegion: 'Takashiro', type: 'Trailblazer' },
    { name: 'Forest Cut-Through', mapRegion: 'Hokubu', type: 'Trailblazer' },
    { name: 'Coastal Descent', mapRegion: 'Nangan', type: 'Trailblazer' },
    { name: 'Ropeway Run', mapRegion: 'Ito', type: 'Trailblazer' },
    { name: 'Kudarizaka', mapRegion: 'Ohtani', type: 'Trailblazer' },
    { name: 'On Par', mapRegion: 'Minamino', type: 'Trailblazer' },
    { name: 'Sekibe Kaijo', mapRegion: 'Ito', type: 'Trailblazer' },
    { name: 'Horizon Kaido', mapRegion: 'Sotoyama', type: 'Trailblazer' },

    //Speedzone
    { name: 'Highway View', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Festival Loop', mapRegion: 'Ohtani', type: 'Speedzone' },
    { name: 'Pylons', mapRegion: 'Ohtani', type: 'Speedzone' },
    { name: 'Yahikoyama Curve', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Fuji Shibazakura', mapRegion: 'Shimanoyama', type: 'Speedzone' },
    { name: 'Mountain Pass', mapRegion: 'Shimanoyama', type: 'Speedzone' },
    { name: 'Kōzokudō', mapRegion: 'Hokubu', type: 'Speedzone' },
    { name: 'Temple Run-Up', mapRegion: 'Takashiro', type: 'Speedzone' },
    { name: 'Snow Slopes', mapRegion: 'Sotoyama', type: 'Speedzone' },
    { name: 'Tateyama Kurobe Alpine Route', mapRegion: 'Sotoyama', type: 'Speedzone' },
    { name: 'Hirosaki Tangle', mapRegion: 'Takashiro', type: 'Speedzone' },
    { name: 'Tea Farm', mapRegion: 'Takashiro', type: 'Speedzone' },
    { name: 'Okishinaimura', mapRegion: 'Hokubu', type: 'Speedzone' },
    { name: 'Yama Trail', mapRegion: 'Ohtani', type: 'Speedzone' },
    { name: 'Farmland Curve', mapRegion: 'Minamino', type: 'Speedzone' },
    { name: 'Ocean Highway', mapRegion: 'Tokyo City', type: 'Speedzone' },
    { name: 'Seaside Park', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Hanado', mapRegion: 'Minamino', type: 'Speedzone' },
    { name: 'Arashiyama Run', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Minamino Curve', mapRegion: 'Minamino', type: 'Speedzone' },
    { name: 'Tall Trees', mapRegion: 'Hokubu', type: 'Speedzone' },
    { name: 'Deep Forest', mapRegion: 'Takashiro', type: 'Speedzone' },
    { name: 'Hakone Turns', mapRegion: 'Nangan', type: 'Speedzone' },
    { name: 'Matsumi Curve', mapRegion: 'Ohtani', type: 'Speedzone' },
    { name: 'Airfield Grove', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Forest Straight', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'City Sights', mapRegion: 'Tokyo City', type: 'Speedzone' },
    { name: 'Underground Tunnel', mapRegion: 'Tokyo City', type: 'Speedzone' },
    { name: 'Ine Backstreet', mapRegion: 'Ito', type: 'Speedzone' },
    { name: 'Coastal Cliffside', mapRegion: 'Legend Island', type: 'Speedzone' }

  ];

// SVG icons per event type (inline, currentColor)
var EVENT_TYPE_ICONS = {
  Driftzone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.5 11h1c.3 0 .5-.2.5-.5V9h8v1.5c0 .3.2.5.5.5h1c.3 0 .5-.2.5-.5V6l-1.4-4.3c-.1-.4-.5-.7-.9-.7h-7.3c-.4 0-.8.3-.9.7L9 6v4.5c0 .3.2.5.5.5m1.8-9h7.3l.9 3h-9.1zm.7 21h-2c0-.8-1.9-1.5-3.4-2.1C4.5 20.1 2 19.2 2 17c0-2.3 2.3-2.9 4.2-3.5C7.9 13.1 9 12.7 9 12h2c0 2.3-2.3 2.9-4.2 3.5c-1.7.4-2.8.8-2.8 1.5c0 .8 1.9 1.5 3.4 2.1c2.1.8 4.6 1.7 4.6 3.9m10 0h-2c0-.8-1.9-1.5-3.4-2.1c-2.1-.8-4.6-1.7-4.6-3.9c0-2.3 2.3-2.9 4.2-3.5c1.6-.5 2.8-.8 2.8-1.5h2c0 2.3-2.3 2.9-4.2 3.5c-1.6.4-2.8.8-2.8 1.5c0 .8 1.9 1.5 3.4 2.1c2.1.8 4.6 1.7 4.6 3.9"/></svg>',
  Touge: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M149 24.32L123 124.4l27.8 44.8l15.9-29.4l37.5 30.9l17.5-55.5zm169.7 43.7l-32.2 48.38l10.7 25.5l21.9-21.7l18.1 42.8l10.3-21.7zm-83.4 64.18l-21.9 69.3l-41.3-33.9L152 205l-35.2-56.7l-88.38 339.4H154.9c45.6-17 135.3-56.7 137.2-106.3c1.7-47.8-108.9-43.4-110.8-91.2c-1.5-39.1 84.5-81.5 84.5-81.5s-54.1 43.3-47.4 71c12.9 53 125.6 27.6 143.2 79.3c13 38.2-33.5 104.3-52.2 128.7h174.2L356.5 164.3L336.4 207l-23.5-55.4l-22.1 21.9l-16.3-39.1l-17 25.5z"/></svg>',
  Dirt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.438 18.938Q9 18.875 9 18.5q0-.425.438-.712T10.5 17.5t1.063.288t.437.712q0 .375-.437.438T10.5 19t-1.062-.062m8 2Q17 20.875 17 20.5q0-.425.438-.712T18.5 19.5t1.063.288t.437.712q0 .375-.437.438T18.5 21t-1.062-.062m-5 0Q12 20.875 12 20.5q0-.425.438-.712T13.5 19.5t1.063.288t.437.712q0 .375-.437.438T13.5 21t-1.062-.062m-8 0Q4 20.875 4 20.5q0-.425.438-.712T5.5 19.5t1.063.288T7 20.5q0 .375-.437.438T5.5 21t-1.062-.062m4 1Q8 21.875 8 21.5q0-.425.438-.712T9.5 20.5t1.063.288t.437.712q0 .375-.437.438T9.5 22t-1.062-.062M6 16v1q0 .425-.288.713T5 18H4q-.425 0-.712-.288T3 17V9l2.1-6q.15-.45.538-.725T6.5 2h11q.475 0 .863.275T18.9 3L21 9v8q0 .425-.287.713T20 18h-1q-.425 0-.712-.288T18 17v-1zm-.2-9h12.4l-1.05-3H6.85zm1.7 6q.625 0 1.063-.437T9 11.5t-.437-1.062T7.5 10t-1.062.438T6 11.5t.438 1.063T7.5 13m9 0q.625 0 1.063-.437T18 11.5t-.437-1.062T16.5 10t-1.062.438T15 11.5t.438 1.063T16.5 13"/></svg>',
  Crosscountry: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m14.81 3.4l-5.42.96l.7 3.94L.733 9.95l.867 4.92l1.97-.34c.14.78.58 1.47 1.24 1.93c.65.46 1.45.64 2.24.5c.78-.14 1.48-.58 1.95-1.23c.44-.66.62-1.46.5-2.23l5.89-1.06c.14.79.58 1.48 1.23 1.94c.65.45 1.46.62 2.24.5c.79-.14 1.48-.59 1.94-1.24c.46-.64.64-1.46.5-2.24l1.97-.35l-.52-2.95c-.2-1.1-1.25-1.82-2.32-1.6l-1.97.32zm-3.68 2.18l3.45-.61l2.36 2.12l-5.37.95zm-4.86 6.95A1.49 1.49 0 0 1 8 13.74c.07.4 0 .8-.25 1.12c-.22.33-.57.55-.96.64c-.4.05-.79-.04-1.12-.27a1.48 1.48 0 0 1-.62-.97c-.05-.39.02-.79.25-1.12c.23-.32.57-.54.97-.61m11.81-2.09c.39-.07.8.02 1.12.25c.33.23.55.58.62.97s-.02.8-.25 1.12c-.23.33-.57.55-.97.62c-.39.07-.79-.02-1.1-.25c-.34-.23-.57-.58-.63-.97c-.07-.39.02-.79.24-1.12c.23-.33.58-.56.97-.62M2.83 19.17L2 20v2h20v-6h-5.38c-1.07 0-2.12.17-3.16.5l-1.38.47C10.04 17.65 7.9 18 5.75 18h-.09c-1.06 0-2.08.42-2.83 1.17"/></svg>',
  Trailblazer: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M5.672 4.095a9.017 9.017 0 0 1 12.627-.03h.002l.032.03c3.545 3.487 3.552 9.088.042 12.54l-5.671 5.578a1 1 0 0 1-1.403 0L5.63 16.635a8.74 8.74 0 0 1 0-12.499zM12 6.5a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd"/></svg>',
  Jump: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M14.21 10.211Q9.103 15.99 3.5 14.492q5.567-1.486 7.711-7.28L8.5 4.5h8v8z"/></svg>',
  Track: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" aria-hidden="true"><path fill="currentColor" d="M3.62 8.56c-.79.78-.79 2.05 0 2.83c.78.78 2.04.78 2.82 0l4.95-4.95c.78-.78.78-2.05 0-2.83s-2.04-.78-2.82 0zM1.49 6.44l4.95-4.95a5.016 5.016 0 0 1 7.08 0a5.003 5.003 0 0 1 0 7.07l-4.95 4.95a5.016 5.016 0 0 1-7.08 0a5.003 5.003 0 0 1 0-7.07m1.42 1.41L7.86 2.9a3 3 0 0 1 4.24 0a3.01 3.01 0 0 1 0 4.25L7.15 12.1a3 3 0 0 1-4.24 0a3.01 3.01 0 0 1 0-4.25m-.71-.7a3.996 3.996 0 0 0 0 5.65a3.99 3.99 0 0 0 5.66 0l4.95-4.95a3.996 3.996 0 0 0 0-5.65a3.99 3.99 0 0 0-5.66 0z"/></svg>',
  'Drag Race': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M14 2a4 4 0 0 1 3.995 3.8L18 6v12a4 4 0 0 1-3.8 3.995L14 22h-4a4 4 0 0 1-3.995-3.8L6 18V6a4 4 0 0 1 3.8-3.995L10 2zm0 2h-4a2 2 0 0 0-1.995 1.85L8 6v12a2 2 0 0 0 1.85 1.995L10 20h4a2 2 0 0 0 1.995-1.85L16 18V6a2 2 0 0 0-2-2m-2 11a2 2 0 1 1 0 4a2 2 0 0 1 0-4m0-5a2 2 0 1 1 0 4a2 2 0 0 1 0-4m0-5a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>',
  Street: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.1 22q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2T2 11.9q0-3.65 2.325-6.437T10.25 2q-.45 2.475.275 4.838t2.5 4.137t4.138 2.5T22 13.75q-.65 3.6-3.45 5.925T12.1 22"/></svg>',
  Speedtrap: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m16.95 14.675l-.925-.525q-.225-.125-.25-.4t.2-.45l2.35-1.75q.25-.2.538-.213t.562.138l.925.525q.225.125.238.4t-.188.45l-2.35 1.75q-.25.2-.537.213t-.563-.138M5 20q-.425 0-.712-.288T4 19t.288-.712T5 18h4v-5.95l-3-1.725q-.725-.425-.937-1.212T5.275 7.6l1.5-2.6q.425-.725 1.213-.937t1.512.212L17.725 9q.475.275.5.813t-.4.862l-3.85 2.875q-.5.35-1.075.388t-1.1-.263l-.8-.45V18q0 .825-.587 1.413T9 20z"/></svg>',
  Speedzone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.45 15.5q.625.625 1.575.588T13.4 15.4l4.225-6.325q.225-.35-.062-.638t-.638-.062L10.6 12.6q-.65.45-.712 1.363t.562 1.537M5.1 20q-.55 0-1.012-.238t-.738-.712q-.65-1.175-1-2.437T2 14q0-2.075.788-3.9t2.137-3.175T8.1 4.788T12 4q2.05 0 3.85.775T19 6.888t2.15 3.125t.825 3.837q.025 1.375-.312 2.688t-1.038 2.512q-.275.475-.737.713T18.874 20z"/></svg>'
};
