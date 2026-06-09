'use client';

interface SentimentWedgeProps {
  direction: 'up' | 'flat' | 'down';
  color?: string;
  size?: number;
}

export default function SentimentWedge({ direction, color, size = 14 }: SentimentWedgeProps) {
  const defaultColor = direction === 'up' ? '#2D6A47' : direction === 'down' ? '#CB102E' : '#B89455';
  const fill = color || defaultColor;

  const w = size;
  const h = size * 0.55;

  if (direction === 'up') {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <polygon points={`${w * 0.5},0 ${w},${h} 0,${h}`} fill={fill} />
      </svg>
    );
  }

  if (direction === 'down') {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <polygon points={`0,0 ${w},0 ${w * 0.5},${h}`} fill={fill} />
      </svg>
    );
  }

  return (
    <svg width={w} height={h * 0.6} viewBox={`0 0 ${w} ${h * 0.6}`} fill="none">
      <rect x={0} y={h * 0.15} width={w} height={h * 0.3} rx={1} fill={fill} />
    </svg>
  );
}
