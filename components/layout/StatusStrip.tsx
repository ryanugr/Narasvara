'use client';

import SentimentWedge from '@/components/brand/SentimentWedge';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function StatusStrip() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  const bg = riskState === 'aman' ? 'var(--green-tint)' : riskState === 'kritis' ? 'var(--red-tint)' : 'var(--gold-tint)';
  const borderColor = riskState === 'aman' ? 'rgba(45,106,71,0.2)' : riskState === 'kritis' ? 'rgba(203,16,46,0.2)' : 'rgba(184,148,85,0.2)';
  const direction = riskState === 'aman' ? 'up' : riskState === 'kritis' ? 'down' : 'flat';
  const levelColor = riskState === 'aman' ? 'var(--green)' : riskState === 'kritis' ? 'var(--red)' : 'var(--gold)';

  return (
    <div style={{
      background: bg,
      borderBottom: `0.5px solid ${borderColor}`,
      padding: '6px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <SentimentWedge direction={direction} size={12} />
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 500,
        fontSize: 11,
        color: levelColor,
        letterSpacing: '0.05em',
      }}>
        {data.statusText}
      </span>
      <span style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 11,
        color: 'var(--ink-50)',
      }}>
        {data.statusDesc}
      </span>

      <div style={{ marginLeft: 'auto' }}>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: 8,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '2px 6px',
          borderRadius: '2px',
          background: riskState === 'kritis' ? 'var(--red)' : riskState === 'pantau' ? 'rgba(184,148,85,0.15)' : 'rgba(45,106,71,0.12)',
          color: riskState === 'kritis' ? '#fff' : levelColor,
          border: `0.5px solid ${borderColor}`,
        }}>
          Early Warning {riskState === 'aman' ? '↑' : riskState === 'kritis' ? '↓' : '→'}
        </span>
      </div>
    </div>
  );
}
