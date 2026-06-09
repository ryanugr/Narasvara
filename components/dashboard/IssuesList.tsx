'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SentimentWedge from '@/components/brand/SentimentWedge';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

const filters = ['Semua', 'Kritis', 'Pantau', 'Mereda'];

const levelColors: Record<string, string> = {
  Kritis: 'var(--red)',
  Pantau: 'var(--gold)',
  Mereda: 'var(--green)',
  Aman: 'var(--ink-30)',
};

export default function IssuesList() {
  const { riskState } = useApp();
  const data = riskStates[riskState];
  const [filter, setFilter] = useState('Semua');
  const router = useRouter();

  const filtered = data.issues.filter(i => filter === 'Semua' || i.level === filter);

  return (
    <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px', flex: '0 0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, margin: 0 }}>Isu Aktif</p>
        <div style={{ display: 'flex', gap: 3 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '2px 7px',
                borderRadius: '2px',
                border: filter === f ? '0.5px solid var(--ink-30)' : '0.5px solid transparent',
                background: filter === f ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 10,
                color: filter === f ? 'var(--ink)' : 'var(--ink-40)',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filtered.map(issue => (
          <div
            key={issue.id}
            style={{
              padding: '7px 8px',
              background: 'var(--parchment)',
              borderLeft: `2px solid ${levelColors[issue.level]}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <SentimentWedge direction={issue.direction} size={11} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--ink)',
                margin: '0 0 2px 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {issue.title}
              </p>
              <p style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 10,
                color: 'var(--ink-50)',
                margin: 0,
              }}>
                {issue.platform} · {issue.mentions.toLocaleString('id-ID')} sebutan
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{
                padding: '1px 5px',
                background: `${levelColors[issue.level]}18`,
                borderRadius: '2px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 8,
                color: levelColors[issue.level],
              }}>
                {issue.level}
              </span>
              {issue.actionable && (
                <button
                  onClick={() => router.push('/response-studio')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 10,
                    fontWeight: 500,
                    color: 'var(--red)',
                  }}
                >
                  Studio →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
