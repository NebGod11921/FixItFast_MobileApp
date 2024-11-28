import {
  acceptAppointment,
  cancelAppointment,
  completedAppointment,
  createPayment,
  processingAppointment,
} from "@/src/configs/services/api/appointment.api";
import useStore from "@/src/configs/services/store/store";
import eventEmitter from "@/src/helpers/eventEmitter";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import PaymentModal from "./components/paymentModal";

const ViewMoreAppointment = () => {
  const { data } = useLocalSearchParams();
  const paraseToObject = data ? JSON.parse(data) : {};
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const userMedia = useStore((state) => state.userMedia);
  const [isLoading, setIsLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const renderStatusText = () => {
    switch (paraseToObject?.status) {
      case "NEW":
        return "Có lịch hẹn mới!";
      case "CONFIRMED":
        return "Đã nhận lịch hẹn";
      case "PROCESSING":
        return "Đang sửa chữa!";
      case "COMPLETED":
        return "Đã hoàn thành!";
      case "CANCELED":
        return "Đã huỷ lịch hẹn!";
      default:
        return "";
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      price: "",
      vehicleHandoverTime: new Date().toISOString(),
    },
  });
  const IconText = ({ text, nameIcon }: { text: string; nameIcon: string }) => {
    return (
      <View style={styles.viewTextIcon}>
        <Icon name={nameIcon} type={IconType.Feather} size={20} />
        <Text style={styles.viewTxt}>{text}</Text>
      </View>
    );
  };

  const handleCancel = async (data: any) => {
    setIsLoading(true);
    const params = {
      id: paraseToObject?.id,
    };
    setUpdating(true);
    try {
      const res = await cancelAppointment(params.id);
      setIsLoading(false);
      if (res?.status === 200) {
        Alert.alert("Hủy lịch hẹn thành công");
        setUpdating(false);
        eventEmitter.emit("reload_list_appointment");
        router.navigate("/(tabs)/messenger");
      } else {
        Alert.alert("Hủy lịch hẹn thất bại");
      }
    } catch (e) {
      setIsLoading(false);
      setUpdating(false);
    }
  };

  const handleAccept = async (data: any) => {
    setIsLoading(true);
    setUpdating(true);
    const params = {
      id: paraseToObject?.id,
      price: paraseToObject?.price,
    };
    try {
      let res = null;
      if (paraseToObject?.status === "NEW")
        res = await acceptAppointment(paraseToObject?.id);
      else if (paraseToObject?.status === "PROCESSING")
        res = await completedAppointment(paraseToObject?.id);
      setIsLoading(false);
      if (res?.status === 200) {
        Alert.alert("Chấp nhận lịch hẹn thành công");
        setUpdating(false);
        eventEmitter.emit("reload_list_appointment");
        router.navigate("/(tabs)/messenger");
      } else {
        Alert.alert("Nhận lịch thất bại");
      }
    } catch (e) {
      setUpdating(false);
    }
  };

  const handleConfirmed = async (data: any) => {
    const res = await processingAppointment(paraseToObject?.id, {
      price: data.price,
      vehicleHandoverTime: new Date().toISOString(),
    });
    setIsLoading(false);
    if (res?.status === 200) {
      Alert.alert("Chấp nhận lịch hẹn thành công");
      setUpdating(false);
      eventEmitter.emit("reload_list_appointment");
      router.navigate("/(tabs)/messenger");
    } else {
      Alert.alert("Nhận lịch thất bại");
    }
  };

  const handleCompelete = async (data: any) => {
    const res = await completedAppointment(paraseToObject?.id);
    if (res?.status === 200) {
      Alert.alert("Thanh toán thành công");
      setUpdating(false);
      setOpenModal(false);
      eventEmitter.emit("reload_list_appointment");
      router.navigate("/(tabs)/messenger");
    } else {
      Alert.alert("Thanh toán thất bại");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [payemnt, setPayment] = useState(false);

  const handlePayment = async () => {
    const params = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: paraseToObject?.price,
      description: "Thanh toán dịch vụ",
      items: [
        {
          name: paraseToObject?.mechanic?.garage?.name,
          quantity: 1,
          price: paraseToObject?.price,
        },
      ],
      cancelUrl: "https://your-domain.com",
      returnUrl: "https://your-domain.com",
    };

    try {
      const res = await createPayment(params);
      setPayment(res.data);
      setOpenModal(!openModal);
    } catch {
      console.error();
    }
  };

  return (
    <SafeAreaView style={CS.safeAreaView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: Color.white }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ marginHorizontal: 18, gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.viewBack}>
              <TouchableOpacity
                style={styles.viewBtnBack}
                onPress={() => router.push("/(tabs)/home")}
              >
                <Icon
                  name="arrow-left"
                  type={IconType.Feather}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image source={require("@/assets/images/imgApoint/newImg.png")} />
              <Text style={styles.viewTxtHead}>{renderStatusText()}</Text>
            </View>
            <View></View>
          </View>
          <View style={styles.viewBtn}>
            <View style={styles.viewHead}>
              <Text style={styles.txtHead}>
                {paraseToObject?.formattedAppointmentDate}
              </Text>
              <View style={styles.viewLeft}>
                <Icon
                  name="zap"
                  type={IconType.Feather}
                  color={Color.iconBlack}
                />
                <Text
                  style={[
                    styles.txtHead,
                    { color: paraseToObject?.type === "SOS" ? "red" : "black" },
                  ]}
                >
                  {paraseToObject?.type}
                </Text>
              </View>
            </View>
            <IconText
              nameIcon="speaker"
              text={`${paraseToObject?.driver?.moto?.bodyStyle} ${paraseToObject?.driver?.moto?.licensePlate}`}
            />
            <IconText nameIcon="users" text={paraseToObject?.driver?.name} />
            <IconText
              nameIcon="map-pin"
              text={
                paraseToObject?.type === "SOS"
                  ? paraseToObject?.address
                  : paraseToObject?.mechanic?.garage?.address
              }
            />
            <IconText
              nameIcon="trello"
              text={paraseToObject?.mechanic?.garage?.name}
            />
          </View>
          <View style={styles.viewDes}>
            <Text style={styles.viewTxtTitle}>Tình trạng xe</Text>
            <View style={styles.viewMoto}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 10 }}
                source={
                  (userMedia?.imageUrl || "").trim().length > 0
                    ? { uri: userMedia?.imageUrl }
                    : require("@/assets/images/motocycle/motorcycle.png")
                }
              />
              <Text style={styles.txtMoto}>
                {paraseToObject?.driver?.moto?.licensePlate}
              </Text>
            </View>
            <View style={styles.viewDesMore}>
              <Text style={styles.txtDesMore}>
                {paraseToObject?.motorbikeSpareParts}
              </Text>
              <Text style={styles.txtDesMore}>
                {paraseToObject?.description}
              </Text>
            </View>
          </View>

          <View>
            {paraseToObject?.status == "CONFIRMED" ? (
              <InputHook
                setFocus={setFocus}
                name="price"
                customStyle={CS.flex1}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                  placeholder: "Nhập giá sửa xe",
                }}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ô nhập không được để trống",
                  },
                }}
                errorTxt={errors.price?.message}
                maxLength={32}
                label="Báo giá sửa xe"
              />
            ) : null}
          </View>

          <View>
            {paraseToObject?.status == "PROCESSING" ? (
              <View>
                <View style={{ gap: 10 }}>
                  <Text style={styles.viewTxtPrice}>
                    Số tiền cần thanh toán:
                  </Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.txtPrice}>
                      {paraseToObject?.price} VND
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          <View>
            {paraseToObject?.status == "COMPLETED" ? (
              <View>
                <View style={{ gap: 10 }}>
                  <Text style={styles.viewTxtPrice}>Đã thanh toán:</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.txtPrice}>
                      {paraseToObject?.price} VND
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ height: 100 }}></View>
        <PaymentModal
          data={payemnt}
          open={openModal}
          onClose={() => setOpenModal(false)}
          updateStatus={handleCompelete}
          _id={paraseToObject?.id}
        />
      </ScrollView>
      {userData?.roleName === "ROLE_MECHANIC" &&
        paraseToObject?.status !== "COMPLETED" && (
          <View style={styles.viewStyleBtn}>
            <View style={styles.btn}>
              <Button onPress={handleCancel} text="Hủy" />
            </View>
            {paraseToObject?.status === "CONFIRMED" ? (
              <View style={styles.btn}>
                <Button
                  onPress={handleSubmit(handleConfirmed)}
                  text="Chấp nhận"
                />
              </View>
            ) : paraseToObject?.status === "PROCESSING" ? (
              <View style={styles.btn}>
                <Button onPress={handlePayment} text="Thanh toán" />
              </View>
            ) : (
              <View style={styles.btn}>
                <Button onPress={handleAccept} text="Chấp nhận" />
              </View>
            )}
          </View>
        )}

      {userData?.roleName === "ROLE_USER" && (
        <View style={styles.viewStyleBtn1}>
          <View style={styles.btn1}>
            <Button onPress={handleCancel} text="Hủy" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewMoreAppointment;

const styles = StyleSheet.create({
  viewTxtHead: {
    ...CS.hnBold,
    fontSize: 24,
    color: Color.blue,
  },
  viewBtn: {
    height: 180,
    backgroundColor: Color.blueBorder,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.blueBorder,
    paddingHorizontal: 18,
    gap: 10,
  },
  viewHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  viewLeft: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtHead: {
    ...CS.hnBold,
    fontSize: 19,
    color: Color.iconBlack,
  },
  txtDes: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.gold,
  },
  viewTextIcon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  viewTxt: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.text,
  },
  viewDes: { gap: 15 },
  viewTxtTitle: {
    ...CS.hnBold,
    fontSize: 24,
    color: Color.text,
  },
  viewTxtPrice: {
    ...CS.hnBold,
    fontSize: 24,
    color: Color.red,
  },
  txtPrice: {
    ...CS.hnSemiBold,
    fontSize: 20,
    color: Color.red,
  },
  viewStyleBtn: {
    flexDirection: "row",
    gap: 10,
    height: 50,
    marginHorizontal: 32,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  viewMoto: {
    height: 80,
    marginHorizontal: 54,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtMoto: {
    ...CS.hnBold,
    fontSize: 18,
    color: Color.primary,
  },
  viewBack: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewBtnBack: {
    height: 40,
    width: 40,
    backgroundColor: Color.white7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  viewDesMore: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtDesMore: {
    ...CS.hnSemiBold,
    fontSize: 18,
    color: Color.textInput,
  },
  btn: {
    width: "50%",
  },
  btn1: {
    width: "auto",
  },
  viewStyleBtn1: {
    marginHorizontal: 72,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  responsiveImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
});
