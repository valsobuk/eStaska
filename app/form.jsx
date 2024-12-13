import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Easing } from "react-native";
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

export default function App() {
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
            <SwitchSelector
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
              fontSize={16}
              valuePadding={-1}
              height={45}
            />

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

            <View className="  flex flex-row justify-between items-center mt-16 mb-8c bg-white border border-[#344E41] rounded-xl h-[17%]">
              <View className="flex-none justify-center items-center w-2/3">
                <Text className="text-2xl font-medium">STAV KILOMETROV</Text>
                <Text className="text-2xl text-[#344E41] font-medium ">
                  PRED JAZDOU
                </Text>
                <TouchableOpacity className=" mt-4 justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg">
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

            <View className="  flex flex-row justify-between items-center mt-16 mb-8c bg-white border border-[#344E41] rounded-xl h-[17%]">
              <View className="flex-none justify-center items-center w-2/3">
                <Text className="text-2xl font-medium">STAV NÁDRŽE</Text>
                <Text className="text-2xl text-[#344E41] font-medium ">
                  PRED JAZDOU
                </Text>
                <TouchableOpacity className=" mt-4 justify-center items-center w-[90%] bg-[#344E41] border-black border h-12 rounded-lg">
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

            <View style={{ gap: 20, padding: 20 }}>
              <Pressable className="w-full min-h-5">
                <Text className="text-white font-psemibold text-lg">
                  ODOSLAŤ
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
