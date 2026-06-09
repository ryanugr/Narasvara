'use client';

import ToneCard from '@/components/ui/ToneCard';

interface Props {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const registers = ['Formal Resmi', 'Formal Hangat', 'Semi-Formal', 'Populer'];
const tones = [
  { label: 'Berbasis Fakta', desc: 'Data dan angka sebagai landasan setiap pernyataan.' },
  { label: 'Empatik & Dekat', desc: 'Menyentuh hati rakyat dengan bahasa yang hangat.' },
  { label: 'Tegas & Visioner', desc: 'Kepemimpinan kuat, orientasi masa depan.' },
  { label: 'Dialogis & Terbuka', desc: 'Mengundang percakapan, mendengarkan aktif.' },
];

export default function Step2Style({ data, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Register */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Register Bahasa
        </label>
        <div style={{ display: 'flex', gap: 5 }}>
          {registers.map(r => (
            <button
              key={r}
              onClick={() => onChange('register', r)}
              style={{
                padding: '5px 12px',
                borderRadius: '2px',
                border: data.register === r ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: data.register === r ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: data.register === r ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Tone cards */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Nada Komunikasi
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {tones.map(t => (
            <ToneCard
              key={t.label}
              label={t.label}
              desc={t.desc}
              selected={data.tone === t.label}
              onClick={() => onChange('tone', t.label)}
            />
          ))}
        </div>
      </div>

      {/* Avoided language */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 5 }}>
          Bahasa yang Dihindari
        </label>
        <textarea
          value={(data.avoidedLanguage as string) || ''}
          onChange={e => onChange('avoidedLanguage', e.target.value)}
          placeholder="cth. kata-kata provokasi, istilah asing berlebihan, bahasa elitis..."
          rows={3}
          style={{
            width: '100%',
            padding: '8px 10px',
            background: 'var(--paper)',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            color: 'var(--ink)',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.5,
          }}
        />
      </div>

      {/* Signature phrase */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 5 }}>
          Contoh Kalimat Khas Anda
        </label>
        <textarea
          value={(data.signaturePhrase as string) || ''}
          onChange={e => onChange('signaturePhrase', e.target.value)}
          placeholder="cth. 'Kerja nyata untuk Indonesia...' atau 'Bersama kita bisa wujudkan...'"
          rows={3}
          style={{
            width: '100%',
            padding: '8px 10px',
            background: 'var(--paper)',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            color: 'var(--ink)',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  );
}
