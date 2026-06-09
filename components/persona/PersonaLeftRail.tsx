'use client';

interface Props {
  step: number;
  data: Record<string, unknown>;
}

const stepMeta = [
  { title: 'Siapa Anda?', desc: 'Tentukan identitas publik Anda — nama, jabatan, dan konteks wilayah.' },
  { title: 'Bagaimana Anda Bicara?', desc: 'Pilih register bahasa dan nada komunikasi yang paling mencerminkan Anda.' },
  { title: 'Apa yang Anda Percaya?', desc: 'Nilai inti dan batas merah yang mendefinisikan posisi Anda.' },
  { title: 'Seberapa Berani Anda?', desc: 'Konfigurasi respons berdasarkan kondisi damai dan krisis.' },
  { title: 'Siapa yang Anda Layani?', desc: 'Prioritaskan audiens dan tentukan platform yang paling relevan.' },
  { title: 'Tinjau & Aktifkan', desc: 'Periksa konfigurasi persona Anda sebelum mengaktifkan.' },
];

const riskLabels = ['Konservatif', 'Hati-hati', 'Seimbang', 'Proaktif', 'Agresif'];

function CompletionRing({ pct }: { pct: number }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      <svg width={64} height={64} viewBox="0 0 64 64">
        <circle cx={32} cy={32} r={r} fill="none" stroke="var(--ink-06)" strokeWidth={4} />
        <circle
          cx={32} cy={32} r={r}
          fill="none"
          stroke="var(--red)"
          strokeWidth={4}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Newsreader, serif',
        fontSize: 14,
        color: 'var(--ink)',
      }}>
        {pct}%
      </div>
    </div>
  );
}

export default function PersonaLeftRail({ step, data }: Props) {
  const meta = stepMeta[step];

  const completedFields = [
    !!(data.name && data.role),
    !!(data.register && data.tone),
    (data.values as string[])?.length > 0,
    data.riskLevel !== undefined,
    (data.audiences as string[])?.length > 0,
    false,
  ];
  const pct = Math.round((completedFields.filter(Boolean).length / 6) * 100);

  const previewCards = [
    {
      label: 'Nama & Peran',
      value: data.name ? `${data.name}, ${data.role || '...'}` : '—',
    },
    {
      label: 'Gaya Komunikasi',
      value: data.register ? `${data.register}${data.tone ? ` · ${data.tone}` : ''}` : '—',
    },
    {
      label: 'Toleransi Risiko',
      value: data.riskLevel !== undefined ? riskLabels[data.riskLevel as number] : '—',
    },
    {
      label: 'Audiens Utama',
      value: ((data.audiences as string[]) || []).length > 0
        ? ((data.audiences as string[]) || []).slice(0, 2).join(', ')
        : '—',
    },
  ];

  return (
    <div style={{
      width: 220,
      background: 'var(--parchment)',
      borderRight: '0.5px solid var(--ink-15)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {/* Step heading */}
      <div>
        <h2 style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 18,
          fontWeight: 400,
          letterSpacing: '-0.022em',
          color: 'var(--ink)',
          margin: '0 0 6px',
        }}>
          {meta.title}
        </h2>
        <p style={{
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 11,
          color: 'var(--ink-50)',
          margin: 0,
          lineHeight: 1.5,
        }}>
          {meta.desc}
        </p>
      </div>

      {/* Preview cards */}
      <div>
        <p className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginBottom: 8 }}>
          Preview Persona
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {previewCards.map(card => (
            <div key={card.label} style={{
              padding: '7px 8px',
              background: 'var(--paper)',
              border: '0.5px solid var(--ink-06)',
            }}>
              <div className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, marginBottom: 2 }}>{card.label}</div>
              <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: card.value === '—' ? 'var(--ink-30)' : 'var(--ink)' }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <CompletionRing pct={pct} />
        <div>
          <p className="meta-label" style={{ color: 'var(--ink-30)', fontSize: 7, margin: '0 0 3px' }}>Kelengkapan</p>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--ink)', margin: 0 }}>
            {completedFields.filter(Boolean).length} dari 6 langkah
          </p>
        </div>
      </div>
    </div>
  );
}
