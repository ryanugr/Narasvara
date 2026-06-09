'use client';

import SparkGlyph from '@/components/brand/SparkGlyph';
import SentimentWedge from '@/components/brand/SentimentWedge';
import ChakraMark from '@/components/brand/ChakraMark';
import HalfChakraRule from '@/components/brand/HalfChakraRule';
import { briefMock } from '@/lib/mockData';

function SparklineChart({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 120;
  const h = 32;
  const range = max - min || 1;

  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke="var(--green)" strokeWidth={1.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} stroke="none" fill="rgba(45,106,71,0.08)" />
    </svg>
  );
}

export default function OverviewColumns() {
  const b = briefMock;

  const sentimentLabels: Record<string, { color: string; label: string }> = {
    positif: { color: 'var(--green)', label: 'positif' },
    netral: { color: 'var(--gold)', label: 'netral' },
    negatif: { color: 'var(--red)', label: 'negatif' },
    campur: { color: 'var(--ink-30)', label: 'campur' },
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      borderTop: '0.5px solid var(--ink-15)',
    }}>
      {/* ── Column 1: Popularitas ── */}
      <div style={{
        borderRight: '0.5px solid var(--ink-15)',
        padding: '20px',
      }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 12 }}>
          Popularitas · 7 Hari
        </p>

        {/* Main card */}
        <div style={{
          background: 'var(--parchment)',
          border: '0.5px solid var(--ink-15)',
          padding: '14px',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{
                fontFamily: 'Newsreader, serif',
                fontSize: 36,
                fontWeight: 400,
                color: 'var(--green)',
                lineHeight: 1,
                marginBottom: 2,
              }}>
                {b.popularity}
              </div>
              <div className="meta-label" style={{ color: 'var(--red)', fontSize: 8 }}>
                vs. Minggu Lalu
              </div>
            </div>
            <SparklineChart points={b.sparklinePoints} />
          </div>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontStyle: 'italic',
            fontSize: 11,
            color: 'var(--ink-50)',
            margin: '10px 0 0 0',
            lineHeight: 1.4,
          }}>
            {b.popularityNote}
          </p>
        </div>

        {/* Sentiment wedge bar */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ height: 6, display: 'flex', gap: 1, borderRadius: 1, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ flex: b.sentimentBar.positif, background: 'var(--green)' }} />
            <div style={{ flex: b.sentimentBar.netral, background: 'var(--gold)' }} />
            <div style={{ flex: b.sentimentBar.negatif, background: 'var(--red)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {[
              { v: b.sentimentBar.positif, c: 'var(--green)' },
              { v: b.sentimentBar.netral, c: 'var(--gold)' },
              { v: b.sentimentBar.negatif, c: 'var(--red)' },
            ].map(({ v, c }, i) => (
              <span key={i} style={{ fontFamily: 'Newsreader, serif', fontSize: 14, color: c }}>{v}%</span>
            ))}
          </div>
        </div>

        {/* Aksi hari ini */}
        <div style={{ marginTop: 16 }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>
            Aksi Hari Ini
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {b.actions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <SparkGlyph size={9} />
                <span style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 11,
                  color: 'var(--ink)',
                  lineHeight: 1.4,
                }}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 2: Apa yang Rakyat Bicarakan ── */}
      <div style={{
        borderRight: '0.5px solid var(--ink-15)',
        padding: '20px',
      }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 12 }}>
          Apa yang Rakyat Bicarakan
        </p>

        {/* Topic rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 16 }}>
          {b.topics.map((t, i) => {
            const sl = sentimentLabels[t.sentiment];
            return (
              <div key={i} style={{
                padding: '8px 10px',
                background: i % 2 === 0 ? 'var(--parchment)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <SentimentWedge direction={t.direction} size={11} />
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, flex: 1, color: 'var(--ink)' }}>
                  {t.name}
                </span>
                <span style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 10,
                  color: sl.color,
                }}>
                  {t.sentimentPct}% {sl.label}
                </span>
                <span style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: 11,
                  color: 'var(--ink-50)',
                }}>
                  {(t.mentions / 1000).toFixed(1)}k
                </span>
              </div>
            );
          })}
        </div>

        {/* Narrative Radar */}
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 6 }}>
            Narrative Radar
          </p>
          <div style={{ marginBottom: 8 }}>
            <HalfChakraRule />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { tag: 'ORGANIK', velocity: '+8%/jam', quote: '"Pemimpin yang turun langsung ke lapangan membuktikan kepedulian nyata."', fill: 72 },
              { tag: 'EKONOMI', velocity: '+3%/jam', quote: '"Kebijakan subsidi mulai dirasakan manfaatnya oleh pedagang kecil."', fill: 54 },
              { tag: 'DIGITAL', velocity: '+1%/jam', quote: '"Jalan desa yang diperbaiki menjadi bukti pembangunan merata."', fill: 38 },
            ].map((n, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{
                    padding: '1px 5px',
                    background: 'rgba(45,106,71,0.08)',
                    borderRadius: '2px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: 7,
                    color: 'var(--green)',
                  }}>
                    {n.tag}
                  </span>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--gold)' }}>{n.velocity}</span>
                </div>
                <p style={{
                  fontFamily: 'Newsreader, serif',
                  fontStyle: 'italic',
                  fontSize: 12,
                  color: 'var(--ink)',
                  margin: '0 0 4px 0',
                  lineHeight: 1.4,
                }}>
                  {n.quote}
                </p>
                <div style={{ height: 2, background: 'var(--ink-06)', borderRadius: 1 }}>
                  <div style={{ width: `${n.fill}%`, height: '100%', background: 'var(--green)', borderRadius: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 3: Di Mana Masalah ── */}
      <div style={{ padding: '20px' }}>
        <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 12 }}>
          Di Mana Masalah
        </p>

        {/* Abstract wedge cluster (regional map visual) */}
        <div style={{
          height: 80,
          position: 'relative',
          marginBottom: 12,
          overflow: 'hidden',
        }}>
          {[
            { left: '10%', top: '20%', rot: -15, color: 'rgba(203,16,46,0.18)', w: 60, h: 28 },
            { left: '35%', top: '5%', rot: 25, color: 'rgba(184,148,85,0.22)', w: 48, h: 20 },
            { left: '60%', top: '30%', rot: -35, color: 'rgba(203,16,46,0.12)', w: 70, h: 22 },
            { left: '20%', top: '55%', rot: 10, color: 'rgba(45,106,71,0.15)', w: 45, h: 18 },
            { left: '55%', top: '60%', rot: -20, color: 'rgba(203,16,46,0.25)', w: 55, h: 24 },
            { left: '75%', top: '10%', rot: 40, color: 'rgba(184,148,85,0.18)', w: 38, h: 16 },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: s.left,
              top: s.top,
              width: s.w,
              height: s.h,
              background: s.color,
              borderRadius: '1px',
              transform: `rotate(${s.rot}deg)`,
              clipPath: 'polygon(0 50%, 15% 0, 100% 20%, 85% 100%, 5% 80%)',
            }} />
          ))}
        </div>

        {/* Region alert */}
        <div style={{
          padding: '10px',
          background: 'var(--red-tint)',
          border: '0.5px solid rgba(203,16,46,0.15)',
          marginBottom: 12,
        }}>
          <p className="meta-label" style={{ color: 'var(--red)', fontSize: 8, marginBottom: 4 }}>
            3 wilayah perlu perhatian:
          </p>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)', margin: 0, lineHeight: 1.4 }}>
            {b.regionAlert}
          </p>
        </div>

        {/* Quote Frame */}
        <div style={{
          borderLeft: '2px solid var(--red)',
          paddingLeft: 10,
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
            <ChakraMark size={12} color="var(--red)" />
            <span className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 7 }}>
              Sebelum bicara, mendengar.
            </span>
          </div>
          <p style={{
            fontFamily: 'Newsreader, serif',
            fontStyle: 'italic',
            fontSize: 13,
            color: 'var(--ink)',
            margin: '0 0 5px 0',
            lineHeight: 1.5,
          }}>
            {b.quote}
          </p>
          <span className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7 }}>
            Insight Morning Brief #{b.number}
          </span>
        </div>

        {/* Platform bar chart */}
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>
            Platform Dominan
          </p>
          {[
            { name: 'TikTok', pct: 78, color: 'var(--ink)' },
            { name: 'Twitter/X', pct: 62, color: 'var(--ink-50)' },
            { name: 'Instagram', pct: 45, color: 'var(--ink-30)' },
            { name: 'News Online', pct: 31, color: 'var(--ink-15)' },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink)' }}>{p.name}</span>
                <span style={{ fontFamily: 'Newsreader, serif', fontSize: 10, color: 'var(--ink-50)' }}>{p.pct}%</span>
              </div>
              <div style={{ height: 2, background: 'var(--ink-06)', borderRadius: 1 }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 1 }} />
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp delivery */}
        <div style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 8px',
          background: 'rgba(45,106,71,0.06)',
          border: '0.5px solid rgba(45,106,71,0.15)',
          borderRadius: '2px',
        }}>
          <span style={{ fontSize: 10, color: 'var(--green)' }}>✓✓</span>
          <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-50)' }}>
            Brief dikirim via WhatsApp · 06:00 WIB
          </span>
        </div>
      </div>
    </div>
  );
}
