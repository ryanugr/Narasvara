'use client';

import ChakraMark from '@/components/brand/ChakraMark';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function AiSummaryStrip() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  return (
    <div style={{
      background: 'var(--parchment)',
      borderBottom: '0.5px solid var(--ink-15)',
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      maxHeight: 52,
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, marginTop: 1 }}>
        <ChakraMark size={14} color="var(--red)" />
        <span className="meta-label" style={{ color: 'var(--red)', fontSize: 8, whiteSpace: 'nowrap' }}>
          AI Summary · Live View
        </span>
      </div>
      <p style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 12,
        color: 'var(--ink-70)',
        margin: 0,
        lineHeight: 1.5,
        flex: 1,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {data.aiSummary}
      </p>
    </div>
  );
}
