import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { useMemo } from 'react';
import { useResolveClassNames } from 'uniwind';

import { cn } from '../../lib/utils';

type IconProps = LucideProps & {
  as: LucideIcon;
};

function extractStyles(style: unknown) {
  if (!style || typeof style !== 'object') {
    return {};
  }

  if (Array.isArray(style)) {
    return style.reduce(
      (acc, item) => ({ ...acc, ...(extractStyles(item) as object) }),
      {} as Record<string, unknown>,
    );
  }

  return style as Record<string, unknown>;
}

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * This component allows you to render any Lucide icon while applying utility classes
 * using Uniwind. It avoids the need to wrap or configure each icon individually.
 */
function Icon({
  as: IconComponent,
  className,
  size = 14,
  ...props
}: IconProps) {
  const resolvedStyles = useResolveClassNames(
    cn('text-foreground', className),
  );

  const flattenedStyles = useMemo(
    () => extractStyles(resolvedStyles),
    [resolvedStyles],
  ) as Record<string, unknown>;

  const colorFromStyle = flattenedStyles.color as string | undefined;
  const opacityFromStyle = flattenedStyles.opacity as number | undefined;
  const heightFromStyle = flattenedStyles.height as number | undefined;
  const widthFromStyle = flattenedStyles.width as number | undefined;
  const derivedSize = heightFromStyle ?? widthFromStyle ?? size;

  const { color: _c, opacity: _o, height: _h, width: _w, ...style } =
    flattenedStyles;
  const mergedStyle = props.style ? [style, props.style] : style;

  return (
    <IconComponent
      {...props}
      size={derivedSize}
      color={props.color ?? colorFromStyle}
      opacity={props.opacity ?? opacityFromStyle}
      style={mergedStyle}
    />
  );
}

export { Icon };
