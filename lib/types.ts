export type RiskState = 'aman' | 'pantau' | 'kritis';

export interface Issue {
  id: string;
  title: string;
  platform: string;
  mentions: number;
  sentiment: 'positif' | 'netral' | 'negatif' | 'campur';
  direction: 'up' | 'flat' | 'down';
  level: 'Kritis' | 'Pantau' | 'Mereda' | 'Aman';
  actionable: boolean;
}

export interface Narrative {
  id: string;
  tag: string;
  velocity: string;
  quote: string;
  fill: number;
  subtitle?: string;
}

export interface Sentiment {
  positif: number;
  netral: number;
  negatif: number;
}

export interface Keywords {
  nama: string;
  partai: string;
  isuUtama: string;
  oposisi: string;
}

export interface Competitor {
  name: string;
  delta: number;
  direction: 'up' | 'down' | 'flat';
}

export interface Influencer {
  name: string;
  reach: string;
  stance: 'Friendly' | 'Netral' | 'Pantau';
  color: string;
}

export interface Platform {
  name: string;
  fill: number;
  value: string;
}

export interface RiskStateData {
  statusText: string;
  statusDesc: string;
  ewScore: number;
  ewLevel: 'Aman' | 'Pantau' | 'Kritis';
  aiSummary: string;
  issues: Issue[];
  narratives: Narrative[];
  sentiment: Sentiment;
  sentimentTrend: number[];
  keywords: Keywords;
  competitors: Competitor[];
  influencers: Influencer[];
  platforms: Platform[];
  askSuggestions: string[];
  askResponse: string;
}

export interface BriefMock {
  number: number;
  date: string;
  popularity: string;
  popularityNote: string;
  topics: Array<{
    name: string;
    sentiment: string;
    sentimentPct: number;
    mentions: number;
    direction: 'up' | 'flat' | 'down';
  }>;
  actions: string[];
  regionAlert: string;
  quote: string;
  sparklinePoints: number[];
  sentimentBar: { positif: number; netral: number; negatif: number };
}

export interface PersonaMock {
  name: string;
  role: string;
  segment: string;
  region: string;
  communicationStyle: string;
  tone: string;
  riskTolerance: number;
  audiences: string[];
  team: Array<{ name: string; role: string; initials: string }>;
  values: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface StudioIssue {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  platform: string;
  velocity: string;
  detected: string;
  ewScore: number;
  ewLevel: string;
  responseIdeal: string;
  scenarios: Scenario[];
  circulating: Array<{ text: string; direction: 'up' | 'flat' | 'down' }>;
  context: {
    origin: string;
    volume: string;
    dominantSentiment: string;
    tokoh: string;
    precedent: string;
  };
}

export interface Scenario {
  id: string;
  number: string;
  name: string;
  desc: string;
  draft: string;
  talkingPoints: string[];
  impact: {
    sentimen: string;
    waktu: string;
    backfire: string;
    platform: string;
  };
}
