import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkProvider } from "@clerk/clerk-expo";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constants/Colors";
import "react-native-reanimated";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <ClerkProvider tokenCache={tokenCache}>
              <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
                  <Slot />
                  <Toaster richColors />
                </SafeAreaView>
              </View>
            </ClerkProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
      <StatusBar style='dark' />
    </ThemeProvider>
  );
}
