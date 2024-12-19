import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Button, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { Redirect, router } from "expo-router";
import { Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import SwitchSelector from "react-native-switch-selector";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "../components/Modal";
import { TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useGlobalSearchParams } from "expo-router";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [spotreba, setSpotreba] = useState("");
  const [activeModal, setActiveModal] = useState(null); // Tracks which button opened the modal

  const [kilometre, setKilometre] = useState("");
  const [litre, setLitre] = useState("");

  const handleInputChange = (value, type) => {
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      if (type === "spotreba" && value.length <= 4) {
        setSpotreba(value);
      } else if (type === "kilometre" && value.length <= 7) {
        setKilometre(value);
      } else if (type === "litre" && value.length <= 4) {
        setLitre(value);
      }
    }
  };

  const save = async () => {
    try {
      await AsyncStorage.setItem("kilometre", kilometre);
      await AsyncStorage.setItem("litre", litre);
      await AsyncStorage.setItem("spotreba", spotreba);
    } catch (error) {
      console.log(error);
    }
  };

  const load = async () => {
    try {
      const kilometre = await AsyncStorage.getItem("kilometre");
      const litre = await AsyncStorage.getItem("litre");
      const spotreba = await AsyncStorage.getItem("spotreba");

      if (kilometre) {
        setKilometre(kilometre);
      }

      if (litre) {
        setLitre(litre);
      }

      if (spotreba) {
        setSpotreba(spotreba);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("kilometre");
      await AsyncStorage.removeItem("litre");
      await AsyncStorage.removeItem("spotreba");
    } catch (error) {
      console.log(error);
    } finally {
      setKilometre("");
      setLitre("");
      setSpotreba("");
    }
  };

  const { name, id_auta } = useGlobalSearchParams();
  console.log("ssssss " + name, id_auta);

  return (
    <SafeAreaView className=" h-full">
      <StatusBar hidden={false} />
      <ImageBackground source={require("../assets/gplay.png")}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full px-4 flex flex-1">
            <View className="relative pb-12 ">
              <Text className="text-4xl font-bold mt-5 text-center text-[#344E41] ">
                eStaska
              </Text>
            </View>
            {/*  <SwitchSelector
              initial={0}
              onPress={(value) => this.setState({ gender: value })}
              textColor="black" //'#7a44cf'
              selectedColor="white"
              buttonColor="#344E41"
              borderColor="#344E41"
              hasPadding
              options={[
                {
                  label: "PRED JAZDOU",
                  value: "f",
                },
                {
                  label: "PO JAZDE",
                  value: "m",
                },
              ]}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
              borderRadius={10}
              bold
              fontSize={17}
              valuePadding={-1}
              height={50}
            />}
            */}

            <View className=" flex-row h-[9%] justify-center mb-8 ">
              <View className=" w-32 h-32   flex flex-column justify-between items-center bg-white border border-[#344E41] rounded-xl mr-5 ">
                <View className="flex-none mt-1 justify-center items-center">
                  <Image
                    source={require("../assets/icons/download-speed.png")}
                    className="w-[45px] h-[45px] self-center"
                    resizeMode="contain"
                  ></Image>
                </View>

                <View className=" flex-none border-t w-full border-dashed justify-center items-center h-[50%]">
                  <Text className="text-2xl font-medium">
                    {kilometre ? kilometre : "---"} <Text>KM</Text>
                  </Text>
                </View>
              </View>

              <View className=" w-32 h-32   flex flex-column justify-between items-center bg-white border border-[#344E41] rounded-xl mr-5 ">
                <View className="flex-none mt-2 justify-center items-center">
                  <Image
                    source={require("../assets/icons/gas-pump-icon.png")}
                    className="w-[40px] h-[40px] self-center"
                    resizeMode="contain"
                  ></Image>
                </View>

                <View className=" flex-none border-t w-full border-dashed justify-center items-center h-[50%]">
                  <Text className="text-2xl font-medium">
                    {litre ? litre : "---"} <Text>L</Text>
                  </Text>
                </View>
              </View>

              <View className=" w-32 h-32   flex flex-column justify-between items-center bg-white border border-[#344E41] rounded-xl ">
                <View className="flex-none mt-1 justify-center items-center">
                  <Image
                    source={require("../assets/icons/gas-tank.png")}
                    className="w-[45px] h-[45px] self-center"
                    resizeMode="contain"
                  ></Image>
                </View>

                <View className=" flex-none border-t w-full border-dashed justify-center items-center h-[50%]">
                  <Text className="text-2xl font-medium">
                    {spotreba ? spotreba : "---"} <Text>L</Text>
                  </Text>
                </View>
              </View>
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
                marginTop: 40,
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

            <View className="  flex flex-row justify-between items-center mt-8 mb-8 bg-white border border-[#344E41] rounded-xl h-[14%]">
              <View className="flex-none justify-center items-center w-[70%] ">
                <Text className="text-2xl mb-3 font-medium">
                  STAV KILOMETROV
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setActiveModal("kilometre");
                    setModalOpen(true);
                  }}
                  className=" justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg"
                >
                  <Text className="text-white text-xl font-medium">PRIDAŤ</Text>
                </TouchableOpacity>
              </View>

              <View className=" flex-none border-l border-dashed justify-center items-center h-full w-[30%]">
                <Image
                  source={require("../assets/icons/download-speed.png")}
                  className="w-[75px] h-[75px] self-center"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>

            <View className="  flex flex-row justify-between items-center  bg-white border border-[#344E41] rounded-xl h-[14%]">
              <View className="flex-none justify-center items-center w-[70%]">
                <Text className="text-2xl mb-3  font-medium">
                  NATANKOVANÉ LITRE
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setActiveModal("litre");
                    setModalOpen(true);
                  }}
                  className=" justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg"
                >
                  <Text className="text-white text-xl font-medium">PRIDAŤ</Text>
                </TouchableOpacity>
              </View>

              <View className=" flex-none border-l border-dashed justify-center items-center h-full w-[30%]">
                <Image
                  source={require("../assets/icons/gas-pump-icon.png")}
                  className="w-[70px] h-[70px] self-center"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>

            <View className="  flex flex-row justify-between items-center mt-8 mb-8c bg-white border border-[#344E41] rounded-xl h-[14%]">
              <View className="flex-none justify-center items-center w-[70%]">
                <Text className="text-2xl mb-3  font-medium">STAV NÁDRŽE</Text>

                <TouchableOpacity
                  onPress={() => {
                    setActiveModal("spotreba");
                    setModalOpen(true);
                  }}
                  className=" justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg"
                >
                  <Text className="text-white text-xl font-medium">PRIDAŤ</Text>
                </TouchableOpacity>
              </View>

              <View className=" flex-none border-l border-dashed justify-center items-center h-full w-[30%]">
                <Image
                  source={require("../assets/icons/gas-tank.png")}
                  className="w-[75px] h-[75px] self-center"
                  resizeMode="contain"
                ></Image>
              </View>
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
                marginTop: 25,
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

            <View style={{ gap: 10, padding: 10 }}>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const response = await fetch(
                      "https://staska.onrender.com/zamestnanci/staska",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          heslo_auta: "auto123",
                          vodic: "peterbednar",
                          stav_kilometre: "50100",
                          tankovanie: litre,
                          stav_nadrze: spotreba,
                        }),
                      }
                    );

                    if (response.ok) {
                      const result = await response.json();
                      console.log("Data sent successfully:", result);
                      // Optionally clear fields or show a success message
                      setKilometre("");
                      setLitre("");
                      setSpotreba("");
                      remove();
                    } else {
                      console.error(
                        "Failed to send data:",
                        response.statusText
                      );
                    }
                  } catch (error) {
                    console.error("Error while sending data:", error);
                  }
                }}
                className="mt-4 justify-center w-full min-h-5 border bg-[#292D32] h-[4.5rem] rounded-xl"
              >
                <Text className="text-white font-semibold text-xl text-center">
                  ODOSLAŤ
                </Text>
              </TouchableOpacity>

              <Modal isOpen={modalOpen}>
                <View className="w-[90%] bg-white rounded-xl border h-max relative p-4">
                  <View className="flex-row">
                    <View className="w-[90%]">
                      <Text className="text-2xl font-semibold">
                        {activeModal === "kilometre"
                          ? "ZADAJTE STAV KILOMETROV"
                          : activeModal === "litre"
                          ? "ZADAJTE POČET NATANKOVANÝCH LITROV"
                          : "ZADAJTE STAV NÁDRŽE ZA TENTO DEŇ"}{" "}
                        <Text className="text-[#344E41]">
                          {activeModal === "kilometre"
                            ? "KM"
                            : activeModal === "litre"
                            ? "L"
                            : "L"}
                        </Text>
                        :
                      </Text>
                    </View>
                  </View>
                  <TextInput
                    placeholder={
                      activeModal === "kilometre"
                        ? "Stav kilometrov..."
                        : activeModal === "litre"
                        ? "Počet litrov..."
                        : "Spotreba..."
                    }
                    value={
                      activeModal === "kilometre"
                        ? kilometre
                        : activeModal === "litre"
                        ? litre
                        : spotreba
                    }
                    onChangeText={(value) =>
                      handleInputChange(value, activeModal)
                    }
                    className="mt-5 border rounded-lg border-[#d2d2d2] w-full h-20"
                    keyboardType="numeric"
                  />
                  <View className="flex-row gap-3 ">
                    <TouchableOpacity
                      className="bg-[#292D32] h-16 mt-8 rounded-lg justify-center bottom-2  w-[75%] border"
                      onPress={() => {
                        setModalOpen(false);
                        save();
                      }}
                    >
                      <Text className="text-center text-white text-xl font-medium">
                        POTVRDIŤ
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        if (activeModal === "kilometre") {
                          setKilometre(""); // Clear the kilometre value
                        } else if (activeModal === "litre") {
                          setLitre(""); // Clear the litre value
                        } else if (activeModal === "spotreba") {
                          setSpotreba(""); // Clear the spotreba value
                        }
                      }}
                      className="w-fit mt-8 bottom-2  "
                    >
                      <Image
                        source={require("../assets/icons/close.png")}
                        className="w-[76px] h-[76px] self-center flex-1"
                        resizeMode="cover"
                      ></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" backgroundColor="#161622" />
      </ImageBackground>
    </SafeAreaView>
  );
}
