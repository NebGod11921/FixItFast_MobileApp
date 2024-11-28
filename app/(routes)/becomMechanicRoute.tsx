import React from "react";
import { CS } from "@/src/styles/cs.style";
import { SafeAreaView } from "react-native";
import BecomMechanicScreen from "@/src/screens/mechanic/BecomMechanicScreen";

const becomMechanicRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <BecomMechanicScreen />
    </SafeAreaView>
  );
};

export default becomMechanicRoute;
