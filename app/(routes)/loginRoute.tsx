import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import LoginScreen from "@/src/screens/auth/login/LoginScreen";

const loginRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default loginRoute;
