import type { CSSProperties } from 'react';

type DigitalPreset =
  | 'finance-impact'
  | 'downtime-impact'
  | 'legal-impact'
  | 'reputation-impact'
  | 'revenue-cover'
  | 'incident-experts'
  | 'legal-defense'
  | 'crisis-comms'
  | 'third-party'
  | 'startup-stack'
  | 'sme-ops'
  | 'enterprise-grid'
  | 'specialist-focus'
  | 'support-247'
  | 'expert-network'
  | 'rapid-response'
  | 'continuity-core';

type VisualVariant =
  | 'pulse'
  | 'flow'
  | 'bars'
  | 'nodes'
  | 'shield'
  | 'matrix'
  | 'radar';

type ToneName = 'cyan' | 'blue' | 'indigo' | 'sky';

type PresetConfig = {
  variant: VisualVariant;
  tone: ToneName;
  panelClassName?: string;
  itemCount?: number;
};

const tones: Record<ToneName, { accent: string; secondary: string }> = {
  cyan: { accent: '34, 211, 238', secondary: '59, 130, 246' },
  blue: { accent: '96, 165, 250', secondary: '37, 99, 235' },
  indigo: { accent: '129, 140, 248', secondary: '99, 102, 241' },
  sky: { accent: '125, 211, 252', secondary: '59, 130, 246' },
};

const presets: Record<DigitalPreset, PresetConfig> = {
  'finance-impact': { variant: 'bars', tone: 'blue', itemCount: 7, panelClassName: 'digital-panel-tall' },
  'downtime-impact': { variant: 'flow', tone: 'cyan', panelClassName: 'digital-panel-wide' },
  'legal-impact': { variant: 'shield', tone: 'indigo' },
  'reputation-impact': { variant: 'radar', tone: 'sky', panelClassName: 'digital-panel-wide' },
  'revenue-cover': { variant: 'matrix', tone: 'blue', itemCount: 12 },
  'incident-experts': { variant: 'pulse', tone: 'cyan' },
  'legal-defense': { variant: 'matrix', tone: 'indigo', itemCount: 16 },
  'crisis-comms': { variant: 'flow', tone: 'sky', panelClassName: 'digital-panel-wide' },
  'third-party': { variant: 'nodes', tone: 'blue' },
  'startup-stack': { variant: 'matrix', tone: 'cyan', itemCount: 10 },
  'sme-ops': { variant: 'bars', tone: 'sky', itemCount: 5 },
  'enterprise-grid': { variant: 'radar', tone: 'indigo', panelClassName: 'digital-panel-wide' },
  'specialist-focus': { variant: 'shield', tone: 'cyan' },
  'support-247': { variant: 'pulse', tone: 'sky' },
  'expert-network': { variant: 'nodes', tone: 'indigo' },
  'rapid-response': { variant: 'flow', tone: 'blue' },
  'continuity-core': { variant: 'bars', tone: 'cyan', itemCount: 6 },
};

type DigitalSignalVisualProps = {
  preset: DigitalPreset;
};

function getToneStyle(tone: ToneName): CSSProperties {
  const palette = tones[tone];

  return {
    '--digital-accent': palette.accent,
    '--digital-secondary': palette.secondary,
  } as CSSProperties;
}

export default function DigitalSignalVisual({ preset }: DigitalSignalVisualProps) {
  const config = presets[preset];
  const panelClassName = ['digital-panel', config.panelClassName].filter(Boolean).join(' ');

  if (config.variant === 'pulse') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={panelClassName}>
          <div className="digital-ring digital-ring-delay-1" />
          <div className="digital-ring digital-ring-delay-2" />
          <div className="digital-core" />
          <div className="digital-orbit digital-orbit-top" />
          <div className="digital-orbit digital-orbit-right" />
          <div className="digital-orbit digital-orbit-bottom" />
        </div>
      </div>
    );
  }

  if (config.variant === 'flow') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={panelClassName}>
          <div className="digital-trace digital-trace-top" />
          <div className="digital-trace digital-trace-middle" />
          <div className="digital-trace digital-trace-bottom" />
          <div className="digital-scan digital-scan-delay-1" />
          <div className="digital-scan digital-scan-delay-2" />
        </div>
      </div>
    );
  }

  if (config.variant === 'bars') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={`${panelClassName} digital-bars`}>
          {Array.from({ length: config.itemCount || 6 }).map((_, index) => (
            <span
              key={index}
              className="digital-bar"
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (config.variant === 'nodes') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={`${panelClassName} digital-network`}>
          <div className="digital-network-line digital-network-line-a" />
          <div className="digital-network-line digital-network-line-b" />
          <div className="digital-network-line digital-network-line-c" />
          <div className="digital-node digital-node-a" />
          <div className="digital-node digital-node-b" />
          <div className="digital-node digital-node-c" />
          <div className="digital-node digital-node-d" />
        </div>
      </div>
    );
  }

  if (config.variant === 'shield') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={`${panelClassName} digital-shield-panel`}>
          <div className="digital-shield-shape" />
          <div className="digital-shield-line digital-shield-line-a" />
          <div className="digital-shield-line digital-shield-line-b" />
          <div className="digital-shield-chip" />
        </div>
      </div>
    );
  }

  if (config.variant === 'matrix') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={`${panelClassName} digital-matrix`}>
          {Array.from({ length: config.itemCount || 12 }).map((_, index) => (
            <span
              key={index}
              className="digital-cell"
              style={{ animationDelay: `${index * 0.08}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (config.variant === 'radar') {
    return (
      <div className="digital-visual" style={getToneStyle(config.tone)}>
        <div className={`${panelClassName} digital-radar`}>
          <div className="digital-radar-ring digital-radar-ring-a" />
          <div className="digital-radar-ring digital-radar-ring-b" />
          <div className="digital-radar-ring digital-radar-ring-c" />
          <div className="digital-radar-beam" />
          <div className="digital-radar-dot digital-radar-dot-a" />
          <div className="digital-radar-dot digital-radar-dot-b" />
          <div className="digital-radar-dot digital-radar-dot-c" />
        </div>
      </div>
    );
  }

  return (
    <div className="digital-visual" style={getToneStyle(config.tone)}>
      <div className={`${panelClassName} digital-radar`}>
        <div className="digital-radar-ring digital-radar-ring-a" />
        <div className="digital-radar-ring digital-radar-ring-b" />
        <div className="digital-radar-ring digital-radar-ring-c" />
        <div className="digital-radar-beam" />
        <div className="digital-radar-dot digital-radar-dot-a" />
        <div className="digital-radar-dot digital-radar-dot-b" />
        <div className="digital-radar-dot digital-radar-dot-c" />
      </div>
    </div>
  );
}
