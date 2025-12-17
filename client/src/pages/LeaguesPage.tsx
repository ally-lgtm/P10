import { useMemo, useState } from 'react';

type League = {
  id: string;
  name: string;
  members: number;
  yourRank: number;
  points: number;
  isPublic: boolean;
};

export default function LeaguesPage() {
  const leagues = useMemo<League[]>(
    () => [
      { id: 'l1', name: 'Global League', members: 18234, yourRank: 42, points: 612, isPublic: true },
      { id: 'l2', name: 'Office Friends', members: 14, yourRank: 3, points: 588, isPublic: false },
      { id: 'l3', name: 'Family Rivals', members: 8, yourRank: 1, points: 640, isPublic: false },
    ],
    [],
  );

  const [joinCode, setJoinCode] = useState('');

  return (
    <main className="page">
      <div>
        <h1>Leagues</h1>
        <p className="muted">Compete with friends or climb the global ladder.</p>
      </div>

      <section className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Your Leagues</h2>
            <p className="card-subtitle">Manage, join, and create leagues</p>
          </div>
          <div className="row">
            <button type="button" className="btn btn-primary">
              Create League
            </button>
          </div>
        </div>

        <div className="row" style={{ marginTop: '0.9rem', alignItems: 'stretch' }}>
          <input
            className="input"
            placeholder="Enter join code (e.g., P10-7F2A)"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            style={{ maxWidth: 420 }}
          />
          <button type="button" className="btn" disabled={!joinCode.trim()}>
            Join League
          </button>
          <span className="pill">Mock UI</span>
        </div>
      </section>

      <section className="league-grid">
        {leagues.map((l) => (
          <div key={l.id} className="card">
            <div className="card-header">
              <div>
                <h3 className="league-card-title">{l.name}</h3>
                <p className="card-subtitle">{l.isPublic ? 'Public' : 'Private'} league</p>
              </div>
              <span className="pill">{l.members.toLocaleString()} members</span>
            </div>

            <div style={{ marginTop: '0.9rem' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <div className="muted" style={{ fontSize: '0.9rem' }}>
                    Your rank
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>#{l.yourRank}</div>
                </div>
                <div>
                  <div className="muted" style={{ fontSize: '0.9rem' }}>
                    Points
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{l.points}</div>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: '1rem', justifyContent: 'space-between' }}>
              <button type="button" className="btn">
                View leaderboard
              </button>
              <button type="button" className="btn" disabled={l.isPublic}>
                Invite
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
