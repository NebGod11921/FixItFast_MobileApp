import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./options.home.style";
import { useRouter } from "expo-router";
import Button from "@/src/shared/button/Button";
import { Color } from "@/src/themes/app.colors";

export default function OptionsHome() {
  const router = useRouter();

  return (
    <View style={{ marginTop: 20, gap: 10 }}>
      <View style={styles.btnOption1}>
        <View style={styles.viewOption}>
          <Image source={require("@/assets/images/worker/worker.png")} />
          <View style={{ flex: 1 }}>
            <Text style={styles.txtOption2} numberOfLines={2}>
              Xe bạn đang gặp sự cố?
            </Text>
            <Text style={styles.txtOption21} numberOfLines={2}>
              Hãy đặt dịch vụ ngay, chúng tôi sẽ tới chỗ bạn để sửa xe ngay lập
              tức.
            </Text>
          </View>
        </View>
        <View style={styles.styleBtn}>
          <Button
            style={styles.viewBtn}
            onPress={() => {
              router.push("/(routes)/createAppointmentSOSRouter");
            }}
            text="Đặt sửa xe"
            backgroundColor={Color.black}
          />
        </View>
      </View>
      <View style={styles.btnOption2}>
        <View style={styles.viewOption}>
          <Image source={require("@/assets/images/motocycle/motorcycle.png")} />
          <View style={{ flex: 1 }}>
            <Text style={styles.txtOption2} numberOfLines={2}>
              Không thể tới tiệm bảo dưỡng xe?
            </Text>
            <Text style={styles.txtOption21} numberOfLines={2}>
              Đừng lo, chúng tôi sẽ mang dịch vụ bảo dưỡng tới nơi của bạn
            </Text>
          </View>
        </View>
        <View style={styles.styleBtn}>
          <Button
            style={styles.viewBtn}
            onPress={() => {
              router.push("/(routes)/selectServiceRoute");
            }}
            text="Chọn dịch vụ"
            backgroundColor={Color.black}
          />
        </View>
      </View>
      <View style={styles.btnOption3}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.txtOption3}>Khuyến mãi & Dịch vụ</Text>
        </View>
        <View style={styles.styleBtn}>
          <Button
            style={styles.viewBtn}
            onPress={() => {
              router.push("/(routes)/discountRoute");
            }}
            text="Xem chi tiết"
            backgroundColor={Color.black}
          />
        </View>
      </View>
    </View>
  );
}
