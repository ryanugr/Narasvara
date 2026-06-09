'use client';

import type { StudioIssue, Scenario } from '@/lib/types';

interface Props {
  issue: StudioIssue;
  selectedScenario: Scenario;
  onSelect: (s: Scenario) => void;
}

const approvalSteps = [
  { label: 'AI Draft', done: true },
  { label: 'Anda', active: true },
  { label: 'Comms Dir.', waiting: true },
  { label: 'Publikasi', waiting: true },
];

export default function ScenarioPanel({ issue, selectedScenario, onSelect }: Props) {
  return (
    <div style={{
      width: 200,
      background: 'var(--parchment)',
      borderRight: '0.5px solid var(--ink-15)',
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflowY: 'auto',
    }}>
      {/* Scenario selector */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Pilih Skenario</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {issue.scenarios.map(s => {
            const active = s.id === selectedScenario.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                style={{
                  padding: '9px 10px',
                  background: active ? 'var(--paper)' : 'transparent',
                  border: active ? '0.5px solid var(--red)' : '0.5px solid var(--ink-15)',
                  borderRadius: '2px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                }}
              >
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 2 }}>
                  <span className="meta-label" style={{ color: active ? 'var(--red)' : 'var(--ink-30)', fontSize: 7 }}>
                    {s.number}
                  </span>
                  <span style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 11,
                    fontWeight: 500,
                    color: active ? 'var(--red)' : 'var(--ink)',
                  }}>
                    {s.name}
                  </span>
                </div>
                <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-50)', margin: 0, lineHeight: 1.3 }}>
                  {s.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Predicted Impact */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Predicted Impact</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { label: 'Sentimen', value: selectedScenario.impact.sentimen },
            { label: 'Waktu dampak', value: selectedScenario.impact.waktu },
            { label: 'Risiko backfire', value: selectedScenario.impact.backfire },
            { label: 'Platform fokus', value: selectedScenario.impact.platform },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-50)' }}>{r.label}</span>
              <span style={{ fontFamily: 'Newsreader, serif', fontSize: 11, color: 'var(--ink)' }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Flow */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Alur Persetujuan</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {approvalSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: step.done ? 'var(--green)' : step.active ? 'var(--red)' : 'var(--ink-15)',
                border: step.active ? '2px solid var(--red)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {step.done && <span style={{ color: '#fff', fontSize: 9, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 10,
                color: step.active ? 'var(--red)' : step.done ? 'var(--green)' : 'var(--ink-30)',
                fontWeight: step.active ? 500 : 400,
              }}>
                {step.label}
              </span>
              {step.active && (
                <span className="meta-label" style={{ color: 'var(--red)', fontSize: 7 }}>AKTIF</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
