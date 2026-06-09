'use client';

import { useState, useRef, useEffect } from 'react';
import { IconX, IconSend, IconMessageCircle, IconPlus, IconCircleDot } from '@tabler/icons-react';
import ChakraMark from '@/components/brand/ChakraMark';
import { useApp } from '@/context/AppContext';
import { riskStates } from '@/lib/mockData';

const screenSuggestions: Record<string, Record<string, string[]>> = {
  overview: {
    aman: [
      'Apa yang mendorong kenaikan popularitas hari ini?',
      'Narasi mana yang perlu diperkuat minggu ini?',
      'Tunjukkan ringkasan 3 aksi prioritas hari ini.',
      'Bagaimana perbandingan sentimen vs. kompetitor?',
    ],
    pantau: [
      'Isu mana yang harus paling diperhatikan dari brief hari ini?',
      'Seberapa serius ancaman terhadap popularitas minggu ini?',
      'Rekomendasikan konten positif untuk membalik tren.',
      'Kapan siklus isu ini biasanya mereda?',
    ],
    kritis: [
      'Respons apa yang paling mendesak dari brief hari ini?',
      'Bagaimana brief hari ini dibandingkan dengan krisis sebelumnya?',
      'Siapkan talking points untuk tim komunikasi sekarang.',
      'Wilayah mana yang paling kritis hari ini?',
    ],
  },
  'live-view': {
    aman: [
      'Apa yang mendorong kenaikan sentimen hari ini?',
      'Narasi mana yang paling cepat menyebar?',
      'Platform mana yang paling aktif bicara soal saya?',
      'Rekomendasikan aksi komunikasi untuk mempertahankan tren positif ini.',
    ],
    pantau: [
      'Siapa yang pertama kali menyebarkan narasi ini?',
      'Berapa lama biasanya isu serupa berlangsung sebelum mereda?',
      'Scenario respons mana yang paling aman untuk isu ini?',
      'Apa risiko jika kita memilih diam strategis hari ini?',
    ],
    kritis: [
      'Respons apa yang harus saya buat dalam 90 menit ke depan?',
      'Siapa tokoh netral yang bisa saya ajak bicara untuk meredakan ini?',
      'Bagaimana risiko jika saya merespons vs. memilih diam?',
      'Apa yang harus disampaikan Comms Director ke media nasional sekarang?',
    ],
  },
  'response-studio': {
    aman: [
      'Scenario mana yang paling tepat untuk tone saat ini?',
      'Bagaimana cara memperkuat draft ini?',
      'Apakah ada risiko backfire dari bahasa ini?',
      'Sesuaikan draft dengan audiens Jawa Tengah.',
    ],
    pantau: [
      'Apakah draft ini cukup kuat untuk memotong narasi negatif?',
      'Talking point mana yang paling persuasif untuk audiens digital?',
      'Bagaimana cara menyampaikan ini tanpa terkesan defensif?',
      'Rekomendasikan perubahan tone untuk scenario ini.',
    ],
    kritis: [
      'Ini darurat — apakah draft ini sudah cukup kuat?',
      'Siapa yang harus menyampaikan pernyataan ini — saya atau juru bicara?',
      'Perbaiki kalimat pembuka agar tidak terkesan reaktif.',
      'Simulasikan kemungkinan serangan balik dari oposisi.',
    ],
  },
  persona: {
    aman: [
      'Bantu saya mendeskripsikan gaya komunikasi saya.',
      'Nilai apa yang paling penting untuk persona digital saya?',
      'Bagaimana persona ini mempengaruhi Morning Brief saya?',
      'Rekomendasikan toleransi risiko untuk profil saya.',
    ],
    pantau: ['Bagaimana persona saya mempengaruhi respons terhadap isu ini?', 'Apakah gaya komunikasi saya cocok untuk situasi pantau?', 'Sesuaikan persona untuk audiens yang lebih beragam.', 'Apa yang perlu diubah dari persona saat ada tekanan?'],
    kritis: ['Apakah persona saya siap untuk situasi krisis?', 'Bagaimana menyesuaikan gaya bicara untuk konteks kritis?', 'Siapa yang harus bicara saat persona utama di bawah tekanan?', 'Review toleransi risiko saya untuk kondisi darurat.'],
  },
};

