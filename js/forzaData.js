// Forza Horizon Data Base for Challenge Generator
export const FORZA_DATA = {
  countries: [
    {
      id: 'de',
      name: 'Deutschland',
      flag: '🇩🇪',
      brands: ['BMW', 'Porsche', 'Audi', 'Mercedes-AMG', 'Volkswagen', 'Opel', 'Ruf']
    },
    {
      id: 'jp',
      name: 'Japan',
      flag: '🇯🇵',
      brands: ['Nissan', 'Toyota', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru', 'Lexus']
    },
    {
      id: 'us',
      name: 'USA',
      flag: '🇺🇸',
      brands: ['Ford', 'Chevrolet', 'Dodge', 'Shelby', 'Cadillac', 'Pontiac', 'Jeep', 'Hennessey']
    },
    {
      id: 'it',
      name: 'Italien',
      flag: '🇮🇹',
      brands: ['Ferrari', 'Lamborghini', 'Maserati', 'Alfa Romeo', 'Pagani', 'Lancia', 'Fiat']
    },
    {
      id: 'gb',
      name: 'Großbritannien',
      flag: '🇬🇧',
      brands: ['Aston Martin', 'McLaren', 'Jaguar', 'Lotus', 'Bentley', 'TVR', 'BAC', 'Mini']
    },
    {
      id: 'fr',
      name: 'Frankreich',
      flag: '🇫🇷',
      brands: ['Bugatti', 'Alpine', 'Renault', 'Peugeot']
    },
    {
      id: 'se',
      name: 'Schweden',
      flag: '🇸🇪',
      brands: ['Koenigsegg', 'Volvo']
    },
    {
      id: 'sk',
      name: 'Südkorea',
      flag: '🇰🇷',
      brands: ['Hyundai', 'Kia']
    },
    {
      id: 'au',
      name: 'Australien',
      flag: '🇦🇺',
      brands: ['Holden', 'HSV']
    },
    {
      id: 'at',
      name: 'Österreich',
      flag: '🇦🇹',
      brands: ['KTM']
    }
  ],

  classes: [
    { name: 'D-Klasse', code: 'D', min: 100, max: 400, badgeColor: '#7dd3fc' },
    { name: 'C-Klasse', code: 'C', min: 401, max: 500, badgeColor: '#8a64d6' },
    { name: 'B-Klasse', code: 'B', min: 501, max: 600, badgeColor: '#eb4d4b' },
    { name: 'A-Klasse', code: 'A', min: 601, max: 700, badgeColor: '#f0932b' },
    { name: 'S1-Klasse', code: 'S1', min: 701, max: 800, badgeColor: '#8e44ad' },
    { name: 'S2-Klasse', code: 'S2', min: 801, max: 900, badgeColor: '#27ae60' },
    { name: 'R-Klasse', code: 'R', min: 901, max: 998, badgeColor: '#ec4899' },
    { name: 'X-Klasse', code: 'X', min: 999, max: 999, badgeColor: '#22c55e' }
  ],

  drivetrains: [
    { name: 'Heckantrieb (RWD)', code: 'RWD', desc: 'Nur Hinterräder angetrieben' },
    { name: 'Allradantrieb (AWD)', code: 'AWD', desc: 'Alle 4 Räder angetrieben' },
    { name: 'Frontantrieb (FWD)', code: 'FWD', desc: 'Nur Vorderräder angetrieben' },
    { name: 'Beliebig / Original', code: 'ANY', desc: 'Kein Antriebs-Zwang' }
  ],

  tuningRules: [
    { title: 'Stock Motor Pflicht', desc: 'Kein Motor-Swap erlaubt, Original-Motor muss getunt werden.' },
    { title: 'Keine Aerodynamik', desc: 'Keine Horizon-Spoiler, Frontsplitter oder Diffusoren verbauen.' },
    { title: 'Sauger-Tuning', desc: 'Keine Turbolader oder Kompressoren erlaubt (Nur Saugmotor).' },
    { title: 'Sleeper-Build', desc: 'Serienfelgen & Serienoptik Pflicht, nur innere Leistung verbauen.' },
    { title: 'Maximaler Ladedruck', desc: 'Muss Turbo oder Kompressor mit max. Stufe verbauen.' },
    { title: 'Offroad-Reifen Pflicht', desc: 'Fahrzeug muss auf Geländereifen umgebaut werden.' },
    { title: 'Drift-Fahrwerk Pflicht', desc: 'Fahrwerk muss auf Drift umgebaut sein.' },
    { title: 'Budget Limit: 50.000 CR', desc: 'Auto-Kaufpreis darf laut Messe 50k CR nicht überschreiten.' },
    { title: 'Budget Limit: 100.000 CR', desc: 'Auto-Kaufpreis darf laut Messe 100k CR nicht überschreiten.' },
    { title: 'Manuelle Schaltung', desc: 'Rennen muss mit manueller Schaltung gefahren werden.' },
    { title: 'Gewicht > 1.500 kg', desc: 'Fahrzeug darf nicht unter 1500kg gewichtsreduziert werden.' },
    { title: 'Freies Tuning', desc: 'Keine zusätzlichen Tuning-Einschränkungen.' }
  ],

  eras: [
    { name: 'Klassiker (Vor 1980)', code: 'classic' },
    { name: 'Retro 80er & 90er', code: 'retro' },
    { name: 'Modern Classic (2000 - 2012)', code: '2000s' },
    { name: 'Moderne Performance (2013 - 2020)', code: 'modern' },
    { name: 'Neueste Generation (2021+)', code: 'nextgen' },
    { name: 'Jedes Baujahr', code: 'any' }
  ],

  eventTypes: [
    {
      id: 'drag',
      name: 'Drag Race 🏁',
      desc: 'Beschleunigungsrennen auf der Viertelmeile oder dem Horizon Strip.',
      locations: [
        'Horizon Festival Drag Strip',
        'Aerodromo Drag Strip (Flugplatz)',
        'Teotihuacan Drag Strip',
        'Beach Drag Strip (Strand)',
        'Highway 100-300 Pull'
      ]
    },
    {
      id: 'circuit',
      name: 'Rundstrecke 🔄',
      desc: 'Schnelle Rundenzeiten auf geschlossenen Rundkursen.',
      locations: [
        'Guanajuato City Circuit',
        'Horizon Mexico Circuit',
        'Baja Circuit',
        'Horizon Stadium Circuit',
        'Lookout Circuit'
      ]
    },
    {
      id: 'sprint',
      name: 'Etappenrennen / Sprint 🏎️💨',
      desc: 'Punkt-zu-Punkt Rennen über lange Distanzen.',
      locations: [
        'Horizon Apex Sprint',
        'Volcano Hillclimb Sprint (Vulkan Pass)',
        'Desierto Trail Sprint',
        'Coastline Sprint'
      ]
    },
    {
      id: 'drift',
      name: 'Driftzone 💨🔥',
      desc: 'Wer holt den höchsten Drift-Score auf der abgesteckten Driftzone?',
      locations: [
        'Cara Este (Der berühmte Vulkan-Pass)',
        'Las Curves Drift Zone',
        'Fiesta Drift Zone (Stadt)',
        'Farmland Drift Zone'
      ]
    },
    {
      id: 'prstunt',
      name: 'PR-Stunt / Gefahrenschild / Blitzer 🚀',
      desc: 'Maximaler Weitsprung oder Top-Speed Messung.',
      locations: [
        'Gefahrenschild: Vulkan-Sprung (Max. Weite)',
        'Gefahrenschild: Boardwalk Jump',
        'Blitzer: Highway Speed Trap (Max. km/h)',
        'Geschwindigkeitszone: Cloverleaf'
      ]
    },
    {
      id: 'dirt',
      name: 'Dirt / Offroad Rallye ⛰️',
      desc: 'Schotter-, Matsch- und Geländekurse.',
      locations: [
        'Caldera Dirt Circuit',
        'Jungle Trail Sprint',
        'Baja Cross Country Circuit',
        'River Rapid Dirt Trail'
      ]
    }
  ]
};
