import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React from "react";
import { CS } from "@/src/styles/cs.style";
import AboutHome from "@/src/components/about-home/about.home";

export default function HomeScreen() {

  const renderHomePage = React.useCallback(() => {
    return <AboutHome />;
  }, []);

  return (
    <SafeAreaView style={CS.safeAreaView}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={CS.flex1}
      >
        {renderHomePage()}
      </ScrollView>
    </SafeAreaView>
  );
}
