import React from "react";
import { SafeAreaView } from "react-native";
import { CS } from "@/src/styles/cs.style";
import ResetPasswordScreen from "@/src/screens/auth/forgot-password/ResetPasswordScreen";

const resetPasswordRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <ResetPasswordScreen />
    </SafeAreaView>
  );
};

export default resetPasswordRoute;
