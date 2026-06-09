'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function SentimentCard() {
  const { riskState } = useApp();
  const data = riskStates[riskState];
  const s = data.sentiment;
  const trend = data.sentimentTrend;
  const maxVal = Math.max(...trend);

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
      <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>
        Sentimen Hari Ini
      </p>

      {/* Wedge bar */}
      <div style={{ height: 6, display: 'flex', gap: 1, borderRadius: 1, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ flex: s.positif, background: 'var(--green)', transition: 'flex 0.4s ease' }} />
        <div style={{ flex: s.netral, background: 'var(--gold)', transition: 'flex 0.4s ease' }} />
        <div style={{ flex: s.negatif, background: 'var(--red)', transition: 'flex 0.4s ease' }} />
      </div>

      {/* Numbers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        {[
          { v: s.positif, c: 'var(--green)', l: 'pos' },
          { v: s.netral, c: 'var(--gold)', l: 'net' },
          { v: s.negatif, c: 'var(--red)', l: 'neg' },
        ].map(({ v, c, l }) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: c, lineHeight: 1 }}>{v}%</div>
            <div className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* 7-bar sparklet */}
      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 28 }}>
        {trend.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / maxVal) * 100}%`,
              background: i === trend.length - 1 ? 'var(--green)' : 'var(--ink-15)',
              borderRadius: '1px 1px 0 0',
              transition: 'height 0.3s ease',
              minHeight: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
