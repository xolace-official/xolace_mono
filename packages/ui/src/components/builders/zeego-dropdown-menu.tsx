// design-system/dropdown-menu.tsx
import { ComponentProps } from 'react';

import { View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

export const ZeegoDropdownMenuRoot = DropdownMenu.Root;
export const ZeegoDropdownMenuTrigger = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Trigger>) => (
    <DropdownMenu.Trigger {...props} asChild>
      <View aria-role="button">{props.children}</View>
    </DropdownMenu.Trigger>
  ),
  'Trigger',
);
export const ZeegoDropdownMenuContent = DropdownMenu.Content;

export const ZeegoDropdownMenuItem = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Item>) => (
    <DropdownMenu.Item {...props} style={{ height: 34 }} />
  ),
  'Item',
);

export const ZeegoDropdownMenuItemTitle = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemTitle>) => (
    <DropdownMenu.ItemTitle {...props} />
  ),
  'ItemTitle',
);

export const ZeegoDropdownMenuItemIcon = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemIcon>) => (
    <DropdownMenu.ItemIcon {...props} />
  ),
  'ItemIcon',
);

export const ZeegoDropdownMenuItemImage = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemImage>) => (
    <DropdownMenu.ItemImage {...props} />
  ),
  'ItemImage',
);

export const ZeegoDropdownMenuLabel = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Label>) => (
    <DropdownMenu.Label {...props} />
  ),
  'Label',
);

export const ZeegoDropdownMenuSeparator = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Separator>) => (
    <DropdownMenu.Separator {...props} />
  ),
  'Separator',
);

export const ZeegoDropdownMenuGroup = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Group>) => (
    <DropdownMenu.Group {...props} />
  ),
  'Group',
);

export const ZeegoDropdownMenuCheckboxItem = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.CheckboxItem>) => (
    <DropdownMenu.CheckboxItem
      {...props}
      style={{ ...props.style, display: 'flex', alignItems: 'center', gap: 8 }}
    >
      <DropdownMenu.ItemIndicator />
    </DropdownMenu.CheckboxItem>
  ),
  'CheckboxItem',
);

export const ZeegoDropdownMenuSubTrigger = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.SubTrigger>) => (
    <DropdownMenu.SubTrigger {...props} />
  ),
  'SubTrigger',
);

export const ZeegoDropdownMenuSubContent = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.SubContent>) => (
    <DropdownMenu.SubContent {...props} />
  ),
  'SubContent',
);

export const ZeegoDropdownMenuSub = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Sub>) => (
    <DropdownMenu.Sub {...props} />
  ),
  'Sub',
);

export const ZeegoDropdownMenuItemIndicator = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.ItemIndicator>) => (
    <DropdownMenu.ItemIndicator {...props} />
  ),
  'ItemIndicator',
);

// export const DropdownMenuPreview = DropdownMenu.create(
//   (props: ComponentProps<typeof DropdownMenu.Preview>) => (
//     <DropdownMenu.Preview {...props} />
//   ),
//   'Preview'
// )

export const ZeegoDropdownMenuArrow = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Arrow>) => (
    <DropdownMenu.Arrow {...props} />
  ),
  'Arrow',
);
