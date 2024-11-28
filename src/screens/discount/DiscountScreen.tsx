import {
  View,
  Text,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "@/src/shared/header/Header";
import styles from "./style";
import { Color } from "@/src/themes/app.colors";
import Button from "@/src/shared/button/Button";
import MoreDiscountModal from "./MoreDiscountModal";

const DiscountScreen = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleViewMore = () => {
    setOpenModal(!openModal);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      <Header text="Gói dịch vụ & Khuyến mãi" />
      <View style={styles.container}>
        <View style={styles.viewDiscount}>
          <Text style={styles.txtTitle}>Gói dịch vụ</Text>
          <Text style={styles.txtViewMore} onPress={handleViewMore}>
            Xem chi tiết
          </Text>
          <View style={{ flex: 1 }}>
            <Image
              source={require("@/assets/images/discount/imgDiscount.png")}
            />
          </View>
        </View>
        <View style={styles.viewPrice}>
          <View style={styles.viewInfoPrice}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.txt}>1 Năm</Text>
              <View style={styles.viewBest}>
                <Text style={styles.txt1}>Best Value</Text>
              </View>
            </View>
            <Text style={styles.txtPrice}>
              30 ngày miễn phí - Sau đó 365,000đ/năm
            </Text>
          </View>
          <Button
            onPress={() => {}}
            text="Bắt đầu 1 tháng miễn phí"
            style={styles.styleBtn}
          />
        </View>
      </View>

      <MoreDiscountModal open={openModal} onClose={() => setOpenModal(false)} />
    </View>
  );
};
export default DiscountScreen;