const screenResponses: Record<string, string> = {
  overview: 'Berdasarkan Morning Brief hari ini, prioritas utama adalah mempertahankan momentum positif dari kunjungan lapangan. Tiga aksi yang saya rekomendasikan: (1) Publikasikan konten behind-the-scenes kunjungan dalam 2 jam, (2) Minta tim untuk boosting konten subsidi BBM di TikTok, (3) Briefing Comms Director tentang framing isu reshuffle jika ditanya media.',
  'live-view': 'Data real-time menunjukkan narasi "pemimpin yang turun ke rakyat" sedang organik dan kuat. Saran: jangan intervensi buatan — biarkan narasi berkembang alami. Pantau keyword oposisi, saat ini masih di angka aman. Platform TikTok paling aktif, pastikan tim konten siap merespons komentar dalam 1 jam ke depan.',
  'response-studio': 'Draft yang dipilih sudah sesuai dengan persona Anda — Formal Hangat dengan tone Empatik. Satu saran perbaikan: kalimat pembuka terlalu panjang. Sederhanakan menjadi satu klaim kuat di awal, baru dukung dengan fakta. Talking point ketiga adalah yang paling persuasif — pertimbangkan untuk memulai dengan itu.',
  persona: 'Persona Anda saat ini dikonfigurasi sebagai Formal Hangat dengan toleransi risiko Konservatif. Ini cocok untuk profil tokoh nasional dengan base konstituen yang luas. Satu area yang perlu diperhatikan: audiens digital milenial mungkin membutuhkan tone yang lebih Populer di platform TikTok — pertimbangkan membuat sub-persona untuk konteks platform tersebut.',
};

