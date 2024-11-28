import useStore from "@/src/configs/services/store/store";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const ViewMoreMachanicScreen = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);

  return (
    <ImageBackground
      source={require("@/assets/images/mechanic/imgMechanic.png")}
      style={{ flex: 1, height: 250 }}
    >
      <View style={styles.viewHeader}></View>
      <View style={styles.viewBack}>
        <TouchableOpacity
          style={styles.viewBtnBack}
          onPress={() => router.push('/(tabs)/home')}
        >
          <Icon
            name="arrow-left"
            type={IconType.Feather}
            size={35}
            color="black"
          />
        </TouchableOpacity>
        <View></View>
      </View>
      <View style={styles.viewInfo}>
        <View style={{ marginHorizontal: 28, flex: 1 }}>
          <View style={styles.viewName}>
            <Text numberOfLines={2} style={styles.txtNameMechanic}>
              {userData?.garage?.name}
            </Text>
            <View style={styles.viewPhone}>
              <Icon
                name="map-pin"
                type={IconType.Feather}
                size={16}
                color={Color.textDark}
              />
              <Text numberOfLines={2} style={styles.TxtInfo}>
                {userData?.garage?.address}
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 30, gap: 20 }}>
            <View style={{ gap: 10 }}>
              <Text style={styles.txtTitle}>Thông tin</Text>
              <Text style={styles.txtDes}>{userData?.garage?.description}</Text>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.txtTitle}>Dịch vụ</Text>
              <View style={styles.viewPhone}>
                <Icon
                  name="tool"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Sửa xe, Độ Xe
                </Text>
              </View>
              <View style={styles.viewPhone}>
                <Icon
                  name="settings"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Bảo dưỡng, Bảo hành định kỳ
                </Text>
              </View>
              <View style={styles.viewPhone}>
                <Icon
                  name="star"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Cứu trợ khẩn cấp
                </Text>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={styles.txtTitle}>Tiện ích</Text>
              <View style={styles.viewPhone}>
                <Icon
                  name="wifi"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Có kết nối wifi
                </Text>
              </View>
              <View style={styles.viewPhone}>
                <Icon
                  name="wind"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Có điều hòa
                </Text>
              </View>
              <View style={styles.viewPhone}>
                <Icon
                  name="home"
                  type={IconType.Feather}
                  size={20}
                  color={Color.textDark}
                />
                <Text numberOfLines={2} style={styles.txtDes}>
                  Phòng chờ sửa xe
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ViewMoreMachanicScreen;

const styles = StyleSheet.create({
  viewHeader: {
    height: 70,
  },
  viewBack: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
  },
  viewBtnBack: {
    height: 40,
    width: 40,
    backgroundColor: Color.white7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  viewInfo: {
    flex: 1,
    backgroundColor: Color.white,
    marginTop: 60,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  viewName: {
    marginTop: 20,
    gap: 10,
  },
  txtNameMechanic: {
    ...CS.hnBold,
    fontSize: 28,
    color: Color.primary,
  },
  txtTitle: {
    ...CS.hnBold,
    fontSize: 24,
    color: Color.textOpacity2,
  },
  viewPhone: {
    flexDirection: "row",
    gap: 10,
  },
  TxtInfo: {
    ...CS.hnSemiBold,
    fontSize: 18,
    color: Color.textDark,
  },
  txtDes: {
    ...CS.hnSemiBold,
    fontSize: 20,
    color: Color.textInput,
  },
});
