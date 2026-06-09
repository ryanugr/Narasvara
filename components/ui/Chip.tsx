'use client';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  color?: 'ink' | 'red' | 'gold' | 'green';
  size?: 'sm' | 'md';
}

export default function Chip({ label, selected, onClick, color = 'ink', size = 'md' }: ChipProps) {
  const colors = {
    ink: {
      selected: { bg: 'rgba(13,13,13,0.08)', border: 'rgba(13,13,13,0.35)', text: 'var(--ink)' },
      default: { bg: 'transparent', border: 'var(--ink-15)', text: 'var(--ink-50)' },
    },
    red: {
      selected: { bg: 'var(--red-tint)', border: 'rgba(203,16,46,0.3)', text: 'var(--red)' },
      default: { bg: 'transparent', border: 'var(--ink-15)', text: 'var(--ink-50)' },
    },
    gold: {
      selected: { bg: 'var(--gold-tint)', border: 'rgba(184,148,85,0.3)', text: 'var(--gold)' },
      default: { bg: 'transparent', border: 'var(--ink-15)', text: 'var(--ink-50)' },
    },
    green: {
      selected: { bg: 'var(--green-tint)', border: 'rgba(45,106,71,0.3)', text: 'var(--green)' },
      default: { bg: 'transparent', border: 'var(--ink-15)', text: 'var(--ink-50)' },
    },
  };

  const c = colors[color][selected ? 'selected' : 'default'];
  const pad = size === 'sm' ? '2px 7px' : '4px 10px';
  const fs = size === 'sm' ? 10 : 11;

  return (
    <button
      onClick={onClick}
      style={{
        padding: pad,
        background: c.bg,
        border: `0.5px solid ${c.border}`,
        borderRadius: '2px',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: fs,
        color: c.text,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}
