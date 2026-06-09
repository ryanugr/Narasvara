'use client';

interface ToneCardProps {
  label: string;
  desc: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ToneCard({ label, desc, selected, onClick }: ToneCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px',
        background: selected ? 'var(--red-tint)' : 'var(--paper)',
        border: selected ? '0.5px solid rgba(203,16,46,0.35)' : '0.5px solid var(--ink-15)',
        borderRadius: '2px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
      }}
    >
      <div style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 12,
        fontWeight: 500,
        color: selected ? 'var(--red)' : 'var(--ink)',
        marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 11,
        color: 'var(--ink-50)',
        lineHeight: 1.4,
      }}>
        {desc}
      </div>
    </button>
  );
}
