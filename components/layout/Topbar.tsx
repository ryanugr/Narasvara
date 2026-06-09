'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IconBell, IconSettings2 } from '@tabler/icons-react';
import ChakraMark from '@/components/brand/ChakraMark';
import { useApp } from '@/context/AppContext';

const navTabs = [
  { href: '/overview', label: 'Overview' },
  { href: '/live-view', label: 'Live View' },
  { href: '/response-studio', label: 'Response Studio' },
];

const pageNames: Record<string, string> = {
  '/overview': 'MORNING BRIEF',
  '/live-view': 'COMMAND CENTER',
  '/response-studio': 'RESPONSE STUDIO',
  '/persona': 'AI PERSONA',
};

export default function Topbar() {
  const pathname = usePathname();
  const { persona } = useApp();
  const initials = persona.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const pageName = pageNames[pathname] || 'NARASVARA';

  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(new Date().toLocaleDateString('id-ID', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    }));
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        height: 'var(--topbar-height)',
        background: 'var(--paper)',
        borderBottom: '0.5px solid var(--ink-15)',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        gap: 0,
      }}
    >
      {/* Left: Brand + page name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200 }}>
        <ChakraMark size={20} color="var(--ink)" />
        <span style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 15,
          letterSpacing: '-0.022em',
          color: 'var(--ink)',
        }}>
          narasvara
        </span>
        <span style={{ color: 'var(--ink-30)', fontSize: 12, margin: '0 2px' }}>·</span>
        <span className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 9 }}>
          {pageName}
        </span>
      </div>

      {/* Center: Nav tabs */}
      <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 0 }}>
        {navTabs.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: '0 16px',
                height: 'var(--topbar-height)',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 12,
                fontWeight: active ? 500 : 400,
                color: active ? 'var(--ink)' : 'var(--ink-50)',
                borderBottom: active ? '2px solid var(--red)' : '2px solid transparent',
                textDecoration: 'none',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Date + Persona + icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 200, justifyContent: 'flex-end' }}>
        <span className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 9 }}>{today}</span>

        {/* Persona chip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '3px 8px 3px 4px',
          background: 'var(--gold-tint)',
          border: '0.5px solid rgba(184,148,85,0.25)',
          borderRadius: '2px',
        }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: 7,
            color: 'var(--paper)',
          }}>
            {initials}
          </div>
          <span style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 11,
            color: 'var(--ink)',
          }}>
            {persona.name.split(' ')[0]}
          </span>
        </div>

        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-50)', padding: 2, display: 'flex', alignItems: 'center' }}>
          <IconBell size={16} stroke={1.5} />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-50)', padding: 2, display: 'flex', alignItems: 'center' }}>
          <IconSettings2 size={16} stroke={1.5} />
        </button>
      </div>
    </header>
  );
}
