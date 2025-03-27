import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { LogtoProvider, LogtoConfig } from '@logto/rn';

const config: LogtoConfig = {
  endpoint: 'https://zp6cuz.logto.app/',
  appId: '993vw2zqp3b7kd5oo8x51',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
      <LogtoProvider config={config}>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
        </Stack>
      </LogtoProvider>
  );
}




















