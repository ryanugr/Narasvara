'use client';

import { useState } from 'react';
import { IconGripVertical } from '@tabler/icons-react';

interface Props {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const defaultAudiences = [
  'Pemilih grassroots Jawa-Bali',
  'Kelas menengah urban',
  'Komunitas digital milenial',
  'Pebisnis dan investor',
  'Pemimpin daerah',
];

const platforms = ['Twitter/X', 'TikTok', 'Instagram', 'Facebook', 'YouTube', 'WhatsApp', 'Telegram', 'News Online'];

export default function Step5Audience({ data, onChange }: Props) {
  const audiences = (data.audiences as string[]) || defaultAudiences;
  const selectedPlatforms = (data.platforms as string[]) || [];
  const [dragging, setDragging] = useState<number | null>(null);

  const togglePlatform = (p: string) => {
    const curr = selectedPlatforms;
    onChange('platforms', curr.includes(p) ? curr.filter(x => x !== p) : [...curr, p]);
  };

  const moveAudience = (from: number, to: number) => {
    const arr = [...audiences];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange('audiences', arr);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Priority audience list */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Audiens Prioritas (seret untuk ubah urutan)
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {audiences.map((a, i) => (
            <div
              key={a}
              draggable
              onDragStart={() => setDragging(i)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                if (dragging !== null && dragging !== i) {
                  moveAudience(dragging, i);
                  setDragging(null);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                background: 'var(--paper)',
                border: '0.5px solid var(--ink-15)',
                borderRadius: '2px',
                cursor: 'grab',
                opacity: dragging === i ? 0.5 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: 12,
                  color: 'var(--ink-30)',
                  minWidth: 14,
                }}>
                  {i + 1}
                </span>
                <IconGripVertical size={12} stroke={1.5} color="rgba(13,13,13,0.25)" />
              </div>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--ink)' }}>
                {a}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform chips */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 8 }}>
          Platform Aktif
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                border: selectedPlatforms.includes(p) ? '0.5px solid var(--ink)' : '0.5px solid var(--ink-15)',
                background: selectedPlatforms.includes(p) ? 'var(--ink-06)' : 'transparent',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: selectedPlatforms.includes(p) ? 'var(--ink)' : 'var(--ink-50)',
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Competitor */}
      <div>
        <label className="meta-label" style={{ color: 'var(--ink-50)', fontSize: 8, display: 'block', marginBottom: 5 }}>
          Figur yang Dipantau
        </label>
        <textarea
          value={(data.competitors as string) || ''}
          onChange={e => onChange('competitors', e.target.value)}
          placeholder="Masukkan nama tokoh atau akun yang ingin dipantau, satu per baris..."
          rows={3}
          style={{
            width: '100%',
            padding: '8px 10px',
            background: 'var(--paper)',
            border: '0.5px solid var(--ink-15)',
            borderRadius: '2px',
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            color: 'var(--ink)',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  );
}
