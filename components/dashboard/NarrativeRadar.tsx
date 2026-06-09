'use client';

import HalfChakraRule from '@/components/brand/HalfChakraRule';
import ViewLink from '@/components/ui/ViewLink';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

export default function NarrativeRadar() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  const tagColors: Record<string, string> = {
    POPULIS: 'var(--green)',
    EKONOMI: 'var(--gold)',
    INFRASTRUKTUR: 'var(--ink-50)',
    KRITIS: 'var(--red)',
    PANTAU: 'var(--gold)',
    KONTRA: 'var(--red)',
    KRISIS: 'var(--red)',
    VIRAL: 'var(--red)',
    MEDIA: 'var(--gold)',
  };

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, margin: 0 }}>Narrative Radar</p>
        <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-30)' }}>15 menit lalu</span>
      </div>

      <div style={{ marginBottom: 8 }}>
        <HalfChakraRule />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.narratives.map(n => (
          <div key={n.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{
                padding: '1px 5px',
                background: `${tagColors[n.tag] || 'var(--ink)'}15`,
                borderRadius: '2px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 7,
                color: tagColors[n.tag] || 'var(--ink-50)',
                letterSpacing: '0.1em',
              }}>
                {n.tag}
              </span>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--gold)' }}>{n.velocity}</span>
            </div>
            <p style={{
              fontFamily: 'Newsreader, serif',
              fontStyle: 'italic',
              fontSize: 12,
              color: 'var(--ink)',
              margin: '0 0 4px 0',
              lineHeight: 1.4,
            }}>
              {n.quote}
            </p>
            <div style={{ height: 2, background: 'var(--ink-06)', borderRadius: 1, marginBottom: 4 }}>
              <div style={{
                width: `${n.fill}%`, height: '100%',
                background: tagColors[n.tag] || 'var(--ink-30)',
                borderRadius: 1,
              }} />
            </div>
            {n.subtitle && (
              <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-40)', margin: 0 }}>
                {n.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <ViewLink label="Semua Narasi" />
      </div>
    </div>
  );
}
