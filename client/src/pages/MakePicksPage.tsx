import { useMemo, useState } from 'react';

type Driver = {
  id: string;
  lastName: string;
  firstName: string;
  team: string;
  teamColor: string;
};

export default function MakePicksPage() {
  const drivers = useMemo<Driver[]>(
    () => [
      { id: 'ver', firstName: 'Max', lastName: 'Verstappen', team: 'Red Bull', teamColor: '#1E41FF' },
      { id: 'per', firstName: 'Sergio', lastName: 'Perez', team: 'Red Bull', teamColor: '#1E41FF' },
      { id: 'ham', firstName: 'Lewis', lastName: 'Hamilton', team: 'Mercedes', teamColor: '#00D2BE' },
      { id: 'rus', firstName: 'George', lastName: 'Russell', team: 'Mercedes', teamColor: '#00D2BE' },
      { id: 'nor', firstName: 'Lando', lastName: 'Norris', team: 'McLaren', teamColor: '#FF8700' },
      { id: 'pia', firstName: 'Oscar', lastName: 'Piastri', team: 'McLaren', teamColor: '#FF8700' },
      { id: 'lec', firstName: 'Charles', lastName: 'Leclerc', team: 'Ferrari', teamColor: '#DC0000' },
      { id: 'sai', firstName: 'Carlos', lastName: 'Sainz', team: 'Ferrari', teamColor: '#DC0000' },
      { id: 'alo', firstName: 'Fernando', lastName: 'Alonso', team: 'Aston Martin', teamColor: '#006F62' },
      { id: 'str', firstName: 'Lance', lastName: 'Stroll', team: 'Aston Martin', teamColor: '#006F62' },
      { id: 'gas', firstName: 'Pierre', lastName: 'Gasly', team: 'Alpine', teamColor: '#0090FF' },
      { id: 'oco', firstName: 'Esteban', lastName: 'Ocon', team: 'Alpine', teamColor: '#0090FF' },
      { id: 'alb', firstName: 'Alex', lastName: 'Albon', team: 'Williams', teamColor: '#005AFF' },
      { id: 'sar', firstName: 'Logan', lastName: 'Sargeant', team: 'Williams', teamColor: '#005AFF' },
      { id: 'bot', firstName: 'Valtteri', lastName: 'Bottas', team: 'Kick Sauber', teamColor: '#52E252' },
      { id: 'zho', firstName: 'Zhou', lastName: 'Guanyu', team: 'Kick Sauber', teamColor: '#52E252' },
      { id: 'hul', firstName: 'Nico', lastName: 'Hülkenberg', team: 'Haas', teamColor: '#B6BABD' },
      { id: 'mag', firstName: 'Kevin', lastName: 'Magnussen', team: 'Haas', teamColor: '#B6BABD' },
      { id: 'tsu', firstName: 'Yuki', lastName: 'Tsunoda', team: 'RB', teamColor: '#2B4562' },
      { id: 'ric', firstName: 'Daniel', lastName: 'Ricciardo', team: 'RB', teamColor: '#2B4562' },
    ],
    [],
  );

  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [picks, setPicks] = useState<(Driver | null)[]>(() => Array.from({ length: 10 }, () => null));

  const usedDriverIds = useMemo(() => new Set(picks.filter(Boolean).map((d) => (d as Driver).id)), [picks]);

  const assignDriver = (driver: Driver) => {
    setPicks((prev) => {
      const next = [...prev];

      const existingIdx = next.findIndex((d) => d?.id === driver.id);
      if (existingIdx !== -1) {
        next[existingIdx] = null;
      }

      next[activeSlot] = driver;
      return next;
    });

    setActiveSlot((s) => Math.min(9, s + 1));
  };

  const clearSlot = (slotIndex: number) => {
    setPicks((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  return (
    <main className="page">
      <div>
        <h1>Make Picks</h1>
        <p className="muted">
          Select a finishing order prediction. Click a slot (P1–P10), then click a driver to assign.
        </p>
      </div>

      <section className="split">
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Drivers</h2>
              <p className="card-subtitle">Tap to assign to the active slot</p>
            </div>
            <span className="pill">Drag-style UI</span>
          </div>

          <div className="drivers-list" style={{ marginTop: '0.9rem' }}>
            {drivers.map((d) => {
              const used = usedDriverIds.has(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  className="driver-item"
                  onClick={() => assignDriver(d)}
                  style={{ opacity: used ? 0.55 : 1 }}
                  aria-disabled={used}
                >
                  <div className="driver-left">
                    <div className="team-bar" style={{ background: d.teamColor }} />
                    <div>
                      <div className="driver-name">
                        {d.lastName}
                        <span className="muted" style={{ fontWeight: 500 }}>
                          {' '}
                          {d.firstName}
                        </span>
                      </div>
                      <div className="driver-team">{d.team}</div>
                    </div>
                  </div>
                  <span className="pill">Assign</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Top 10 Picks</h2>
              <p className="card-subtitle">Active slot: P{activeSlot + 1}</p>
            </div>
            <div className="row">
              <button type="button" className="btn" onClick={() => setPicks(Array.from({ length: 10 }, () => null))}>
                Reset
              </button>
              <button type="button" className="btn btn-primary" disabled>
                Save Picks
              </button>
            </div>
          </div>

          <div className="slot-grid" style={{ marginTop: '0.9rem' }}>
            {picks.map((pick, idx) => (
              <div
                key={idx}
                className={`slot ${idx === activeSlot ? 'slot-active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveSlot(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveSlot(idx);
                }}
              >
                <div className="slot-label">P{idx + 1}</div>
                <div className="slot-value">
                  {pick ? (
                    <>
                      <div className="team-bar" style={{ background: pick.teamColor, height: 18 }} />
                      <span style={{ fontWeight: 650 }}>{pick.lastName}</span>
                      <span className="muted" style={{ fontSize: '0.85rem' }}>
                        {pick.team}
                      </span>
                    </>
                  ) : (
                    <span className="slot-empty">Click to select, then choose a driver</span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSlot(idx);
                  }}
                  disabled={!pick}
                >
                  Clear
                </button>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1rem', padding: '0.9rem', background: 'rgba(255,255,255,0.02)' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Pick strategy hint</div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  Balance favorites up front and value picks in P7–P10.
                </div>
              </div>
              <span className="pill">Mock</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
