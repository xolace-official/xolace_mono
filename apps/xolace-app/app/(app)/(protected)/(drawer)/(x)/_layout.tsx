import { TabsProvider } from "../../../../../lib/providers/tabs-provider";
import { Slot } from "expo-router";

// x-bottom-tabs-background-animation 🔽

export default function XLayout() {
  return (
    <TabsProvider>
      <Slot />
    </TabsProvider>
  );
}

// x-bottom-tabs-background-animation 🔼
