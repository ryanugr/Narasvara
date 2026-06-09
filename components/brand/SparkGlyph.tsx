'use client';

interface SparkGlyphProps {
  size?: number;
  color?: string;
}

export default function SparkGlyph({ size = 10, color = 'var(--red)' }: SparkGlyphProps) {
  const c = size / 2;
  const arm = size * 0.42;
  const thick = size * 0.18;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ flexShrink: 0 }}>
      <rect x={c - thick / 2} y={c - arm} width={thick} height={arm * 2} rx={1} fill={color} />
      <rect x={c - arm} y={c - thick / 2} width={arm * 2} height={thick} rx={1} fill={color} />
    </svg>
  );
}
