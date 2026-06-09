'use client';

import { IconSparkles } from '@tabler/icons-react';
import { useApp } from '@/context/AppContext';

export default function AskButton() {
  const { askOpen, setAskOpen } = useApp();

  if (askOpen) return null;

  return (
    <button
      onClick={() => setAskOpen(true)}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 50,
        background: 'var(--ink)',
        border: 'none',
        borderRadius: 24,
        padding: '10px 16px 10px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(13,13,13,0.2)',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(13,13,13,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(13,13,13,0.2)';
      }}
    >
      <div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'var(--red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <IconSparkles size={13} stroke={1.5} color="#fff" />
      </div>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: '0.08em',
        color: 'rgba(244,239,226,0.85)',
      }}>
        Ask
      </span>
    </button>
  );
}
