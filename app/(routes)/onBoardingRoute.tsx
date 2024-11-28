import useStore from "@/src/configs/services/store/store";
import Button from "@/src/shared/button/Button";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-screen-helper";

const onBoardingRoute = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);

  useEffect(() => {
    if (userData) {
      router.replace("/(tabs)/home");
    }
  }, [userData, router]);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image source={require("@/assets/images/logo/logoApp.png")} />
        <View style={styles.viewTxt}>
          <Text style={styles.txt}>Welcome</Text>
        </View>
      </View>
      <View style={styles.btn}>
        <Button
          onPress={() => {
            router.replace("/(routes)/loginRoute");
          }}
          text="Start Now"
          backgroundColor={Color.primary}
        />
      </View>
    </View>
  );
};

export default onBoardingRoute;

const styles = StyleSheet.create({
  container: {
    ...CS.flex1,
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
  },
  viewlogo: {
    alignItems: "center",
  },
  viewTxt: {
    gap: 10,
    paddingTop: 20,
  },
  txt: {
    ...CS.hnBold,
    fontSize: 28,
  },
  btn: {
    paddingHorizontal: 72,
  },
});
