'use client';

import { useState } from 'react';
import SparkGlyph from '@/components/brand/SparkGlyph';
import type { Scenario } from '@/lib/types';

interface Props {
  scenario: Scenario;
  onSimulate: () => void;
}

const formats = ['Pernyataan', 'Sosial Media', 'Talking Points'];

const socialDrafts: Record<string, string> = {
  's1': 'Saya mendengar kekhawatiran Anda tentang transparansi anggaran. Laporan lengkap akan dipublikasikan dalam 48 jam. Setiap rupiah rakyat harus dipertanggungjawabkan. 🇮🇩 #Akuntabilitas #TransparansiAPBN',
  's2': 'Pertanyaan tentang pengelolaan anggaran adalah bagian sehat dari demokrasi. Mekanisme pengawasan yang kuat sudah ada. Kami mengundang Anda mengakses portal transparansi kami. #OpenGovernment',
  's3': '— Tidak ada posting yang direncanakan saat ini. Pantau perkembangan 4 jam ke depan. —',
};

export default function DraftArea({ scenario, onSimulate }: Props) {
  const [format, setFormat] = useState('Pernyataan');
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const displayDraft = format === 'Sosial Media' ? (socialDrafts[scenario.id] || scenario.draft) : scenario.draft;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 1200);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: 12, overflowY: 'auto' }}>
      {/* Format pills */}
      <div style={{ display: 'flex', gap: 4 }}>
        {formats.map(f => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            style={{
              padding: '4px 12px',
              borderRadius: '2px',
              border: format === f ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
              background: format === f ? 'var(--ink)' : 'transparent',
              color: format === f ? 'var(--parchment)' : 'var(--ink-50)',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 11,
              fontWeight: format === f ? 500 : 400,
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Draft box */}
      <div style={{
        background: 'var(--parchment)',
        border: '0.5px solid var(--ink-15)',
        padding: '14px',
        flex: 1,
        position: 'relative',
      }}>
        <p className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginBottom: 8 }}>
          Draft AI · Scenario {scenario.number} — {scenario.name}
        </p>
        {isRegenerating ? (
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontStyle: 'italic', fontSize: 12, color: 'var(--ink-30)', lineHeight: 1.6 }}>
            Menganalisis ulang konteks dan menghasilkan draft baru...
          </p>
        ) : (
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            {displayDraft}
            <span style={{ borderLeft: '1.5px solid var(--red)', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
          </p>
        )}
        <p style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontStyle: 'italic',
          fontSize: 10,
          color: 'var(--ink-40)',
          margin: '10px 0 0 0',
        }}>
          Dikalibrasi berdasarkan AI Persona: Formal Hangat · Empatik & Dekat
        </p>
      </div>

      {/* Talking points */}
      {format !== 'Sosial Media' && (
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Talking Points</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scenario.talkingPoints.map((tp, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <SparkGlyph size={9} />
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)', lineHeight: 1.5 }}>{tp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingTop: 10,
        borderTop: '0.5px solid var(--ink-06)',
        flexWrap: 'wrap',
      }}>
        <button style={{
          padding: '8px 16px',
          background: 'var(--ink)',
          border: 'none',
          borderRadius: '2px',
          color: 'var(--parchment)',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          Kirim ke Comms Director
        </button>
        <button
          onClick={handleRegenerate}
          style={{
            padding: '8px 12px',
            background: 'none',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            color: 'var(--ink-50)',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          style={{
            padding: '8px 12px',
            background: 'none',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            color: copied ? 'var(--green)' : 'var(--ink-50)',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Tersalin!' : 'Salin Draft'}
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={onSimulate}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 11,
            color: 'var(--ink-40)',
          }}
        >
          Abaikan Isu →
        </button>
      </div>
    </div>
  );
}
