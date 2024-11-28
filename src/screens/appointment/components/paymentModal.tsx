import { getStatusPayment } from "@/src/configs/services/api/appointment.api";
import Button from "@/src/shared/button/Button";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import React, { FC, useEffect } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ViewModalProps {
  data: any;
  open?: boolean;
  onClose: () => void;
  updateStatus: any;
  _id: number;
}

const PaymentModal: FC<ViewModalProps> = ({ data, open, onClose, updateStatus, _id }) => {
  let interval: any = null;

  const handlePayment = async (id: number) => {
    try {
      const res = await getStatusPayment(id);
      if(res.data.status == "PAID") {
        onClose();
        clearInterval(interval);
        updateStatus(_id);
      }
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    if (typeof data == "object" && data.data.status == "PENDING" && open) {
      interval = setInterval(() => {
        handlePayment(data.data.orderCode);
      }, 5000);
    }
  }, [data, open]);

  const hanldeClose = () => {
    onClose();
    clearInterval(interval);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.txtTitle}>Thông tin thanh toán</Text>
          </View>
          <View style={styles.viewQR}>
            <Image
              source={{
                uri: data?.imgQr,
              }}
              style={{ width: 250, height: 250 }}
            />
          </View>
          <View style={styles.viewInfoBank}>
            <Text style={styles.txtInfo}>Ngân hàng</Text>
            <Text
              style={styles.txtDes}
            >{`Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam(BIDV)`}</Text>
            <Text style={styles.txtInfo}>Chủ tài khoản:</Text>
            <Text style={styles.txtDes}>{data?.data?.accountName}</Text>
            <Text style={styles.txtInfo}>Số tài khoản:</Text>
            <Text style={styles.txtDes}>{data?.data?.accountNumber}</Text>
            <Text style={styles.txtInfo}>Số tiền:</Text>
            <Text style={styles.txtDes}>{`${data?.data?.amount} VND`}</Text>
            <Text style={styles.txtInfo}>Nội dung:</Text>
            <Text style={styles.txtDes}>{data?.data?.description}</Text>
            <Text style={styles.txtWarning}>
              Lưu ý: Nhập chính xác số tiền khi chuyển khoản.
            </Text>
          </View>
          <Button onPress={hanldeClose} text="Đóng" />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: Color.grey,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    width: "100%",
    height: "94%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 28,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    ...CS.hnBold,
    fontSize: 20,
  },
  viewQR: {
    // height: 100,
    // flex: 1,
  },
  viewInfoBank: {
    // justifyContent: "center",
    // alignItems: "center",
    gap: 10,
  },
  txtInfo: {
    ...CS.hnBold,
    fontSize: 18,
  },
  txtWarning: {
    ...CS.hnBold,
    fontSize: 16,
    color: Color.red,
    textAlign: "center",
  },
  txtDes: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.text,
    // textAlign: "center",
  },
});
