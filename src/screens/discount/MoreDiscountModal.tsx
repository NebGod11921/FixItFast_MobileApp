import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Color } from "@/src/themes/app.colors";
import { CS } from "@/src/styles/cs.style";

interface ViewModalProps {
  open?: boolean;
  onClose: () => void;
}

const MoreDiscountModal: FC<ViewModalProps> = ({ open, onClose }) => {
  const hanldeClose = () => {
    onClose();
  };
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={style.container}>
        <View style={style.modalView}>
          <View style={style.viewTxt}>
            <Text style={style.txtTitle}>Gói Dịch Vụ</Text>
            <Text style={style.txtDes}>Miễn phí vận chuyển 100Km</Text>
            <Text style={style.txtDes}>Hỗ trợ sửa chữa tận nơi</Text>
            <Text style={style.txtDes}>Lỗi Ắc-quy</Text>
            <Text style={style.txtDes}>Xe xì lốp</Text>
            <Text style={style.txtDes}>Hết xăng</Text>
            <Text style={style.txtDes}>Hỗ trợ qua điện thoại</Text>
          </View>
          <TouchableOpacity onPress={hanldeClose}>
            <Text style={style.txtClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MoreDiscountModal;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.secondary,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    width: "100%",
    height: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 20,
    paddingTop: 20,
  },
  txtClose: {
    ...CS.hnBold,
    fontSize: 20,
    color: Color.black,
  },
  txtTitle: {
    ...CS.hnBold,
    fontSize: 28,
    color: Color.white,
    paddingBottom: 20,
  },
  txtDes: {
    ...CS.hnBold,
    fontSize: 18,
    color: Color.white,
  },
  viewTxt: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
