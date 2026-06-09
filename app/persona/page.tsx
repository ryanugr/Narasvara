'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import PersonaLeftRail from '@/components/persona/PersonaLeftRail';
import Step1Identity from '@/components/persona/steps/Step1Identity';
import Step2Style from '@/components/persona/steps/Step2Style';
import Step3Values from '@/components/persona/steps/Step3Values';
import Step4Risk from '@/components/persona/steps/Step4Risk';
import Step5Audience from '@/components/persona/steps/Step5Audience';
import Step6Review from '@/components/persona/steps/Step6Review';

const stepLabels = ['Identitas', 'Gaya Bicara', 'Nilai', 'Toleransi Risiko', 'Audiens', 'Tim & Review'];

export default function PersonaPage() {
  const { setCurrentScreen, persona } = useApp();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({
    name: persona.name,
    role: persona.role,
    segment: persona.segment,
    regions: [persona.region],
    issues: ['Ekonomi', 'Infrastruktur', 'Pendidikan'],
    register: persona.communicationStyle,
    tone: persona.tone,
    values: persona.values,
    riskLevel: persona.riskTolerance,
    audiences: persona.audiences,
    riskPeace: 25,
    riskCrisis: 50,
  });

  useEffect(() => {
    setCurrentScreen('persona');
  }, [setCurrentScreen]);

  const onChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const steps = [
    <Step1Identity key={0} data={formData} onChange={onChange} />,
    <Step2Style key={1} data={formData} onChange={onChange} />,
    <Step3Values key={2} data={formData} onChange={onChange} />,
    <Step4Risk key={3} data={formData} onChange={onChange} />,
    <Step5Audience key={4} data={formData} onChange={onChange} />,
    <Step6Review key={5} data={formData} onEditStep={setStep} />,
  ];

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{
        padding: '12px 20px',
        background: 'var(--paper)',
        borderBottom: '0.5px solid var(--ink-15)',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        overflowX: 'auto',
      }}>
        {stepLabels.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {/* Step dot + label */}
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: 3 }}
              onClick={() => i < step && setStep(i)}
            >
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: i < step ? 'var(--ink)' : i === step ? 'var(--red)' : 'var(--ink-06)',
                border: i === step ? '2px solid var(--red)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                fontSize: 8,
                color: i <= step ? '#fff' : 'var(--ink-30)',
                transition: 'all 0.2s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 9,
                color: i === step ? 'var(--ink)' : 'var(--ink-30)',
                fontWeight: i === step ? 500 : 400,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {/* Connector line */}
            {i < stepLabels.length - 1 && (
              <div style={{
                width: 32,
                height: 1.5,
                background: i < step ? 'var(--ink)' : 'var(--ink-15)',
                margin: '0 4px',
                marginBottom: 15,
                transition: 'background 0.2s',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <PersonaLeftRail step={step} data={formData} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
            {steps[step]}
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 24px',
            borderTop: '0.5px solid var(--ink-15)',
            background: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            {step > 0 && (
              <button
                onClick={handleBack}
                style={{
                  padding: '8px 16px',
                  background: 'none',
                  border: '0.5px solid var(--ink-15)',
                  borderRadius: '2px',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 12,
                  color: 'var(--ink-50)',
                  cursor: 'pointer',
                }}
              >
                ← Kembali
              </button>
            )}

            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.1em',
              color: 'var(--ink-30)',
            }}>
              Langkah {step + 1} dari 6
            </span>

            <div style={{ flex: 1 }} />

            <button
              onClick={() => {}}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11,
                color: 'var(--ink-40)',
              }}
            >
              Lewati langkah ini →
            </button>

            {step < 5 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: '8px 20px',
                  background: 'var(--ink)',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--parchment)',
                  cursor: 'pointer',
                }}
              >
                Lanjut →
              </button>
            ) : (
              <button
                style={{
                  padding: '8px 20px',
                  background: 'var(--red)',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Aktivasi Persona
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
