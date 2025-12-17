import { useState } from 'react';
import { scoringRules, pointsMatrix, exampleScenario, getDriverById } from '../mockData';

export default function ScoringBreakdownPage() {
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const driverId = 1; // Max Verstappen's ID
  const driver = getDriverById(driverId);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Scoring Breakdown</h1>
      
      {/* Rules Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Scoring Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoringRules.map((rule, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${selectedRule === index ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/80'} transition-colors cursor-pointer`}
              onClick={() => setSelectedRule(selectedRule === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-blue-400">{rule.title}</h3>
                <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-sm">
                  {rule.points} pts
                </span>
              </div>
              <p className="text-gray-300 mt-2">{rule.description}</p>
              {selectedRule === index && (
                <p className="text-sm text-gray-400 mt-2 italic">Example: {rule.example}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Points Matrix */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Points Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2 bg-gray-800 text-gray-300">Predicted \ Actual</th>
                {Array.from({ length: 10 }, (_, i) => (
                  <th key={i} className="border border-gray-600 p-2 bg-gray-800 text-gray-300">P{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pointsMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-gray-700 p-2 bg-gray-800 text-gray-300 font-medium">P{rowIndex + 1}</td>
                  {row.map((points, colIndex) => (
                    <td 
                      key={colIndex}
                      className={`border border-gray-700 p-2 text-center ${
                        rowIndex === colIndex 
                          ? 'bg-green-900/30 text-green-300' 
                          : Math.abs(rowIndex - colIndex) <= 2 
                            ? 'bg-blue-900/20 text-blue-200' 
                            : 'bg-gray-800/50 text-gray-400'
                      }`}
                    >
                      {points}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>• <span className="text-green-300">Green</span> = Exact match (maximum points)</p>
          <p>• <span className="text-blue-300">Blue</span> = Within 2 positions (partial points)</p>
          <p>• <span className="text-gray-400">Gray</span> = More than 2 positions off (minimum points)</p>
        </div>
      </section>

      {/* Example Scenario */}
      <section className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Example Scenario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">Your Prediction</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-blue-500/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-xl font-bold">
                  P{exampleScenario.prediction}
                </div>
                <div>
                  <p className="font-medium text-white">{driver?.name}</p>
                  <p className="text-sm text-gray-400">{driver?.team}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">Actual Result</h3>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
                  P{exampleScenario.actual}
                </div>
                <div>
                  <p className="font-medium text-white">{driver?.name}</p>
                  <p className="text-sm text-gray-400">{driver?.team}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900/30 rounded-lg">
          <h4 className="font-medium text-gray-200 mb-2">Points Calculation:</h4>
          <p className="text-gray-300">
            You predicted {driver?.name} to finish <span className="text-blue-300">P{exampleScenario.prediction}</span>,
            but they finished <span className="text-blue-300">P{exampleScenario.actual}</span>.
          </p>
          <p className="text-gray-300 mt-2">
            This is a difference of <span className="font-medium">{Math.abs(exampleScenario.prediction - exampleScenario.actual)} position(s)</span>.
          </p>
          <div className="mt-3 p-3 bg-gray-800/50 rounded border-l-4 border-blue-500">
            <p className="text-white font-medium">
              Points Awarded: <span className="text-2xl text-blue-400">{exampleScenario.points}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Based on the scoring matrix above for {Math.abs(exampleScenario.prediction - exampleScenario.actual) === 0 ? 'an exact match' : 'being 1 position off'}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
