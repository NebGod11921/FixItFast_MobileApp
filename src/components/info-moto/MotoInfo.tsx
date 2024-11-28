import useStore from "@/src/configs/services/store/store";
import Button from "@/src/shared/button/Button";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const MotoInfo = ({
  moto,
  handleDelete,
}: {
  moto: any;
  handleDelete: () => void;
}) => {
  const userData = useStore((state) => state.userData);
  const userMedia = useStore((state) => state.userMedia);

  return (
    <View style={styles.viewInfoMoto}>
      <View style={styles.infoMoto}>
        <Image
          style={{ width: 80, height: 80, borderRadius: 10 }}
          source={
            (userMedia?.imageUrl || "").trim().length > 0
              ? { uri: userMedia?.imageUrl }
              : require("@/assets/images/motocycle/motorcycle.png")
          }
        />
        <Text style={styles.txtMoto}>
          Biển số xe: {userData?.moto?.licensePlate}
        </Text>
        <Text style={styles.txtMoto}>
          Số khung: {userData?.moto?.frameNumber}
        </Text>
        <Text style={styles.txtMoto}>
          Số máy: {userData?.moto?.machineNumber}
        </Text>
        <Text style={styles.txtMoto}>Xuất xứ: {userData?.moto?.origin}</Text>
        <Text style={styles.txtMoto}>Hãng xe: {userData?.moto?.brand}</Text>
        <Text style={styles.txtMoto}>Dòng xe: {userData?.moto?.bodyStyle}</Text>
        <Text style={styles.txtMoto}>Màu xe: {userData?.moto?.color}</Text>
        <Text style={styles.txtMoto}>
          Năm sản xuất: {userData?.moto?.year}
        </Text>
      </View>
      <View style={styles.btnDelete}>
        <Button
          text="Xóa xe"
          onPress={handleDelete}
          backgroundColor={Color.black}
        />
      </View>
    </View>
  );
};

export default MotoInfo;

const styles = StyleSheet.create({
  viewInfoMoto: {
    backgroundColor: Color.white,
    height: 400,
    borderRadius: 24,
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  infoMoto: {
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
  btnDelete: {
    alignContent: "center",
    marginHorizontal: 84,
  },
  txtMoto: {
    ...CS.hnSemiBold,
    fontSize: 16,
  },
});
