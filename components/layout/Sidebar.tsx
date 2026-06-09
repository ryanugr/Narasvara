'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconSun, IconRadar, IconEdit, IconUserCircle,
  IconUsers, IconSettings,
} from '@tabler/icons-react';
import ChakraMark from '@/components/brand/ChakraMark';

const topLinks = [
  { href: '/overview', icon: IconSun, label: 'Overview' },
  { href: '/live-view', icon: IconRadar, label: 'Live View' },
  { href: '/response-studio', icon: IconEdit, label: 'Response Studio' },
];

const bottomLinks = [
  { href: '/persona', icon: IconUserCircle, label: 'AI Persona' },
  { href: '/team', icon: IconUsers, label: 'Tim' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--ink)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10px',
        paddingBottom: '12px',
      }}
    >
      {/* Logo */}
      <Link href="/overview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 36, marginBottom: 8 }}>
        <ChakraMark size={24} color="#F4EFE2" opacity={0.9} />
      </Link>

      {/* Divider */}
      <div style={{ width: 24, height: '0.5px', background: 'rgba(244,239,226,0.12)', marginBottom: 8 }} />

      {/* Top nav links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, width: '100%', alignItems: 'center' }}>
        {topLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            title={label}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              background: isActive(href) ? 'rgba(203,16,46,0.25)' : 'transparent',
              color: isActive(href) ? '#F5A0B0' : 'rgba(244,239,226,0.45)',
              transition: 'background 0.15s, color 0.15s',
              textDecoration: 'none',
            }}
          >
            <Icon size={18} stroke={1.5} />
          </Link>
        ))}

        {/* Middle divider */}
        <div style={{ width: 24, height: '0.5px', background: 'rgba(244,239,226,0.12)', margin: '6px 0' }} />

        {bottomLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            title={label}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              background: isActive(href) ? 'rgba(203,16,46,0.25)' : 'transparent',
              color: isActive(href) ? '#F5A0B0' : 'rgba(244,239,226,0.35)',
              transition: 'background 0.15s, color 0.15s',
              textDecoration: 'none',
            }}
          >
            <Icon size={18} stroke={1.5} />
          </Link>
        ))}
      </div>

      {/* Settings at bottom */}
      <Link
        href="/settings"
        title="Settings"
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2px',
          color: 'rgba(244,239,226,0.25)',
          textDecoration: 'none',
        }}
      >
        <IconSettings size={18} stroke={1.5} />
      </Link>
    </aside>
  );
}
