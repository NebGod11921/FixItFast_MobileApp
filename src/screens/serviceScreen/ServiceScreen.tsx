import Header from "@/src/shared/header/Header";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ServiceScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={CS.safeAreaView}>
      <Header text="Chọn dịch vụ" />
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={styles.styleTilte}>Lựa chọn loại dịch vụ</Text>
          <Text style={styles.styleTilte2}>
            Chúng tôi sẽ mang dịch vụ của chúng tôi đến tận nơi phục vụ bạn
          </Text>
        </View>
        <View style={styles.viewBtn}>
          <View style={styles.Btn1}>
            <TouchableOpacity
              style={styles.styleImg}
              onPress={() => router.push("/(routes)/createNewAppointmentRoute")}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("@/assets/images/imgOil/oil.png")}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Kiểm tra định kỳ</Text>
          </View>
          <View style={styles.Btn1}>
            <TouchableOpacity
              style={styles.styleImg}
              onPress={() => router.push("/(routes)/createNewAppointmentRoute")}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("@/assets/images/imgService/service.png")}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>Thay đổi phụ tùng</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  viewTitle: {
    alignItems: "center",
    marginTop: 20,
    gap: 20,
    marginHorizontal: 16,
  },
  styleTilte: {
    ...CS.hnBold,
    fontSize: 20,
    color: Color.text,
  },
  styleTilte2: {
    ...CS.hnMedium,
    fontSize: 16,
    color: Color.text,
    textAlign: "center",
  },
  viewBtn: {
    height: 150,
    marginTop: 20,
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  Btn1: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  txt: {
    ...CS.hnBold,
    fontSize: 16,
    color: Color.text,
  },
  styleImg: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: Color.backgroundIcon,
    justifyContent: "center",
    alignItems: "center",
  },
});
