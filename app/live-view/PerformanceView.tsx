'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

const sentimentData = [
  { day: 'S', value: 62, type: 'gold' },
  { day: 'S', value: 68, type: 'green' },
  { day: 'R', value: 55, type: 'gold' },
  { day: 'K', value: 71, type: 'green' },
  { day: 'J', value: 74, type: 'green' },
  { day: 'S', value: 69, type: 'green' },
  { day: 'M', value: 76, type: 'green' },
  { day: 'S', value: 78, type: 'green' },
];

export default function PerformanceView() {
  const { riskState } = useApp();
  const data = riskStates[riskState];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr 1fr',
      gap: 8,
      padding: '8px 12px',
      alignItems: 'start',
    }}>
      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Reputation Signals */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Reputation Signals
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { label: 'Trust Score', value: '78%', trend: '+3%', up: true },
              { label: 'Favorability', value: '71%', trend: '+5%', up: true },
              { label: 'Net Promoter', value: '+42', trend: '+8', up: true },
              { label: 'Share of Voice', value: '34%', trend: '-2%', up: false },
              { label: 'Mention Rate', value: '48.2k/hari', trend: '+12%', up: true },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink-50)' }}>{r.label}</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Newsreader, serif', fontSize: 12, color: 'var(--ink)' }}>{r.value}</span>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: r.up ? 'var(--green)' : 'var(--red)' }}>{r.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Hub */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Social Media Hub
          </p>
          {[
            { platform: 'TikTok', followers: '2.1M', eng: '8.4%' },
            { platform: 'Instagram', followers: '4.8M', eng: '5.2%' },
            { platform: 'Twitter/X', followers: '1.9M', eng: '3.8%' },
          ].map(p => (
            <div key={p.platform} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)' }}>{p.platform}</span>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-50)' }}>{p.followers} · {p.eng}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Sentiment Trend Chart */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Tren Sentimen · 8 Hari
          </p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={sentimentData} barSize={18} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="day" tick={{ fontFamily: 'Space Grotesk', fontSize: 8, fill: 'rgba(13,13,13,0.4)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[1, 1, 0, 0]}>
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.type === 'green' ? '#2D6A47' : '#B89455'}
                    opacity={index === sentimentData.length - 1 ? 1 : 0.65}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Effectiveness */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Campaign Effectiveness
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Reach', value: '12.4M', sub: 'total minggu ini' },
              { label: 'Engagement', value: '6.8%', sub: 'rate rata-rata' },
              { label: 'Conversion', value: '2.1%', sub: 'ke aksi positif' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--parchment)',
                padding: '8px',
                borderRadius: '2px',
                textAlign: 'center',
              }}>
                <div className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 7, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 9, color: 'var(--ink-40)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Media Monitor */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Media Monitor
          </p>
          {[
            { outlet: 'Kompas.com', tone: 'netral', count: 12 },
            { outlet: 'Tempo.co', tone: 'kritis', count: 8 },
            { outlet: 'Detik.com', tone: 'positif', count: 21 },
          ].map(m => (
            <div key={m.outlet} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)' }}>{m.outlet}</span>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <span style={{
                  padding: '1px 5px',
                  background: m.tone === 'positif' ? 'var(--green-tint)' : m.tone === 'kritis' ? 'var(--red-tint)' : 'var(--gold-tint)',
                  borderRadius: '2px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: 7,
                  color: m.tone === 'positif' ? 'var(--green)' : m.tone === 'kritis' ? 'var(--red)' : 'var(--gold)',
                }}>
                  {m.tone}
                </span>
                <span style={{ fontFamily: 'Newsreader, serif', fontSize: 11, color: 'var(--ink-50)' }}>{m.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Konten */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '12px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>
            Top Konten
          </p>
          {[
            { title: 'Kunjungan Sultra', views: '2.3M', platform: 'TikTok' },
            { title: 'Program MBG', views: '1.8M', platform: 'Instagram' },
            { title: 'Infrastruktur Desa', views: '940K', platform: 'YouTube' },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < 2 ? '0.5px solid var(--ink-06)' : 'none' }}>
              <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)', marginBottom: 2 }}>{c.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-40)' }}>{c.platform}</span>
                <span style={{ fontFamily: 'Newsreader, serif', fontSize: 11, color: 'var(--gold)' }}>{c.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
