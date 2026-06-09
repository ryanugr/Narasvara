'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function EarlyWarningCard() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  const scoreColor = riskState === 'aman' ? 'var(--green)' : riskState === 'kritis' ? 'var(--red)' : 'var(--gold)';
  const badgeBg = riskState === 'aman' ? 'var(--green-tint)' : riskState === 'kritis' ? 'var(--red-tint)' : 'var(--gold-tint)';
  const fillPct = (data.ewScore / 100) * 100;

  return (
    <div style={{
      background: 'var(--paper)',
      border: '0.5px solid var(--ink-15)',
      padding: '12px',
    }}>
      <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>
        Early Warning Score
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 6 }}>
        <span style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 40,
          fontWeight: 400,
          color: scoreColor,
          lineHeight: 1,
        }}>
          {data.ewScore}
        </span>
        <span style={{
          padding: '2px 6px',
          background: badgeBg,
          border: `0.5px solid ${scoreColor}33`,
          borderRadius: '2px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: 9,
          color: scoreColor,
          marginBottom: 4,
        }}>
          {data.ewLevel}
        </span>
      </div>

      {/* Gauge bar */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ height: 3, background: 'var(--ink-06)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{
            width: `${fillPct}%`,
            height: '100%',
            background: scoreColor,
            borderRadius: 1,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          {['0', '50', '100'].map(v => (
            <span key={v} className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7 }}>{v}</span>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink-50)', margin: 0, lineHeight: 1.4 }}>
        {data.statusDesc}
      </p>
    </div>
  );
}
