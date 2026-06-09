'use client';

import type { StudioIssue } from '@/lib/types';

interface Props { issue: StudioIssue; }

export default function IssueBanner({ issue }: Props) {
  return (
    <div style={{
      padding: '10px 20px',
      background: 'var(--paper)',
      borderBottom: '0.5px solid var(--ink-15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          padding: '2px 8px',
          background: `${issue.tagColor}18`,
          border: `0.5px solid ${issue.tagColor}44`,
          borderRadius: '2px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: 8,
          letterSpacing: '0.12em',
          color: issue.tagColor,
          whiteSpace: 'nowrap',
        }}>
          {issue.tag}
        </span>
        <div>
          <h2 style={{
            fontFamily: 'Newsreader, serif',
            fontSize: 18,
            fontWeight: 400,
            color: 'var(--ink)',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '-0.022em',
          }}>
            {issue.title}
          </h2>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink-50)', margin: 0 }}>
            {issue.platform} · {issue.velocity} · Terdeteksi {issue.detected}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontFamily: 'Newsreader, serif',
              fontSize: 22,
              color: issue.ewScore > 70 ? 'var(--red)' : issue.ewScore > 40 ? 'var(--gold)' : 'var(--green)',
            }}>
              {issue.ewScore}
            </span>
            <span style={{
              padding: '1px 5px',
              background: issue.ewScore > 70 ? 'var(--red-tint)' : 'var(--gold-tint)',
              borderRadius: '2px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: 8,
              color: issue.ewScore > 70 ? 'var(--red)' : 'var(--gold)',
            }}>
              {issue.ewLevel}
            </span>
          </div>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--red)', margin: 0 }}>
            Respons ideal: dalam {issue.responseIdeal} jam
          </p>
        </div>
      </div>
    </div>
  );
}
