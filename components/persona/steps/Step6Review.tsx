'use client';

import { IconPencil } from '@tabler/icons-react';

interface Props {
  data: Record<string, unknown>;
  onEditStep: (step: number) => void;
}

const riskLabels = ['Konservatif', 'Hati-hati', 'Seimbang', 'Proaktif', 'Agresif'];

export default function Step6Review({ data, onEditStep }: Props) {
  const reviewCards = [
    {
      step: 1,
      title: 'Nama & Peran',
      content: `${data.name || 'Belum diisi'} — ${data.role || 'Belum diisi'}${data.segment ? ` · ${data.segment}` : ''}`,
    },
    {
      step: 2,
      title: 'Gaya Komunikasi',
      content: `${data.register || 'Belum dipilih'} · ${data.tone || 'Belum dipilih'}`,
    },
    {
      step: 4,
      title: 'Toleransi Risiko',
      content: riskLabels[(data.riskLevel as number) ?? 1],
    },
    {
      step: 5,
      title: 'Audiens Utama',
      content: ((data.audiences as string[]) || ['Belum dipilih']).slice(0, 3).join(', '),
    },
  ];

  const team: Array<{ name: string; role: string; initials: string }> = [
    { name: 'Ari Santoso', role: 'Comms Director', initials: 'AS' },
    { name: 'Dewi Pratiwi', role: 'Digital Lead', initials: 'DP' },
    { name: '+ Tambah anggota', role: '', initials: '+' },
  ];

  const briefPreview = `Selamat pagi, ${(data.name as string)?.split(' ')[0] || 'Anda'}. Hari ini 167M suara telah dianalisis. Sentimen publik berada di 71% positif — naik 3% dari kemarin. Isu prioritas pagi ini: ${((data.issues as string[]) || ['topik Anda'])[0] || 'topik utama'}. Gaya komunikasi ${data.register || 'formal hangat'} direkomendasikan untuk merespons narasi yang sedang berkembang.`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* LEFT: Summary + Team */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Review cards */}
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Ringkasan Persona</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {reviewCards.map(card => (
              <div key={card.step} style={{
                padding: '10px',
                background: 'var(--paper)',
                border: '0.5px solid var(--ink-15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 8,
              }}>
                <div>
                  <div className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginBottom: 3 }}>{card.title}</div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)' }}>{card.content}</div>
                </div>
                <button
                  onClick={() => onEditStep(card.step - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 2,
                    cursor: 'pointer',
                    color: 'var(--ink-30)',
                    flexShrink: 0,
                  }}
                >
                  <IconPencil size={12} stroke={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Team seats */}
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 8 }}>Tim</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {team.map((member, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 10px',
                background: 'var(--paper)',
                border: '0.5px solid var(--ink-15)',
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: member.initials === '+' ? 'var(--ink-06)' : 'var(--ink)',
                  border: member.initials === '+' ? '0.5px dashed var(--ink-30)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: 8,
                  color: member.initials === '+' ? 'var(--ink-40)' : '#fff',
                }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: member.initials === '+' ? 'var(--ink-40)' : 'var(--ink)' }}>
                    {member.name}
                  </div>
                  {member.role && (
                    <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-40)' }}>{member.role}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Brief preview + delivery */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Morning Brief preview */}
        <div style={{
          background: 'var(--parchment)',
          border: '0.5px solid var(--ink-15)',
          padding: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
            <span className="meta-label" style={{ color: 'var(--red)', fontSize: 8 }}>Morning Brief Preview</span>
          </div>
          <p style={{
            fontFamily: 'Newsreader, serif',
            fontSize: 14,
            fontStyle: 'italic',
            color: 'var(--ink)',
            margin: '0 0 8px',
            lineHeight: 1.6,
          }}>
            {briefPreview}
          </p>
          <p className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, margin: 0 }}>
            Dikalibrasi berdasarkan persona Anda
          </p>
        </div>

        {/* Delivery config */}
        <div style={{ background: 'var(--paper)', border: '0.5px solid var(--ink-15)', padding: '14px' }}>
          <p className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, marginBottom: 10 }}>Pengiriman Brief</p>

          {[
            { label: 'WhatsApp', desc: 'Setiap pagi 06:00 WIB', icon: '✓✓', color: 'var(--green)', enabled: true },
            { label: 'Push Notification', desc: 'Alert real-time untuk kritis', icon: '🔔', color: 'var(--gold)', enabled: true },
          ].map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i === 0 ? '0.5px solid var(--ink-06)' : 'none',
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13 }}>{d.icon}</span>
                <div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)' }}>{d.label}</div>
                  <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: 'var(--ink-40)' }}>{d.desc}</div>
                </div>
              </div>
              <div style={{
                width: 32,
                height: 18,
                borderRadius: 9,
                background: d.enabled ? 'var(--green)' : 'var(--ink-15)',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: 3,
                  left: d.enabled ? 17 : 3,
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
