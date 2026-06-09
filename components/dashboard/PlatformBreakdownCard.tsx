'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function PlatformBreakdownCard() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
      <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
        Platform Breakdown
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.platforms.map(p => (
          <div key={p.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)' }}>{p.name}</span>
              <span style={{ fontFamily: 'Newsreader, serif', fontSize: 11, color: 'var(--ink-70)' }}>{p.value}</span>
            </div>
            <div style={{ height: 2, background: 'var(--ink-06)', borderRadius: 1 }}>
              <div style={{
                width: `${p.fill}%`, height: '100%',
                background: p.fill > 70 ? 'var(--red)' : p.fill > 50 ? 'var(--gold)' : 'var(--ink-30)',
                borderRadius: 1,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
