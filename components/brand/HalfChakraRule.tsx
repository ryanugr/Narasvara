'use client';

export default function HalfChakraRule() {
  const count = 24;
  const width = 600;
  const height = 12;
  const cx = width / 2;
  const cy = height * 2;
  const outerR = height * 1.8;
  const innerR = height * 0.6;
  const angleDeg = 360 / count;
  const arcFraction = 0.32;

  const getColor = (i: number) => {
    if (i % 4 === 0) return `rgba(184,148,85,0.45)`;
    if (i % 4 === 2) return `rgba(203,16,46,0.65)`;
    return `rgba(13,13,13,0.22)`;
  };

  const wedges = Array.from({ length: count }, (_, i) => {
    if (i > 11) return null;
    const midAngle = ((i * angleDeg) + 180) * (Math.PI / 180);
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

    return (
      <path
        key={i}
        d={`M ${innerX1} ${innerY1} L ${outerX1} ${outerY1} A ${outerR} ${outerR} 0 0 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} Z`}
        fill={getColor(i)}
      />
    );
  });

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', overflow: 'visible', height: `${height}px` }}
    >
      {wedges}
    </svg>
  );
}
