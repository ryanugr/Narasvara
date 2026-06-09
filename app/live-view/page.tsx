'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import AiSummaryStrip from '@/components/layout/AiSummaryStrip';
import StatusStrip from '@/components/layout/StatusStrip';
import HalfChakraRule from '@/components/brand/HalfChakraRule';
import EarlyWarningCard from '@/components/dashboard/EarlyWarningCard';
import PlatformBreakdownCard from '@/components/dashboard/PlatformBreakdownCard';
import KeywordTrackerCard from '@/components/dashboard/KeywordTrackerCard';
import IssuesList from '@/components/dashboard/IssuesList';
import NarrativeRadar from '@/components/dashboard/NarrativeRadar';
import SentimentCard from '@/components/dashboard/SentimentCard';
import InfluenceMap from '@/components/dashboard/InfluenceMap';
import CompetitorMonitor from '@/components/dashboard/CompetitorMonitor';
import PerformanceView from './PerformanceView';

const subTabs = ['Live View', 'Performance'];

export default function LiveViewPage() {
  const { setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState('Live View');

  useEffect(() => {
    setCurrentScreen('live-view');
  }, [setCurrentScreen]);

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100%' }}>
      <AiSummaryStrip />

      {/* Sub-tabs */}
      <div style={{
        padding: '0 20px',
        background: 'var(--paper)',
        borderBottom: '0.5px solid var(--ink-15)',
        display: 'flex',
        gap: 0,
      }}>
        {subTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 14px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '1.5px solid var(--ink)' : '1.5px solid transparent',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 12,
              fontWeight: activeTab === tab ? 500 : 400,
              color: activeTab === tab ? 'var(--ink)' : 'var(--ink-40)',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <StatusStrip />

      <div style={{ padding: '8px 0 4px' }}>
        <HalfChakraRule />
      </div>

      {activeTab === 'Performance' ? (
        <PerformanceView />
      ) : (
        /* Three-column dashboard */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '172px 1fr 160px',
          gap: 8,
          padding: '8px 12px',
          alignItems: 'start',
        }}>
          {/* LEFT COL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <EarlyWarningCard />
            <PlatformBreakdownCard />
            <KeywordTrackerCard />
          </div>

          {/* CENTER COL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <IssuesList />
            <NarrativeRadar />
          </div>

          {/* RIGHT COL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SentimentCard />
            <InfluenceMap />
            <CompetitorMonitor />
          </div>
        </div>
      )}
    </div>
  );
}
