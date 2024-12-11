import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";
import { Redirect, router } from "expo-router";
import { Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  const handlePress = async () => {
    if (!permission || !permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          "Permission Denied",
          "Camera access is required to scan codes."
        );
        return;
      }
    }
    router.push("/scanner");
  };

  return (
    <SafeAreaView className=" h-full">
      <ImageBackground source={require("../assets/gplay.png")}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center px-4 flex flex-1">
            <Image
              source={require("../assets/images/eStaskaN.png")}
              className="w-[230px] h-[234px] self-center"
              resizeMode="contain"
            />
            <View className="relative pb-16 ">
              <Text className="text-4xl text-zinc-900 -mt-5 font-bold text-center">
                Vitajte v aplikácii{" "}
                <Text className="text-[#344E41] ">eStaska</Text>!
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: "100%",
                borderRadius: 1,
                borderWidth: 1,
                borderColor: "black",
                borderStyle: "dashed",
                zIndex: 0,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: 1,
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              />
            </View>
            <Text style={styles.header} className="ml-2 mt-10">
              Ako začať:
            </Text>
            <Text className="ml-2" style={styles.body}>
              1. Stlačte tlačidlo <Text style={styles.bold}>Skenovať</Text> na
              spustenie procesu.
            </Text>
            <Text className="ml-2" style={styles.body}>
              2. Po dokončení skenovania vás aplikácia automaticky presmeruje do
              sekcie, kde môžete:
            </Text>
            <View className="pb-5" style={styles.bulletContainer}>
              <Text style={styles.bullet}>
                •{" "}
                <Text style={styles.body}>
                  Zaznamenávať najazdené kilometre
                </Text>
              </Text>
              <Text style={styles.bullet}>
                • <Text style={styles.body}>Evidovať tankovanie</Text>
              </Text>
            </View>

            <View style={{ gap: 20, padding: 20 }}>
              <Pressable
                onPress={handlePress}
                style={[
                  styles.ourbutton,
                  {
                    backgroundColor: permission?.granted ? "#344E41" : "gray",
                  },
                ]}
              >
                <Text className="text-white font-psemibold text-lg">
                  {permission?.granted ? "SKENOVAŤ" : "Požiadať o povolenie"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" backgroundColor="#161622" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  bulletContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 3,
  },

  ourbutton: {
    borderRadius: 12, // 'rounded-xl' for large radius (adjust as necessary)
    minHeight: 62, // 'min-h-[62px]'
    justifyContent: "center", // 'justify-center'
    alignItems: "center", // 'items-center'
    width: "100%",
    marginTop: "7%",
  },
});
