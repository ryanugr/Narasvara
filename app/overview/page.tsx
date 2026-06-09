'use client';

import { useEffect } from 'react';
import HalfChakraRule from '@/components/brand/HalfChakraRule';
import OverviewColumns from '@/components/overview/OverviewColumns';
import { useApp } from '@/context/AppContext';
import { briefMock } from '@/lib/mockData';

export default function OverviewPage() {
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    setCurrentScreen('overview');
  }, [setCurrentScreen]);

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100%' }}>
      {/* Hero */}
      <div style={{
        padding: '20px 24px 16px',
        background: 'var(--parchment)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span className="meta-label" style={{ color: 'var(--red)', fontSize: 8 }}>
              Morning Brief
            </span>
            <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8 }}>·</span>
            <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 8 }}>
              {briefMock.date}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Newsreader, serif',
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: '-0.022em',
            color: 'var(--ink)',
            margin: 0,
          }}>
            Selamat pagi, Bapak Joko.
          </h1>
        </div>
        <div style={{ maxWidth: 340, flexShrink: 0 }}>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontStyle: 'italic',
            fontSize: 12,
            color: 'var(--ink-50)',
            margin: 0,
            lineHeight: 1.6,
            textAlign: 'right',
          }}>
            167M voices, listened. 24 wedges, gathered.<br />
            12 themes detected overnight.
          </p>
        </div>
      </div>

      {/* Half Chakra Rule */}
      <div style={{ padding: '0 0 0 0' }}>
        <HalfChakraRule />
      </div>

      {/* Three columns */}
      <OverviewColumns />

      {/* Footer bar */}
      <div style={{
        borderTop: '0.5px solid var(--ink-15)',
        padding: '10px 24px',
        display: 'flex',
        gap: 20,
        background: 'var(--paper)',
        flexWrap: 'wrap',
      }}>
        {[
          `Dikirim 06:00 WIB · Setiap pagi`,
          `Customizable per wilayah & isu`,
          `17 platform · Real-time`,
          `Berdasarkan AI Persona`,
        ].map((item, i) => (
          <span key={i} style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 11,
            color: 'var(--ink-40)',
          }}>
            {item}
          </span>
        ))}
      </div>

      {/* Brief Archive */}
      <div style={{ padding: '20px 24px', background: 'var(--parchment)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, margin: 0 }}>Arsip Brief</p>
          <button style={{
            background: 'none',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            padding: '4px 10px',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 11,
            color: 'var(--ink-50)',
            cursor: 'pointer',
          }}>
            Semua Arsip →
          </button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}>
          {Array.from({ length: 8 }, (_, i) => {
            const num = briefMock.number - i - 1;
            const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
            const day = dayNames[i % 7];
            return (
              <div key={i} style={{
                background: 'var(--paper)',
                border: '0.5px solid var(--ink-15)',
                padding: '10px',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7 }}>#{num}</span>
                  <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7 }}>{day}</span>
                </div>
                <div style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: 18,
                  color: i % 3 === 0 ? 'var(--red)' : 'var(--green)',
                  lineHeight: 1,
                  marginBottom: 3,
                }}>
                  {i % 3 === 0 ? '-4%' : i % 3 === 1 ? '+8%' : '+12%'}
                </div>
                <div style={{ height: 2, background: 'var(--ink-06)', borderRadius: 1 }}>
                  <div style={{
                    width: `${40 + i * 7}%`,
                    height: '100%',
                    background: i % 3 === 0 ? 'var(--red)' : 'var(--green)',
                    borderRadius: 1,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
