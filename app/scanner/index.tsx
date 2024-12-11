import { Camera, CameraView } from "expo-camera";
import { Stack, router } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />

      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            console.log(data);
            qrLock.current = true;

            const parsedData = JSON.parse(data);
            console.log(parsedData);
            const { name, surname, firm } = parsedData;

            router.push(`./home?name=${name}&surname=${surname}`);

            setTimeout(() => {
              qrLock.current = false;
            }, 1000);
          }
        }}
      />
    </SafeAreaView>
  );
}
