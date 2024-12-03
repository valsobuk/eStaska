import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text className="text-white font-psemibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#344E41", // Assuming 'bg-secondary' corresponds to the color you defined
    borderRadius: 12, // 'rounded-xl' for large radius (adjust as necessary)
    minHeight: 62, // 'min-h-[62px]'
    justifyContent: "center", // 'justify-center'
    alignItems: "center", // 'items-center'
  },
});

export default CustomButton;
