'use client';

interface Props {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const valueOptions = ['Integritas', 'Kerja Nyata', 'Merakyat', 'Transparansi', 'Kemandirian', 'Inovasi', 'Keberlanjutan', 'Keadilan Sosial', 'Religiositas', 'Nasionalisme'];
const parties = ['PDI-P', 'Golkar', 'Gerindra', 'PKB', 'Nasdem', 'PKS', 'Demokrat', 'PPP', 'Non-Partisan'];
const sensitiveTopics = ['Agama', 'Suku & Ras', 'Seksualitas', 'Rokok & Alkohol', 'Utang Negara', 'China', 'Militer', 'Dinasti Politik'];

export default function Step3Values({ data, onChange }: Props) {
  const selectedValues = (data.values as string[]) || [];
  const selectedSensitive = (data.sensitive as string[]) || [];

  const toggleValue = (v: string) => {
    const curr = selectedValues;
    onChange('values', curr.includes(v) ? curr.filter(x => x !== v) : [...curr, v]);
  };

  const toggleSensitive = (v: string) => {
    const curr = selectedSensitive;
    onChange('sensitive', curr.includes(v) ? curr.filter(x => x !== v) : [...curr, v]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Values */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Nilai Inti (pilih yang sesuai)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {valueOptions.map(v => (
            <button
              key={v}
              onClick={() => toggleValue(v)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: selectedValues.includes(v) ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: selectedValues.includes(v) ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: selectedValues.includes(v) ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Red lines */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 5 }}>
          Hal yang Tidak Akan Pernah Dilakukan
        </label>
        <textarea
          value={(data.redLines as string) || ''}
          onChange={e => onChange('redLines', e.target.value)}
          placeholder="Deskripsikan batas mutlak yang tidak boleh dilampaui dalam komunikasi publik..."
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

      {/* Party affiliation */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Afiliasi Partai
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {parties.map(p => (
            <button
              key={p}
              onClick={() => onChange('party', p)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: data.party === p ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: data.party === p ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: data.party === p ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Sensitive topics */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Topik Sensitif (hindari atau perlu kehati-hatian)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {sensitiveTopics.map(t => (
            <button
              key={t}
              onClick={() => toggleSensitive(t)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: selectedSensitive.includes(t) ? '0.5px solid rgba(203,16,46,0.35)' : '0.5px solid var(--ink-15)',
                background: selectedSensitive.includes(t) ? 'var(--red-tint)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: selectedSensitive.includes(t) ? 'var(--red)' : 'var(--ink-50)',
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
