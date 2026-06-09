'use client';

import { useApp } from '@/context/AppContext';
import type { RiskState } from '@/lib/types';

const states: { value: RiskState; label: string; color: string }[] = [
  { value: 'aman', label: 'Aman', color: '#2D6A47' },
  { value: 'pantau', label: 'Pantau', color: '#B89455' },
  { value: 'kritis', label: 'Kritis', color: '#CB102E' },
];

export default function RiskStateSwitcher() {
  const { riskState, setRiskState } = useApp();

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 260,
      zIndex: 35,
      display: 'flex',
      gap: 4,
      padding: '4px 6px',
      background: 'rgba(13,13,13,0.85)',
      border: '0.5px solid rgba(244,239,226,0.12)',
      borderRadius: '2px',
      backdropFilter: 'blur(8px)',
    }}>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 500,
        fontSize: 8,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(244,239,226,0.35)',
        alignSelf: 'center',
        marginRight: 2,
      }}>
        Demo
      </span>
      {states.map(s => (
        <button
          key={s.value}
          onClick={() => setRiskState(s.value)}
          style={{
            padding: '3px 8px',
            borderRadius: '2px',
            border: riskState === s.value ? `0.5px solid ${s.color}` : '0.5px solid transparent',
            background: riskState === s.value ? `${s.color}22` : 'transparent',
            color: riskState === s.value ? s.color : 'rgba(244,239,226,0.4)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
