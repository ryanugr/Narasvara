'use client';

interface SliderFieldProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

export default function SliderField({
  label, value, min = 0, max = 100, onChange, leftLabel, rightLabel,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)' }}>{label}</span>
        <span style={{ fontFamily: 'Newsreader, serif', fontSize: 13, color: 'var(--ink)' }}>{value}</span>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          height: 3, background: 'var(--ink-15)', borderRadius: 2, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--ink)', borderRadius: 2, transition: 'width 0.1s' }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', top: -5, left: 0, right: 0, width: '100%', opacity: 0, cursor: 'pointer', height: 14, zIndex: 1 }}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8 }}>{leftLabel}</span>
          <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8 }}>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
