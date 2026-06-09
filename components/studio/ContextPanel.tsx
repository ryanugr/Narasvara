'use client';

import SentimentWedge from '@/components/brand/SentimentWedge';
import type { StudioIssue } from '@/lib/types';

interface Props {
  issue: StudioIssue;
  onSimulate: () => void;
}

export default function ContextPanel({ issue, onSimulate }: Props) {
  return (
    <div style={{
      width: 188,
      background: 'var(--parchment)',
      borderLeft: '0.5px solid var(--ink-15)',
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflowY: 'auto',
    }}>
      {/* Issue context */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Konteks Isu</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { label: 'Asal isu', value: issue.context.origin },
            { label: 'Volume', value: issue.context.volume },
            { label: 'Sentimen dominan', value: issue.context.dominantSentiment },
            { label: 'Tokoh terlibat', value: issue.context.tokoh },
            { label: 'Preseden serupa', value: issue.context.precedent },
          ].map(r => (
            <div key={r.label}>
              <div className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginBottom: 2 }}>{r.label}</div>
              <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink)', lineHeight: 1.4 }}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Circulating narratives */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Narasi Beredar</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {issue.circulating.map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <SentimentWedge direction={n.direction} size={10} />
              </div>
              <p style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontStyle: 'italic',
                fontSize: 10,
                color: 'var(--ink-70)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {n.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Response history */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Riwayat Respons</p>
        {[
          { brief: 'Brief #141', date: '2 hari lalu', result: '+8% sentimen' },
          { brief: 'Brief #138', date: '5 hari lalu', result: 'Netral' },
          { brief: 'Brief #130', date: '13 hari lalu', result: '+14% sentimen' },
        ].map((h, i) => (
          <div key={i} style={{ marginBottom: 7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink)', fontWeight: 500 }}>{h.brief}</span>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 9, color: 'var(--green)' }}>{h.result}</span>
            </div>
            <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 9, color: 'var(--ink-30)' }}>{h.date}</span>
          </div>
        ))}
      </div>

      {/* Simulate crisis button */}
      <button
        onClick={onSimulate}
        style={{
          padding: '8px 10px',
          background: 'var(--ink)',
          border: 'none',
          borderRadius: '2px',
          color: 'var(--parchment)',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 11,
          fontWeight: 500,
          cursor: 'pointer',
          marginTop: 'auto',
          textAlign: 'center',
        }}
      >
        Simulasi Krisis →
      </button>
    </div>
  );
}
