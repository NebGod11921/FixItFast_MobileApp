import React from "react";
import { CS } from "@/src/styles/cs.style";
import { SafeAreaView, View } from "react-native";
import ViewMoreMachanicScreen from "@/src/components/about-home/option-Mechanic/viewMoreMachanicScreen";

const viewMechanicRoute = () => {
  return (
    <View style={CS.flex1}>
      <ViewMoreMachanicScreen />
    </View>
  );
};

export default viewMechanicRoute;
