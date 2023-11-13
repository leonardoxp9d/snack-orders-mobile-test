import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

import { useState, useCallback, useEffect } from 'react';
import { View, StatusBar, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Toast,{ BaseToast, BaseToastProps, ErrorToast }  from 'react-native-toast-message';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { 
  Ubuntu_400Regular, 
  Ubuntu_500Medium, 
  Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';
import defaultTheme from './src/styles/theme/default';
import { AuthProvider } from './src/contexts/AuthContext';



SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#f4ede8', backgroundColor: '#55b746', height: 70}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          color: '#f4ede8',
        }}
        text2Style={{
          fontSize: 15,
          color: '#f4ede8',
          fontWeight: '500'
        }}
      />
    ),

    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#f4ede8', backgroundColor: '#c53030', height: 70}}
        text1Style={{
          fontSize: 18,
          color: '#f4ede8',
        }}
        text2Style={{
          fontSize: 15,
          color: '#f4ede8',
          fontWeight: '500',

        }}
      />
    ),
  };

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Ubuntu_400Regular,
          Ubuntu_500Medium,
          Ubuntu_700Bold,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={defaultTheme}>
            <NavigationContainer >
              <AuthProvider>
                  <StatusBar backgroundColor="#312e38" barStyle="light-content"/>
                  <View style={{flex: 1}} onLayout={onLayoutRootView}>
                    <Routes/>
                  </View>
              </AuthProvider>
            </NavigationContainer>
        </ThemeProvider>
        <Toast config={toastConfig}/>
      </GestureHandlerRootView>
  );
}