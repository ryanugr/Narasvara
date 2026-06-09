'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';
import ViewLink from '@/components/ui/ViewLink';

export default function CompetitorMonitor() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
      <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
        Competitor Monitor
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {data.competitors.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)' }}>{c.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{
                fontFamily: 'Newsreader, serif',
                fontSize: 12,
                color: c.direction === 'up' ? 'var(--green)' : c.direction === 'down' ? 'var(--red)' : 'var(--gold)',
              }}>
                {c.delta > 0 ? '+' : ''}{c.delta}%
              </span>
              <span style={{ fontSize: 10, color: c.direction === 'up' ? 'var(--green)' : c.direction === 'down' ? 'var(--red)' : 'var(--gold)' }}>
                {c.direction === 'up' ? '↑' : c.direction === 'down' ? '↓' : '→'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <ViewLink label="Detail" />
      </div>
    </div>
  );
}
