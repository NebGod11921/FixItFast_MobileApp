import useStore from "@/src/configs/services/store/store";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const InfoGarage = ({ garage }: { garage: any }) => {
  const userData = useStore((state) => state.userData);
  const userMedia = useStore((state) => state.userMedia);

  return (
    <View style={styles.viewInfo}>
      <View style={{ flexDirection: "row", gap: 20, marginLeft: 10 }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
          source={
            (userMedia?.imageUrl || "").trim().length > 0
              ? { uri: userMedia?.imageUrl }
              : require("@/assets/images/motocycle/motorcycle.png")
          }
        />
        <View style={{ gap: 10 }}>
          <Text numberOfLines={1} style={styles.viewName}>
            {userData?.garage?.name}
          </Text>
          <View style={styles.viewPhone}>
            <Icon name="phone" type={IconType.Feather} size={16} />
            <Text numberOfLines={1} style={styles.TxtInfo}>
              {userData?.garage?.username}
            </Text>
          </View>
          <View style={styles.viewPhone}>
            <Icon name="map-pin" type={IconType.Feather} size={16} />
            <Text numberOfLines={2} style={styles.TxtInfo}>
              {userData?.garage?.address}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Icon name="chevron-right" type={IconType.Feather} size={40} />
      </View>
    </View>
  );
};

export default InfoGarage;

const styles = StyleSheet.create({
  viewInfo: {
    backgroundColor: Color.white,
    height: 120,
    borderRadius: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  viewName: {
    ...CS.hnBold,
    fontSize: 20,
    color: Color.textOpacity2,
  },
  TxtInfo: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.textInput,
  },
  viewPhone: {
    flexDirection: "row",
    gap: 10,
  },
});
