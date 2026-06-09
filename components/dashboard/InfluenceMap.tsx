'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';
import ViewLink from '@/components/ui/ViewLink';

export default function InfluenceMap() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  const stanceStyle: Record<string, { bg: string; color: string }> = {
    Friendly: { bg: 'var(--green-tint)', color: 'var(--green)' },
    Netral: { bg: 'var(--gold-tint)', color: 'var(--gold)' },
    Pantau: { bg: 'var(--red-tint)', color: 'var(--red)' },
  };

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
      <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
        Influence Map
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.influencers.map((inf, i) => {
          const style = stanceStyle[inf.stance];
          const initials = inf.name.split(' ').map(n => n[0]).join('').slice(0, 2);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: inf.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 7,
                color: '#fff',
              }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {inf.name}
                </div>
                <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-40)' }}>{inf.reach}</div>
              </div>
              <span style={{
                padding: '1px 5px',
                background: style.bg,
                borderRadius: '2px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 8,
                color: style.color,
                flexShrink: 0,
              }}>
                {inf.stance}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10 }}>
        <ViewLink label="Peta Lengkap" />
      </div>
    </div>
  );
}
