import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Button, Easing } from "react-native";
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
import { images } from "../constants";
import { Redirect, router } from "expo-router";
import { Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "../components/Modal";
import { TextInput } from "react-native";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [text, setText] = useState("");
  const [activeModal, setActiveModal] = useState(null); // Tracks which button opened the modal

  const [kilometre, setKilometre] = useState("");

  const handleInputChange = (value, type) => {
    // Allow only numbers and a maximum of 4 characters
    if (/^\d*$/.test(value) && value.length <= 4) {
      if (type === "text") {
        setText(value);
      } else if (type === "kilometre") {
        setKilometre(value);
      }
    }
  };

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

            <View className=" flex-row h-[9%] justify-center mt-5 ">
              <View className=" w-48  flex flex-row justify-between items-center bg-white border border-[#344E41] rounded-xl mr-5 ">
                <View className="flex-none justify-center items-center w-[40%]">
                  <Image
                    source={require("../assets/icons/speedometer-icon.png")}
                    className="w-[45px] h-[45px] self-center"
                    resizeMode="contain"
                  ></Image>
                </View>

                <View className=" flex-none border-l border-dashed justify-center items-center h-full w-[60%]">
                  <Text className="text-2xl font-medium">
                    {kilometre ? kilometre : "---"} <Text>KM</Text>
                  </Text>
                </View>
              </View>

              <View className=" w-48  flex flex-row justify-between items-center bg-white border border-[#344E41] rounded-xl">
                <View className="flex-none justify-center items-center w-[40%]">
                  <Image
                    source={require("../assets/icons/gas-pump-icon.png")}
                    className="w-[45px] h-[45px] self-center"
                    resizeMode="contain"
                  ></Image>
                </View>

                <View className=" flex-none border-l border-dashed justify-center items-center h-full w-[60%]">
                  <Text className="text-2xl font-medium">
                    {text ? text : "---"} <Text>L</Text>
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

            <View className="  flex flex-row justify-between items-center mt-16 mb-8 bg-white border border-[#344E41] rounded-xl h-[16%]">
              <View className="flex-none justify-center items-center w-2/3 ">
                <Text className="text-2xl font-medium">STAV KILOMETROV</Text>
                <Text className="text-2xl -mt-1 mb-3 text-[#344E41] font-medium ">
                  PRED JAZDOU
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

              <View className=" flex-none border-l border-dashed justify-center items-center h-full w-1/3">
                <Image
                  source={require("../assets/icons/speedometer-icon.png")}
                  className="w-[80px] h-[80px] self-center"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>

            <View className="  flex flex-row justify-between items-center mt-8 mb-8c bg-white border border-[#344E41] rounded-xl h-[16%]">
              <View className="flex-none justify-center items-center w-2/3">
                <Text className="text-2xl  font-medium">STAV NÁDRŽE</Text>
                <Text className="text-2xl -mt-1 mb-3  text-[#344E41] font-medium ">
                  PRED JAZDOU
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setActiveModal("text");
                    setModalOpen(true);
                  }}
                  className=" justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg"
                >
                  <Text className="text-white text-xl font-medium">PRIDAŤ</Text>
                </TouchableOpacity>
              </View>

              <View className=" flex-none border-l border-dashed justify-center items-center h-full w-1/3">
                <Image
                  source={require("../assets/icons/gas-pump-icon.png")}
                  className="w-[80px] h-[80px] self-center"
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

            <View style={{ gap: 10, padding: 10 }}>
              <Pressable className=" mt-8 justify-center w-full min-h-5 border bg-[#292D32] h-[4.5rem] rounded-xl ">
                <Text className="text-white font-psemibold text-xl text-center">
                  ODOSLAŤ
                </Text>
              </Pressable>

              <Modal isOpen={modalOpen}>
                <View className="w-[90%] bg-white rounded-xl border h-64 relative p-4">
                  <Text className="text-2xl font-semibold">
                    {activeModal === "kilometre"
                      ? "ZADAJTE STAV KILOMETROV"
                      : "ZADAJTE POČET NATANKOVANÝCH LITROV"}{" "}
                    <Text className="text-[#344E41]">
                      {activeModal === "kilometre" ? "KM" : "L"}
                    </Text>
                    :
                  </Text>
                  <TextInput
                    placeholder={
                      activeModal === "kilometre"
                        ? "Stav kilometrov..."
                        : "Počet litrov..."
                    }
                    value={activeModal === "kilometre" ? kilometre : text}
                    onChangeText={(value) =>
                      handleInputChange(value, activeModal)
                    }
                    className="mt-5 border rounded-lg border-[#d2d2d2] w-full h-20"
                    keyboardType="numeric"
                  />
                  <Pressable
                    className="bg-[#292D32] h-12 rounded-lg justify-center absolute bottom-2 self-center w-full"
                    onPress={() => {
                      setModalOpen(false);
                    }}
                  >
                    <Text className="text-center text-white text-lg font-medium">
                      POTVRDIŤ
                    </Text>
                  </Pressable>
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
