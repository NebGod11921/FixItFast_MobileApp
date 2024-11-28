import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import AppointmentScreen from "@/src/screens/appointment/AppointmentScreen";

const appointmentRoute = () => {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <AppointmentScreen />
    </SafeAreaView>
  );
};

export default appointmentRoute;
