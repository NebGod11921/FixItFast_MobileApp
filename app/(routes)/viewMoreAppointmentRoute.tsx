import React from "react";
import { View } from "react-native";
import { CS } from "@/src/styles/cs.style";
import ViewMoreAppointment from "@/src/screens/appointment/ViewMoreAppointment";

const viewMoreAppointmentRoute = () => {
  return (
    <View style={CS.flex1}>
      <ViewMoreAppointment />
    </View>
  );
};

export default viewMoreAppointmentRoute;
