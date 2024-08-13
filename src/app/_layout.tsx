import { Slot } from "expo-router";
import { Stack } from "expo-router/stack";
import { StatusBar, StyleSheet, View } from "react-native";

import {
  useFonts,
  Ubuntu_700Bold,
  Ubuntu_500Medium,
  Ubuntu_400Regular,
} from "@expo-google-fonts/ubuntu";

import { Loading } from "@/components/loading";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_500Medium,
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
