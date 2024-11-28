import React from "react";
import { SafeAreaView } from "react-native";
import AddMotoInfo from "@/src/components/info-moto/AddMotoInfo";
import { CS } from "@/src/styles/cs.style";

const addInfoMotoRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <AddMotoInfo />
    </SafeAreaView>
  );
};

export default addInfoMotoRoute;
