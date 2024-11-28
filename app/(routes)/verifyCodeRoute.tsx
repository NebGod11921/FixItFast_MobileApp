import React from "react";
import { SafeAreaView } from "react-native";
import { CS } from "@/src/styles/cs.style";
import VerifyCodeScreen from "@/src/screens/auth/forgot-password/VerifyCodeScreen";

const verifyCodeRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <VerifyCodeScreen />
    </SafeAreaView>
  );
};

export default verifyCodeRoute;
