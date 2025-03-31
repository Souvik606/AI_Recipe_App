import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { ClerkProvider } from '@clerk/clerk-expo'
import {tokenCache} from "@/lib/auth";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

  if (!publishableKey) {
      throw new Error(
          'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
      )
  }

  return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(root)" options={{headerShown: false}} />
        </Stack>
      </ClerkProvider>
  );
}




















