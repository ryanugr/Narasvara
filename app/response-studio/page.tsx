'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { studioIssues } from '@/lib/mockData';
import type { StudioIssue, Scenario } from '@/lib/types';
import IssueBanner from '@/components/studio/IssueBanner';
import ScenarioPanel from '@/components/studio/ScenarioPanel';
import DraftArea from '@/components/studio/DraftArea';
import ContextPanel from '@/components/studio/ContextPanel';

export default function ResponseStudioPage() {
  const { setCurrentScreen } = useApp();
  const [selectedIssue, setSelectedIssue] = useState<StudioIssue>(studioIssues[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(studioIssues[0].scenarios[0]);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    setCurrentScreen('response-studio');
  }, [setCurrentScreen]);

  const handleIssueChange = (issue: StudioIssue) => {
    setSelectedIssue(issue);
    setSelectedScenario(issue.scenarios[0]);
    setShowSimulation(false);
  };

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Issue selector strip */}
      <div style={{
        padding: '6px 16px',
        background: 'var(--parchment)',
        borderBottom: '0.5px solid var(--ink-15)',
        display: 'flex',
        gap: 6,
        alignItems: 'center',
      }}>
        <span className="meta-label" style={{ color: 'var(--ink-40)', fontSize: 8, marginRight: 4 }}>Isu:</span>
        {studioIssues.map(issue => (
          <button
            key={issue.id}
            onClick={() => handleIssueChange(issue)}
            style={{
              padding: '3px 10px',
              borderRadius: '2px',
              border: selectedIssue.id === issue.id ? `0.5px solid ${issue.tagColor}` : '0.5px solid var(--ink-15)',
              background: selectedIssue.id === issue.id ? `${issue.tagColor}10` : 'transparent',
              color: selectedIssue.id === issue.id ? issue.tagColor : 'var(--ink-50)',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 11,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span className="meta-label" style={{ fontSize: 7, color: 'inherit' }}>{issue.tag}</span>
            {issue.title}
          </button>
        ))}
      </div>

      <IssueBanner issue={selectedIssue} />

      {showSimulation ? (
        /* Crisis Simulation View */
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="meta-label" style={{ color: 'var(--red)', fontSize: 8, margin: '0 0 4px 0' }}>Simulasi Krisis</p>
              <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: 'var(--ink)', margin: 0 }}>
                Proyeksi Skenario 48 Jam
              </h2>
            </div>
            <button
              onClick={() => setShowSimulation(false)}
              style={{
                padding: '6px 12px',
                background: 'none',
                border: '0.5px solid var(--ink-15)',
                borderRadius: '2px',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              ← Kembali ke Draft
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {selectedIssue.scenarios.map((s, i) => {
              const outcomes = ['+22%', '+8%', '-18%'];
              const colors = ['var(--green)', 'var(--gold)', 'var(--red)'];
              const descs = [
                'Narasi dikendalikan, kredibilitas meningkat, media beralih ke pemberitaan positif.',
                'Isu mereda secara organik, tidak ada amplifikasi, sentimen stabil.',
                'Interpretasi diam = mengakui. Eskalasi cepat, media nasional aktif.',
              ];
              return (
                <div key={s.id} style={{
                  background: 'var(--paper)',
                  border: `0.5px solid ${i === 0 ? 'var(--green)' : i === 1 ? 'var(--ink-15)' : 'var(--red)'}30`,
                  padding: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8 }}>
                      {s.number} {s.name}
                    </span>
                    <span style={{
                      fontFamily: 'Newsreader, serif',
                      fontSize: 28,
                      color: colors[i],
                      lineHeight: 1,
                    }}>
                      {outcomes[i]}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)', margin: '0 0 8px', lineHeight: 1.5 }}>
                    {descs[i]}
                  </p>
                  <p className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8, margin: 0 }}>
                    Proyeksi sentimen 48 jam
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{
            padding: '12px 14px',
            background: 'var(--parchment)',
            borderLeft: '2px solid var(--red)',
          }}>
            <p style={{
              fontFamily: 'Newsreader, serif',
              fontStyle: 'italic',
              fontSize: 14,
              color: 'var(--ink)',
              margin: 0,
              lineHeight: 1.6,
            }}>
              "Berdasarkan pola historis dan volume saat ini, Scenario 01 Proaktif memiliki 73% kemungkinan menghasilkan sentimen positif dalam 12 jam. Waktu respons yang tepat adalah kunci — setiap jam penundaan meningkatkan biaya reputasi sebesar estimasi 4.200 cuitan negatif tambahan."
            </p>
            <p className="meta-label" style={{ color: 'var(--red)', fontSize: 8, margin: '6px 0 0 0' }}>
              Rekomendasi AI · NaraSvara Intelligence
            </p>
          </div>
        </div>
      ) : (
        /* Normal three-panel layout */
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <ScenarioPanel
            issue={selectedIssue}
            selectedScenario={selectedScenario}
            onSelect={setSelectedScenario}
          />
          <DraftArea
            scenario={selectedScenario}
            onSimulate={() => setShowSimulation(true)}
          />
          <ContextPanel
            issue={selectedIssue}
            onSimulate={() => setShowSimulation(true)}
          />
        </div>
      )}
    </div>
  );
}
