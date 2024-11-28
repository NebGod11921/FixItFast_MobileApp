import useStore from "@/src/configs/services/store/store";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import InfoGarage from "../../info-Garage/InfoGarage";

const MechanicScreenHome = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);

  return (
    <View style={{ marginTop: 20, gap: 20 }}>
      <Text style={styles.TxtTitle}>
        Dịch vụ của
        <Text style={styles.txt}>{` Mechanic!`}</Text>
      </Text>
      <View>
        {userData?.garage ? (
          <TouchableOpacity
            onPress={() => router.push("/(routes)/viewMechanicRoute")}
          >
            <InfoGarage garage={userData?.garage} />
          </TouchableOpacity>
        ) : (
          <View style={styles.viewBtnAdd}>
            <TouchableOpacity
              style={styles.viewIconAdd}
              onPress={() => router.push("/(routes)/addInfoMechanicRoute")}
            >
              <Icon
                name="plus"
                type={IconType.Feather}
                size={40}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: Color.btnRedPrimary,
                fontWeight: "600",
              }}
            >
              Thêm thông tin mechanic
            </Text>
          </View>
        )}
      </View>
      <View style={styles.viewService}>
        <Text style={styles.TxtTitle}>Danh sách lịch hẹn và cứu hộ</Text>
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/messenger")}>
          <Image source={require("@/assets/images/schedule/schedule.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MechanicScreenHome;

const styles = StyleSheet.create({
  TxtTitle: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    color: Color.text,
    marginLeft: 10,
  },
  txt: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    color: Color.primary,
  },
  viewBtn: {
    backgroundColor: Color.primary,
    width: 50,
    alignItems: "center",
  },
  viewBtnAdd: {
    height: 100,
    backgroundColor: Color.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  viewIconAdd: {
    height: 40,
    width: 40,
    backgroundColor: Color.primary,
    borderRadius: 100,
  },
  viewService: {
    marginTop: 10,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
