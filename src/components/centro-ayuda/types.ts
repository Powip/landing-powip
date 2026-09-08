export type PillTone = 'ok' | 'warn' | 'info' | 'muted';
export type NewsTone = 'beta' | 'pronto' | 'info';
export type StartIcon = 'user' | 'truck' | 'gear';

export interface ModuleStep {
  t: string;
  d: string;
  img?: string;
  cap?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HelpModule {
  id: string;
  ch: string;
  title: string;
  one: string;
  para?: string;
  steps: ModuleStep[];
  tips?: string[];
  faq?: FaqItem[];
}

export interface Chapter {
  id: string;
  n: string;
  name: string;
  desc: string;
  mods: string[];
}

export interface StartPath {
  role: string;
  icon: StartIcon;
  desc: string;
  steps: [moduleId: string, label: string][];
}

export type FlowStage = [title: string, desc: string, moduleId: string, chapterId: string];

export interface StateGroup {
  grupo: string;
  rows: [estado: string, significado: string, accion: string, tone: PillTone][];
}

export type GlossaryEntry = [term: string, definition: string];

export type NewsEntry = [tone: NewsTone, title: string, desc: string];

export interface HelpData {
  chapters: Chapter[];
  modules: Record<string, HelpModule>;
  role: Record<string, string>;
  cal: string;
  wa: string;
  start: StartPath[];
  flow: FlowStage[];
  states: StateGroup[];
  glossary: GlossaryEntry[];
  news: NewsEntry[];
}
