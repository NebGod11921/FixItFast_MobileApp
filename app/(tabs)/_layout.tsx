import React from "react";
import { Tabs } from "expo-router";
import { IconHome } from "@/assets/icons/IconHome";
import { Color } from "@/src/themes/app.colors";
import { Person } from "@/assets/icons/Person";
import { IconMess } from "@/assets/icons/IconMess";
import { IconCalendar } from "@/assets/icons/IconCalendar";

export default function _layout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "home") {
              if (focused) {
                iconName = (
                  <IconHome colors={Color.primary} width={22} height={22} />
                );
              } else {
                iconName = (
                  <IconHome colors={Color.darkHeader} width={22} height={22} />
                );
              }
            } else if (route.name === "messenger") {
              if (focused) {
                iconName = (
                  <IconCalendar colors={Color.primary} width={25} height={25} />
                );
              } else {
                iconName = (
                  <IconCalendar colors={Color.darkHeader} width={25} height={25} />
                );
              }
            } else if (route.name === "profile") {
              if (focused) {
                iconName = <Person fill={Color.primary} />;
              } else {
                iconName = <Person fill={"#8F8F8F"} />;
              }
            }
            return iconName;
          },
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="messenger" />
      <Tabs.Screen name="profile" />
      {/* <Tabs.Screen name="(routes)/discount"/> */}
    </Tabs>
  );
}
