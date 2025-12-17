import { useMemo, useState } from 'react';

type Row = {
  rank: number;
  username: string;
  points: number;
  accuracy: number;
  podiumPicks: string;
  isYou?: boolean;
};

export default function LeaderboardPage() {
  const leagues = useMemo(() => ['Global League', 'Office Friends', 'Family Rivals'] as const, []);
  const [selectedLeague, setSelectedLeague] = useState<(typeof leagues)[number]>('Global League');

  const rows = useMemo<Row[]>(
    () => [
      { rank: 1, username: 'ApexOracle', points: 734, accuracy: 79, podiumPicks: 'VER / NOR / LEC' },
      { rank: 2, username: 'SlipstreamSam', points: 721, accuracy: 78, podiumPicks: 'VER / HAM / NOR' },
      { rank: 3, username: 'DRS_Dreams', points: 700, accuracy: 77, podiumPicks: 'NOR / VER / PIA' },
      { rank: 4, username: 'QualiWizard', points: 689, accuracy: 75, podiumPicks: 'LEC / SAI / VER' },
      { rank: 5, username: 'TyreWhisperer', points: 676, accuracy: 74, podiumPicks: 'VER / PER / RUS' },
      { rank: 6, username: 'PitLanePoet', points: 668, accuracy: 74, podiumPicks: 'NOR / PIA / VER' },
      { rank: 7, username: 'Sector3', points: 655, accuracy: 73, podiumPicks: 'VER / NOR / HAM' },
      { rank: 8, username: 'OvercutOnly', points: 643, accuracy: 72, podiumPicks: 'VER / LEC / NOR' },
      { rank: 9, username: 'LateBraker', points: 637, accuracy: 72, podiumPicks: 'HAM / RUS / VER' },
      { rank: 10, username: 'You', points: 612, accuracy: 71, podiumPicks: 'VER / NOR / HAM', isYou: true },
      { rank: 11, username: 'ChicaneChaos', points: 606, accuracy: 70, podiumPicks: 'NOR / VER / LEC' },
      { rank: 12, username: 'AeroBalance', points: 598, accuracy: 69, podiumPicks: 'VER / PIA / RUS' },
    ],
    [],
  );

  return (
    <main className="page">
      <div>
        <h1>Leaderboard</h1>
        <p className="muted">Compare performance across leagues with accuracy and podium hit rate.</p>
      </div>

      <section className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Season Standings</h2>
            <p className="card-subtitle">{selectedLeague}</p>
          </div>
          <div className="row">
            {leagues.map((l) => (
              <button
                key={l}
                type="button"
                className={`btn ${l === selectedLeague ? 'btn-primary' : ''}`}
                onClick={() => setSelectedLeague(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '0.9rem' }} className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Points</th>
                <th>P10 Accuracy</th>
                <th>Podium Picks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.username} className={r.isYou ? 'highlight-row' : undefined}>
                  <td style={{ fontWeight: 700 }}>#{r.rank}</td>
                  <td>
                    <div className="row" style={{ gap: '0.5rem' }}>
                      <span style={{ fontWeight: 650 }}>{r.username}</span>
                      {r.isYou ? <span className="pill">You</span> : null}
                    </div>
                  </td>
                  <td style={{ fontWeight: 650 }}>{r.points}</td>
                  <td>
                    <div className="row" style={{ gap: '0.6rem' }}>
                      <div
                        style={{
                          width: 140,
                          height: 10,
                          borderRadius: 999,
                          background: 'rgba(255,255,255,0.08)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${r.accuracy}%`,
                            height: '100%',
                            background: r.isYou ? 'rgba(100,108,255,0.8)' : 'rgba(255,255,255,0.25)',
                          }}
                        />
                      </div>
                      <span className="pill">{r.accuracy}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="pill">{r.podiumPicks}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
