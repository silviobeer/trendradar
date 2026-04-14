import { type Zeitrahmen } from '@trendradar/shared';

interface ZeitbereichBadgeProps {
  zeitrahmen: Zeitrahmen;
}

const config: Record<Zeitrahmen, { label: string; classes: string }> = {
  handeln: {
    label: 'Handeln',
    classes: 'bg-primary text-white',
  },
  vorbereiten: {
    label: 'Vorbereiten',
    classes: 'bg-primary-80 text-white',
  },
  beobachten: {
    label: 'Beobachten',
    classes: 'bg-primary-20 text-primary',
  },
};

export function ZeitbereichBadge({ zeitrahmen }: ZeitbereichBadgeProps) {
  const { label, classes } = config[zeitrahmen];
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-tag font-normal ${classes}`}>
      {label}
    </span>
  );
}
