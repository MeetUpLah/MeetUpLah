import { Stack } from "expo-router";
import Index from "@/app/index";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"/>
    </Stack>
  );
}
