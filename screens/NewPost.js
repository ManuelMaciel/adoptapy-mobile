import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AdoptionCreateScreen from './mascot/adoption/AdoptionCreateScreen';
const NewPosts = () => {
  return (
    <AdoptionCreateScreen />
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default NewPosts;