import { Drawer } from 'expo-router/drawer';

import { DrawerContent } from '../../../../components/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerType: 'front',
        drawerStyle: { width: 320 },
      }}
    />
  );
}
