import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import ServiceScreen from "@/src/screens/serviceScreen/ServiceScreen";

const selectServiceRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <ServiceScreen />
    </SafeAreaView>
  );
};

export default selectServiceRoute;
