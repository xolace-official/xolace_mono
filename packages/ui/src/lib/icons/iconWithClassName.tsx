import type { LucideIcon } from 'lucide-react-native';
import { withUniwind } from 'uniwind';

export function iconWithClassName(icon: LucideIcon) {
  return withUniwind(icon, {
    color: {
      fromClassName: 'className',
      styleProperty: 'color',
    },
    opacity: {
      fromClassName: 'className',
      styleProperty: 'opacity',
    },
  }) as unknown as LucideIcon;
}
