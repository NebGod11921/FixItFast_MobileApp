import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import RegistrationScreen from "@/src/screens/auth/registration/registration.screen";

const registrationRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <RegistrationScreen />
    </SafeAreaView>
  );
};

export default registrationRoute;
