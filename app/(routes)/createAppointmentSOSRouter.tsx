import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import CreateAppointmentSOS from "@/src/screens/appointment/CreateAppointmentSOS";

const createAppointmentSOSRouter = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <CreateAppointmentSOS />
    </SafeAreaView>
  );
};

export default createAppointmentSOSRouter;
