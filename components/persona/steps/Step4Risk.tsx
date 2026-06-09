'use client';

import SliderField from '@/components/ui/SliderField';

interface Props {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const riskLevels = [
  { label: 'Konservatif', desc: 'Respons hanya setelah konsultasi penuh. Prioritas keamanan citra.' },
  { label: 'Hati-hati', desc: 'Respons terukur dengan verifikasi fakta menyeluruh.' },
  { label: 'Seimbang', desc: 'Pertimbangan manfaat vs. risiko secara proporsional.' },
  { label: 'Proaktif', desc: 'Ambil inisiatif lebih awal, terima beberapa ketidakpastian.' },
  { label: 'Agresif', desc: 'Respons cepat dan berani, prioritas kecepatan di atas segalanya.' },
];

const triggers = ['Volume naik 200%', 'Trending nasional', 'Media TV meliput', 'Tokoh oposisi angkat bicara', 'Petisi online', 'Demo fisik'];
const responseTimes = ['< 30 menit', '1–2 jam', '4–6 jam', '12–24 jam', 'Per jadwal'];

export default function Step4Risk({ data, onChange }: Props) {
  const riskIndex = (data.riskLevel as number) ?? 1;
  const selectedTriggers = (data.triggers as string[]) || [];

  const toggleTrigger = (t: string) => {
    const curr = selectedTriggers;
    onChange('triggers', curr.includes(t) ? curr.filter(x => x !== t) : [...curr, t]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 5-segment risk track */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 10 }}>
          Posisi Toleransi Risiko
        </label>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {riskLevels.map((l, i) => (
            <button
              key={i}
              onClick={() => onChange('riskLevel', i)}
              style={{
                flex: 1,
                padding: '10px 4px',
                borderRadius: '2px',
                border: riskIndex === i ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-06)',
                background: riskIndex === i ? 'var(--ink)' : i < riskIndex ? 'var(--ink-06)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 8,
                letterSpacing: '0.05em',
                color: riskIndex === i ? 'var(--parchment)' : 'var(--ink-40)',
                textAlign: 'center',
              }}>
                {l.label}
              </span>
            </button>
          ))}
        </div>
        <div style={{
          padding: '8px 10px',
          background: 'var(--parchment)',
          border: '0.5px solid var(--ink-15)',
          borderRadius: '2px',
        }}>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)', margin: 0 }}>
            {riskLevels[riskIndex].desc}
          </p>
        </div>
      </div>

      {/* Risk sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SliderField
          label="Risiko saat Damai"
          value={(data.riskPeace as number) ?? 25}
          onChange={v => onChange('riskPeace', v)}
          leftLabel="Sangat Aman"
          rightLabel="Berani"
        />
        <SliderField
          label="Risiko saat Krisis"
          value={(data.riskCrisis as number) ?? 50}
          onChange={v => onChange('riskCrisis', v)}
          leftLabel="Diam Strategis"
          rightLabel="Konfrontatif"
        />
      </div>

      {/* Escalation triggers */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Pemicu Eskalasi
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {triggers.map(t => (
            <button
              key={t}
              onClick={() => toggleTrigger(t)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: selectedTriggers.includes(t) ? '0.5px solid var(--red)' : '0.5px solid var(--ink-15)',
                background: selectedTriggers.includes(t) ? 'var(--red-tint)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: selectedTriggers.includes(t) ? 'var(--red)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Response time */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Target Waktu Respons
        </label>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {responseTimes.map(t => (
            <button
              key={t}
              onClick={() => onChange('responseTime', t)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: data.responseTime === t ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: data.responseTime === t ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: data.responseTime === t ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
