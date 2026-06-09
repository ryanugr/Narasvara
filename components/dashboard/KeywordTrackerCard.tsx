'use client';

import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';
import ViewLink from '@/components/ui/ViewLink';

export default function KeywordTrackerCard() {
  const { riskState } = useApp();
  const data = riskStates[riskState];
  const kw = data.keywords;

  const rows = [
    { label: 'Nama', value: kw.nama },
    { label: 'Partai', value: kw.partai },
    { label: 'Isu Utama', value: kw.isuUtama },
    { label: 'Oposisi', value: kw.oposisi },
  ];

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, margin: 0 }}>
          Keyword Tracker
        </p>
        <ViewLink label="Kelola" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink-50)' }}>{r.label}</span>
            <span style={{ fontFamily: 'Newsreader, serif', fontSize: 12, color: 'var(--ink)' }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