export default function AskPanel() {
  const { askOpen, setAskOpen, currentScreen, riskState, persona, chatHistory, addMessage, clearChat } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = screenSuggestions[currentScreen]?.[riskState] || screenSuggestions['live-view']['aman'];
  const data = riskStates[riskState];

  useEffect(() => {
    if (askOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [askOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addMessage('user', text);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = currentScreen === 'live-view'
        ? data.askResponse
        : (screenResponses[currentScreen] || data.askResponse);
      addMessage('ai', response);
    }, 900);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Dimmer */}
      <div
        onClick={() => setAskOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(13,13,13,0.18)',
          opacity: askOpen ? 1 : 0,
          pointerEvents: askOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s cubic-bezier(.4,0,.2,1)',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 340, zIndex: 100,
          background: '#161616',
          transform: askOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
          display: 'flex', flexDirection: 'column',
          borderLeft: '0.5px solid rgba(244,239,226,0.08)',
        }}
      >
        {/* Top bar */}
        <div style={{
          padding: '10px 14px',
          borderBottom: '0.5px solid rgba(244,239,226,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChakraMark size={16} color="rgba(244,239,226,0.25)" />
            <span className="meta-label" style={{ color: 'rgba(244,239,226,0.35)', fontSize: 8 }}>
              narasvara · ask
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => { clearChat(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(244,239,226,0.35)', padding: 4, display: 'flex' }}
              title="New chat"
            >
              <IconPlus size={14} stroke={1.5} />
            </button>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(244,239,226,0.35)', padding: 4, display: 'flex' }}
              title="History"
            >
              <IconMessageCircle size={14} stroke={1.5} />
            </button>
            <button
              onClick={() => setAskOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(244,239,226,0.45)', padding: 4, display: 'flex' }}
            >
              <IconX size={14} stroke={1.5} />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 0' }}>
          {chatHistory.length === 0 ? (
            <>
              {/* Greeting */}
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: 20,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(244,239,226,0.85)',
                  margin: '0 0 2px 0',
                  letterSpacing: '-0.022em',
                }}>
                  Selamat pagi,
                </p>
                <p style={{
                  fontFamily: 'Newsreader, serif',
                  fontSize: 20,
                  fontWeight: 400,
                  color: 'rgba(244,239,226,0.95)',
                  margin: '0 0 10px 0',
                  letterSpacing: '-0.022em',
                }}>
                  {persona.name.split(' ')[0]} {persona.name.split(' ')[1]}.
                </p>
                <p style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 12,
                  color: 'rgba(244,239,226,0.45)',
                  margin: 0,
                }}>
                  Ada yang ingin Anda ketahui tentang data hari ini?
                </p>
              </div>

              {/* Context pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 8px',
                background: 'var(--red-tint)',
                border: '0.5px solid rgba(203,16,46,0.2)',
                borderRadius: '2px',
                marginBottom: 20,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)' }} />
                <span className="meta-label" style={{ color: 'rgba(244,239,226,0.65)', fontSize: 8 }}>
                  {currentScreen === 'live-view' ? 'Live View' :
                    currentScreen === 'response-studio' ? 'Response Studio' :
                    currentScreen === 'persona' ? 'Persona Setup' : 'Morning Brief'} · {riskState === 'aman' ? 'Aman' : riskState === 'pantau' ? 'Pantau' : 'Kritis'}
                </span>
              </div>

              {/* Suggestions */}
              <div>
                <p className="meta-label" style={{ color: 'rgba(244,239,226,0.25)', fontSize: 8, marginBottom: 8 }}>
                  Pertanyaan yang relevan saat ini
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      style={{
                        background: 'rgba(244,239,226,0.04)',
                        border: '0.5px solid rgba(244,239,226,0.08)',
                        borderRadius: '2px',
                        padding: '8px 10px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(244,239,226,0.07)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(244,239,226,0.04)')}
                    >
                      <IconCircleDot size={12} stroke={1.5} color="rgba(203,16,46,0.6)" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: 11,
                        color: 'rgba(244,239,226,0.65)',
                        lineHeight: 1.4,
                      }}>
                        {s}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatHistory.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: 8,
                    alignItems: 'flex-start',
                  }}
                >
                  {msg.role === 'ai' && (
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <ChakraMark size={14} color="rgba(244,239,226,0.4)" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '85%',
                    padding: '8px 10px',
                    borderRadius: '2px',
                    background: msg.role === 'user' ? 'var(--red-tint)' : 'rgba(244,239,226,0.06)',
                    border: msg.role === 'user' ? '0.5px solid rgba(203,16,46,0.2)' : '0.5px solid rgba(244,239,226,0.08)',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 12,
                    color: msg.role === 'user' ? 'rgba(244,239,226,0.85)' : 'rgba(244,239,226,0.75)',
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <ChakraMark size={14} color="rgba(244,239,226,0.4)" />
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: '2px',
                    background: 'rgba(244,239,226,0.06)',
                    border: '0.5px solid rgba(244,239,226,0.08)',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontStyle: 'italic',
                    fontSize: 11,
                    color: 'rgba(244,239,226,0.35)',
                  }}>
                    Menganalisis data konteks...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{
          padding: '12px 14px 10px',
          borderTop: '0.5px solid rgba(244,239,226,0.08)',
        }}>
          <div style={{
            display: 'flex',
            gap: 6,
            background: 'rgba(244,239,226,0.05)',
            border: '0.5px solid rgba(244,239,226,0.12)',
            borderRadius: '2px',
            padding: '6px 6px 6px 10px',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Tanyakan sesuatu…"
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 12,
                color: 'rgba(244,239,226,0.8)',
                placeholder: 'rgba(244,239,226,0.25)',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              style={{
                width: 28,
                height: 28,
                borderRadius: '2px',
                background: input.trim() ? 'var(--red)' : 'rgba(203,16,46,0.25)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <IconSend size={13} stroke={1.5} color="#fff" />
            </button>
          </div>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 9,
            color: 'rgba(244,239,226,0.2)',
            margin: '6px 0 0 0',
            textAlign: 'center',
          }}>
            NaraSvara Intelligence · Powered by Claude
          </p>
        </div>
      </div>
    </>
  );
}
