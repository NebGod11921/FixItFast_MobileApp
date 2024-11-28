import React from "react";
import { CS } from "@/src/styles/cs.style";
import { SafeAreaView } from "react-native";
import AddMechanicInfo from "@/src/components/info-Garage/AddMechanicInfo";

const addInfoMechanicRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <AddMechanicInfo />
    </SafeAreaView>
  );
};

export default addInfoMechanicRoute;
