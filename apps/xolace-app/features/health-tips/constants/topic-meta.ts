export type HealthTipTopicMeta = {
  label: string;
  badgeClassName: string;
  accentColor: string;
  backgroundTint: string;
};

const TOPIC_META: Record<string, HealthTipTopicMeta> = {
  awareness: {
    label: 'Awareness',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300 border-none',
    accentColor: '#10b981',
    backgroundTint: 'rgba(16, 185, 129, 0.12)',
  },
  anxiety: {
    label: 'Anxiety',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300 border-none',
    accentColor: '#10b981',
    backgroundTint: 'rgba(16, 185, 129, 0.12)',
  },
  stress: {
    label: 'Stress Management',
    badgeClassName: 'bg-green-500/15 text-green-300 border-none',
    accentColor: '#22c55e',
    backgroundTint: 'rgba(34, 197, 94, 0.12)',
  },
  mindfulness: {
    label: 'Mindfulness',
    badgeClassName: 'bg-blue-500/10 text-blue-300 border-none',
    accentColor: '#38bdf8',
    backgroundTint: 'rgba(56, 189, 248, 0.12)',
  },
  sleep: {
    label: 'Sleep Better',
    badgeClassName: 'bg-blue-500/10 text-blue-300 border-none',
    accentColor: '#60a5fa',
    backgroundTint: 'rgba(96, 165, 250, 0.12)',
  },
  general: {
    label: 'General',
    badgeClassName: 'bg-purple-500/10 text-purple-200 border-none',
    accentColor: '#a855f7',
    backgroundTint: 'rgba(168, 85, 247, 0.12)',
  },
};

export function getHealthTipTopicMeta(topic: string): HealthTipTopicMeta {
  if (topic && TOPIC_META[topic]) {
    return TOPIC_META[topic];
  }

  return {
    label: topic || 'Wellness',
    badgeClassName: 'bg-foreground/10 text-foreground border-none',
    accentColor: '#7C9CFF',
    backgroundTint: 'rgba(124, 156, 255, 0.12)',
  };
}
