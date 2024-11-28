import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import VerifyCodeRegis from "@/src/screens/auth/registration/VerifyCodeRegis";

const verifyCodeRegisRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <VerifyCodeRegis />
    </SafeAreaView>
  );
};

export default verifyCodeRegisRoute;
