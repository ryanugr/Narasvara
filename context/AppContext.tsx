'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { RiskState, Message, PersonaMock } from '@/lib/types';
import { personaMock } from '@/lib/mockData';

interface AppContextValue {
  riskState: RiskState;
  setRiskState: (state: RiskState) => void;
  askOpen: boolean;
  setAskOpen: (open: boolean) => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  persona: PersonaMock;
  chatHistory: Message[];
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (role: 'user' | 'ai', text: string) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [riskState, setRiskState] = useState<RiskState>('aman');
  const [askOpen, setAskOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('overview');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const addMessage = useCallback((role: 'user' | 'ai', text: string) => {
    setChatHistory(prev => [
      ...prev,
      { id: Date.now().toString(), role, text, timestamp: new Date() },
    ]);
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        riskState,
        setRiskState,
        askOpen,
        setAskOpen,
        currentScreen,
        setCurrentScreen,
        persona: personaMock,
        chatHistory,
        setChatHistory,
        addMessage,
        clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
