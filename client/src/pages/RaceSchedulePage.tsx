import { useMemo } from 'react';

type Race = {
  id: string;
  date: string;
  grandPrix: string;
  circuit: string;
  status: 'Upcoming' | 'Completed';
};

export default function RaceSchedulePage() {
  const races = useMemo<Race[]>(
    () => [
      { id: 'r19', date: 'Dec 07', grandPrix: 'Qatar Grand Prix', circuit: 'Lusail International Circuit', status: 'Completed' },
      { id: 'r20', date: 'Dec 14', grandPrix: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', status: 'Upcoming' },
      { id: 'r21', date: 'Mar 16', grandPrix: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', status: 'Upcoming' },
      { id: 'r22', date: 'Mar 23', grandPrix: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', status: 'Upcoming' },
      { id: 'r23', date: 'Apr 06', grandPrix: 'Australian Grand Prix', circuit: 'Albert Park Circuit', status: 'Upcoming' },
    ],
    [],
  );

  return (
    <main className="page">
      <div>
        <h1>Race Schedule</h1>
        <p className="muted">Plan your picks week to week — keep an eye on lock times.</p>
      </div>

      <section className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Upcoming Races</h2>
            <p className="card-subtitle">Season calendar (mock)</p>
          </div>
          <span className="pill">Timeline</span>
        </div>

        <div className="timeline" style={{ marginTop: '0.9rem' }}>
          {races.map((race) => {
            const pillClass = race.status === 'Completed' ? 'pill-success' : 'pill-warning';
            return (
              <div key={race.id} className="card" style={{ padding: '0.9rem', background: 'rgba(255,255,255,0.02)' }}>
                <div className="race-item">
                  <div>
                    <div className="circuit-thumb" />
                    <div className="muted" style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
                      Circuit layout
                    </div>
                  </div>

                  <div>
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{race.grandPrix}</div>
                      <span className={`pill ${pillClass}`}>{race.status}</span>
                    </div>
                    <div className="muted" style={{ marginTop: '0.25rem' }}>
                      {race.circuit}
                    </div>

                    <div className="row" style={{ marginTop: '0.7rem' }}>
                      <span className="pill">Date: {race.date}</span>
                      <span className="pill">Picks lock: Race start</span>
                      <button type="button" className="btn" disabled>
                        View weekend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
