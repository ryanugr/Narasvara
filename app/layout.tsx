import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import AskButton from '@/components/layout/AskButton';
import AskPanel from '@/components/layout/AskPanel';
import RiskStateSwitcher from '@/components/ui/RiskStateSwitcher';

export const metadata: Metadata = {
  title: 'NaraSvara — Narrative Intelligence',
  description: 'AI-powered narrative intelligence platform for Indonesian politicians and institutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppProvider>
          <Sidebar />
          <Topbar />
          <main style={{
            marginLeft: 'var(--sidebar-width)',
            marginTop: 'var(--topbar-height)',
            minHeight: 'calc(100vh - var(--topbar-height))',
            overflowX: 'hidden',
          }}>
            {children}
          </main>
          <RiskStateSwitcher />
          <AskButton />
          <AskPanel />
        </AppProvider>
      </body>
    </html>
  );
}
