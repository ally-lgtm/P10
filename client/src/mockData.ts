// Mock data for Scoring Breakdown and History sections

export const scoringRules = [
  {
    title: "Exact Match",
    description: "Predicting the exact finishing position",
    points: 25,
    example: "P1 prediction → P1 finish = 25 points"
  },
  {
    title: "Within 1 Spot",
    description: "Prediction is 1 position off",
    points: 18,
    example: "P1 prediction → P2 finish = 18 points"
  },
  {
    title: "Within 2 Spots",
    description: "Prediction is 2 positions off",
    points: 15,
    example: "P1 prediction → P3 finish = 15 points"
  },
  {
    title: "Podium Bonus",
    description: "Correctly predicting a podium finish (P1-P3)",
    points: 10,
    example: "P3 prediction → P3 finish = 25 + 10 = 35 points"
  },
  {
    title: "Pole Position",
    description: "Correctly predicting the pole sitter",
    points: 5,
    example: "Pole prediction correct = 5 points"
  }
];

export const pointsMatrix = [
  [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],  // Predicted P1
  [18, 25, 18, 15, 12, 10, 8, 6, 4, 2],  // Predicted P2
  [15, 18, 25, 18, 15, 12, 10, 8, 6, 4],  // Predicted P3
  [12, 15, 18, 25, 18, 15, 12, 10, 8, 6], // Predicted P4
  [10, 12, 15, 18, 25, 18, 15, 12, 10, 8], // Predicted P5
  [8, 10, 12, 15, 18, 25, 18, 15, 12, 10], // Predicted P6
  [6, 8, 10, 12, 15, 18, 25, 18, 15, 12], // Predicted P7
  [4, 6, 8, 10, 12, 15, 18, 25, 18, 15],  // Predicted P8
  [2, 4, 6, 8, 10, 12, 15, 18, 25, 18],   // Predicted P9
  [1, 2, 4, 6, 8, 10, 12, 15, 18, 25]    // Predicted P10
];

export const exampleScenario = {
  prediction: 1, // P1
  actual: 2,     // Finished P2
  points: 18,    // Points awarded
  driverId: 1,   // Max Verstappen's ID
  team: "Red Bull Racing"
};

export const seasonStats = {
  averageScore: 78.5,
  bestRank: 3,
  totalPoints: 1099,
  racesCompleted: 14,
  perfectPredictions: 2,
  podiumPredictions: 8
};

export const raceHistory = [
  {
    id: 1,
    round: 1,
    name: "Bahrain Grand Prix",
    country: "Bahrain",
    date: "2025-03-02",
    userScore: 92,
    globalRank: 45,
    totalPlayers: 12500,
    userPicks: [1, 11, 16, 55, 4, 14, 63, 18, 10, 22],
    actualResults: [1, 11, 16, 55, 4, 14, 63, 18, 10, 22],
    poleSitter: 1,
    fastestLap: 11
  },
  {
    id: 2,
    round: 2,
    name: "Saudi Arabian Grand Prix",
    country: "Saudi Arabia",
    date: "2025-03-09",
    userScore: 85,
    globalRank: 112,
    totalPlayers: 12800,
    userPicks: [1, 11, 16, 55, 4, 14, 63, 18, 10, 22],
    actualResults: [11, 16, 1, 55, 4, 14, 63, 18, 10, 22],
    poleSitter: 1,
    fastestLap: 11
  },
  // Add more races as needed...
];

export const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing", number: 1 },
  { id: 11, name: "Sergio Perez", team: "Red Bull Racing", number: 11 },
  { id: 44, name: "Lewis Hamilton", team: "Mercedes", number: 44 },
  { id: 63, name: "George Russell", team: "Mercedes", number: 63 },
  { id: 16, name: "Charles Leclerc", team: "Ferrari", number: 16 },
  { id: 55, name: "Carlos Sainz", team: "Ferrari", number: 55 },
  { id: 4, name: "Lando Norris", team: "McLaren", number: 4 },
  { id: 81, name: "Oscar Piastri", team: "McLaren", number: 81 },
  { id: 14, name: "Fernando Alonso", team: "Aston Martin", number: 14 },
  { id: 18, name: "Lance Stroll", team: "Aston Martin", number: 18 },
  { id: 10, name: "Pierre Gasly", team: "Alpine", number: 10 },
  { id: 31, name: "Esteban Ocon", team: "Alpine", number: 31 },
  { id: 22, name: "Yuki Tsunoda", team: "AlphaTauri", number: 22 },
  { id: 40, name: "Liam Lawson", team: "AlphaTauri", number: 40 },
  { id: 77, name: "Valtteri Bottas", team: "Alfa Romeo", number: 77 },
  { id: 24, name: "Zhou Guanyu", team: "Alfa Romeo", number: 24 },
  { id: 20, name: "Kevin Magnussen", team: "Haas", number: 20 },
  { id: 27, name: "Nico Hulkenberg", team: "Haas", number: 27 },
  { id: 2, name: "Logan Sargeant", team: "Williams", number: 2 },
  { id: 23, name: "Alexander Albon", team: "Williams", number: 23 }
];

export const getDriverById = (id: number) => {
  return drivers.find(driver => driver.id === id);
};

export const getCountryFlag = (country: string) => {
  // Simple mapping - in a real app, you might want a more comprehensive solution
  const flags: Record<string, string> = {
    'Bahrain': '🇧🇭',
    'Saudi Arabia': '🇸🇦',
    'Australia': '🇦🇺',
    'Japan': '🇯🇵',
    'China': '🇨🇳',
    'USA': '🇺🇸',
    'Italy': '🇮🇹',
    'Monaco': '🇲🇨',
    'Canada': '🇨🇦',
    'Spain': '🇪🇸',
    'Austria': '🇦🇹',
    'UK': '🇬🇧',
    'Hungary': '🇭🇺',
    'Belgium': '🇧🇪',
    'Netherlands': '🇳🇱',
    'Singapore': '🇸🇬',
    'Mexico': '🇲🇽',
    'Brazil': '🇧🇷',
    'USA (Las Vegas)': '🇺🇸',
    'Qatar': '🇶🇦',
    'Abu Dhabi': '🇦🇪'
  };
  
  return flags[country] || '🏁';
};
