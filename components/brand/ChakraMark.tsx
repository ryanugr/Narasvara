'use client';

interface ChakraMarkProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export default function ChakraMark({ size = 32, color = '#0D0D0D', opacity = 1 }: ChakraMarkProps) {
  const cx = size / 2;
  const cy = size / 2;
  const scale = size / 100;
  const outerR = 45 * scale;
  const innerR = 14 * scale;
  const centerR = 6 * scale;
  const count = 24;
  const angleDeg = 360 / count;
  const arcFraction = 0.32;

  const wedges = Array.from({ length: count }, (_, i) => {
    const midAngle = (i * angleDeg - 90) * (Math.PI / 180);
    const halfArc = (angleDeg * arcFraction * Math.PI) / 180;

    const outerX1 = cx + outerR * Math.cos(midAngle - halfArc);
    const outerY1 = cy + outerR * Math.sin(midAngle - halfArc);
    const outerX2 = cx + outerR * Math.cos(midAngle + halfArc);
    const outerY2 = cy + outerR * Math.sin(midAngle + halfArc);

    const innerHalf = halfArc * 0.4;
    const innerX1 = cx + innerR * Math.cos(midAngle - innerHalf);
    const innerY1 = cy + innerR * Math.sin(midAngle - innerHalf);
    const innerX2 = cx + innerR * Math.cos(midAngle + innerHalf);
    const innerY2 = cy + innerR * Math.sin(midAngle + innerHalf);

    return `M ${innerX1} ${innerY1} L ${outerX1} ${outerY1} A ${outerR} ${outerR} 0 0 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} Z`;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity }}>
      {wedges.map((d, i) => (
        <path key={i} d={d} fill={color} />
      ))}
      <circle cx={cx} cy={cy} r={centerR} fill={color} />
    </svg>
  );
}
