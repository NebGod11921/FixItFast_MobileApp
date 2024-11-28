import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EditProfile from "@/src/screens/profile/edit.profile";
import { CS } from "@/src/styles/cs.style";

const editProfileRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <EditProfile />
    </SafeAreaView>
  );
};

export default editProfileRoute;
