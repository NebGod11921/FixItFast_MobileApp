import { SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import CreateNewAppointmentScreen from "@/src/screens/appointment/CreateNewAppointmentScreen";

const createNewAppointmentRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <CreateNewAppointmentScreen />
    </SafeAreaView>
  );
};

export default createNewAppointmentRoute;
