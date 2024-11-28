import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import Header from "@/src/shared/header/Header";
import { Color } from "@/src/themes/app.colors";
// import ServiceScreen from "../serviceScreen/ServiceScreen";

export default function MessengerScreen() {
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <Header
        hideBackBtn
        text="Tin nhắn & Thông báo"
        customStyle={{ backgroundColor: Color.transparent }}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            alignItems: "center",
            gap: 30,
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("@/assets/images/noti/notification.png")}
          />
          <Text
            style={{ ...CS.hnSemiBold, fontSize: 18, color: Color.primary }}
          >
            Bạn chưa có thông báo nào
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
