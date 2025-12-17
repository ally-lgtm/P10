import { useEffect, useMemo, useState } from 'react';

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days,
    hours,
    minutes,
    seconds,
    label: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  };
}

export default function HomePage() {
  const nextRace = useMemo(
    () => ({
      name: 'Abu Dhabi Grand Prix',
      circuit: 'Yas Marina Circuit',
      flag: '🇦🇪',
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 26 + 1000 * 60 * 12),
      sessions: [
        { label: 'Practice 3', time: 'Fri 11:30' },
        { label: 'Qualifying', time: 'Fri 15:00' },
        { label: 'Race', time: 'Sat 14:00' },
      ],
    }),
    [],
  );

  const standings = useMemo(
    () => ({
      username: 'You',
      league: 'Global League',
      rank: 42,
      totalPlayers: 18234,
      points: 612,
      lastRaceDelta: '+18',
      accuracy: 71,
    }),
    [],
  );

  const activity = useMemo(
    () => [
      { id: 'a1', text: 'User123 joined Global League', time: '2m ago' },
      { id: 'a2', text: 'Office Friends: picks lock in 3h', time: '18m ago' },
      { id: 'a3', text: 'You gained +18 points from Qatar GP', time: 'Yesterday' },
      { id: 'a4', text: 'Family Rivals: new league created', time: '2 days ago' },
    ],
    [],
  );

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const remaining = formatDuration(nextRace.startTime.getTime() - now);
  const isSoon = nextRace.startTime.getTime() - now < 1000 * 60 * 60 * 6;

  return (
    <main className="page">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Your season at a glance — picks, leagues, and race weekend timing.</p>
        </div>
        <span className={`pill ${isSoon ? 'pill-warning' : 'pill-success'}`}>Next lock: {remaining.label}</span>
      </div>

      <section className="grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Next Race</h2>
              <p className="card-subtitle">
                {nextRace.flag} {nextRace.name} — {nextRace.circuit}
              </p>
            </div>
            <span className="pill">Countdown</span>
          </div>

          <div style={{ marginTop: '0.9rem' }}>
            <div className="row" style={{ gap: '1rem' }}>
              <div className="card" style={{ padding: '0.9rem', flex: 1 }}>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Time remaining
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{remaining.label}</div>
              </div>
              <div className="card" style={{ padding: '0.9rem', flex: 1 }}>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Picks lock
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{isSoon ? 'Soon — finalize now' : 'Open'}</div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Lock at race start
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                Weekend schedule
              </div>
              <div className="row">
                {nextRace.sessions.map((s) => (
                  <span key={s.label} className="pill">
                    {s.label}: {s.time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Current Standings</h2>
              <p className="card-subtitle">{standings.league}</p>
            </div>
            <span className="pill">Season</span>
          </div>

          <div style={{ marginTop: '0.9rem' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Rank
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>#{standings.rank}</div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  of {standings.totalPlayers.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Total points
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{standings.points}</div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Last race: {standings.lastRaceDelta}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div className="muted" style={{ fontSize: '0.9rem' }}>
                P10 Accuracy
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: '0.4rem' }}>
                <div style={{ flex: 1, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${standings.accuracy}%`,
                      height: '100%',
                      background: 'rgba(100,108,255,0.7)',
                    }}
                  />
                </div>
                <span className="pill">{standings.accuracy}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Activity</h2>
            <p className="card-subtitle">What’s happening in your leagues</p>
          </div>
          <button type="button" className="btn">
            View all
          </button>
        </div>

        <div style={{ marginTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {activity.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ padding: '0.8rem 0.9rem', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 650 }}>{item.text}</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
