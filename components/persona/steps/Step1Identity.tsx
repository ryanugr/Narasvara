'use client';

import SparkGlyph from '@/components/brand/SparkGlyph';

interface Props {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const segments = ['DPR', 'Gubernur', 'Calon 2029', 'BUMN', 'Korporasi', 'Figur Publik', 'Partai', 'Lainnya'];
const regions = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Utara', 'Sulawesi Selatan', 'Kalimantan Timur', 'Bali', 'Nasional'];
const issueTags = ['Ekonomi', 'Kesehatan', 'Pendidikan', 'Infrastruktur', 'Lingkungan', 'Keamanan', 'Agama & Budaya', 'Teknologi', 'Agraria', 'Korupsi'];

export default function Step1Identity({ data, onChange }: Props) {
  const selectedIssues = (data.issues as string[]) || [];
  const selectedRegions = (data.regions as string[]) || [];

  const toggleIssue = (issue: string) => {
    const curr = selectedIssues;
    if (curr.includes(issue)) {
      onChange('issues', curr.filter(i => i !== issue));
    } else if (curr.length < 5) {
      onChange('issues', [...curr, issue]);
    }
  };

  const toggleRegion = (region: string) => {
    const curr = selectedRegions;
    onChange('regions', curr.includes(region) ? curr.filter(r => r !== region) : [...curr, region]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Name + role */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'Nama Publik', key: 'name', placeholder: 'cth. Budi Santoso' },
          { label: 'Jabatan', key: 'role', placeholder: 'cth. Gubernur Jawa Barat' },
        ].map(f => (
          <div key={f.key}>
            <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 5 }}>
              {f.label}
            </label>
            <input
              value={(data[f.key] as string) || ''}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: '100%',
                padding: '8px 10px',
                background: 'var(--paper)',
                border: '0.5px solid var(--ink-15)',
                borderRadius: '2px',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 13,
                color: 'var(--ink)',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Segment */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Segmen
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {segments.map(s => (
            <button
              key={s}
              onClick={() => onChange('segment', s)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: data.segment === s ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: data.segment === s ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: data.segment === s ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Regional chips */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Wilayah Utama
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {regions.map(r => (
            <button
              key={r}
              onClick={() => toggleRegion(r)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: selectedRegions.includes(r) ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: selectedRegions.includes(r) ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: selectedRegions.includes(r) ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Issue priority tags */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8 }}>
            Prioritas Isu (maks. 5)
          </label>
          <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8 }}>
            {selectedIssues.length}/5 dipilih
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {issueTags.map(issue => {
            const sel = selectedIssues.includes(issue);
            return (
              <button
                key={issue}
                onClick={() => toggleIssue(issue)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '2px',
                  border: sel ? '0.5px solid rgba(203,16,46,0.35)' : '0.5px solid var(--ink-15)',
                  background: sel ? 'var(--red-tint)' : 'transparent',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 11,
                  color: sel ? 'var(--red)' : 'var(--ink-50)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {sel && <SparkGlyph size={8} />}
                {issue}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
