'use client';

import { IconArrowRight } from '@tabler/icons-react';

interface ViewLinkProps {
  label: string;
  onClick?: () => void;
}

export default function ViewLink({ label, onClick }: ViewLinkProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        color: 'var(--red)',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      {label}
      <IconArrowRight size={11} stroke={2} />
    </button>
  );
}
