import { createNewAppointment } from "@/src/configs/services/api/appointment.api";
import useStore from "@/src/configs/services/store/store";
import eventEmitter from "@/src/helpers/eventEmitter";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import Header from "@/src/shared/header/Header";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { useRouter } from "expo-router";
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
  ActivityIndicator,
} from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import DatePickerExample from "@/src/shared/form/date.time.picker";

const CreateNewAppointmentScreen = () => {
  const router = useRouter();
  const userData = useStore((store) => store.userData);
  const userMedia = useStore((state) => state.userMedia);
  const [updating, setUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      motorbikeSpareParts: "",
      description: "",
      type: "",
      appointmentDate: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const params = {
      mechanicId: "1",
      motorbikeSpareParts: data.motorbikeSpareParts,
      description: data.description,
      type: data.type,
      appointmentDate: appointmentDate.toISOString(),
    };
    setUpdating(true);
    try {
      const res = await createNewAppointment(params);
      setIsLoading(false);
      if (res?.status === 200) {
        Alert.alert("Tạo lịch hẹn thành công");
        setUpdating(false);
        eventEmitter.emit("reload_list_appointment");
        router.navigate("/(tabs)/messenger");
      } else {
        Alert.alert("Tạo lịch hẹn thất bại, vui lòng cung cấp thông tin xe");
      }
    } catch (e) {
      setUpdating(false);
    }
  };

  return (
    <SafeAreaView style={CS.safeAreaView}>
      <Header text="Tạo lịch hẹn" />
      <ScrollView style={[CS.flex1]} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.viewHead}>
            <Text style={styles.viewTxtRight}>CHỌN DỊCH VỤ</Text>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewTxtLeft}>Tư vấn thêm</Text>
              <Icon
                name="headphones"
                type={IconType.Feather}
                size={20}
                color={Color.blue}
              />
            </TouchableOpacity>
          </View>
          {userData?.moto ? (
            <View style={styles.viewMoto}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 10 }}
                source={
                  (userMedia?.imageUrl || "").trim().length > 0
                    ? { uri: userMedia?.imageUrl }
                    : require("@/assets/images/motocycle/motorcycle.png")
                }
              />
              <Text style={styles.txtMoto}>{userData?.moto?.licensePlate}</Text>
            </View>
          ) : (
            <View style={{ marginHorizontal: 64, alignItems: "center" }}>
              <Text style={styles.txt}>
                Bạn cần thêm thông tin xe trước để thực hiện dịch vụ này
                <Text
                  style={styles.btnText}
                  onPress={() => router.navigate("/(routes)/addInfoMotoRoute")}
                >{` Go back`}</Text>
              </Text>
            </View>
          )}
          <View style={{ gap: 10 }}>
            <InputHook
              setFocus={setFocus}
              name="motorbikeSpareParts"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập tình trạng xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.motorbikeSpareParts?.message}
              maxLength={32}
              label="Tình trạng xe"
            />
            <InputHook
              setFocus={setFocus}
              name="description"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Mô tả chi tiết tình trạng xe",
              }}
              control={control}
              multiline
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.description?.message}
              label="Mô tả tình trạng"
            />
            <InputHook
              setFocus={setFocus}
              name="type"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: `Bảo dưỡng: "SPA" & thay phụ tùng: "MAINTENANCE"`,
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.type?.message}
              maxLength={32}
              label="Chọn dịch vụ có sẵn"
            />
            <View style={{ marginHorizontal: 16 }}>
              <DatePickerExample
                appointmentDate={appointmentDate}
                onDateChange={(date) => setAppointmentDate(date)}
              />
            </View>
            <View style={{ height: 50 }} />
          </View>
        </View>
        <Button
          style={{
            width: ScreenWidth * 0.7,
            alignSelf: "center",
          }}
          text="Tạo lịch hẹn"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateNewAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  viewHead: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  viewBtn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  viewTxtRight: {
    ...CS.hnBold,
    fontSize: 16,
    color: Color.placeholder2,
  },
  viewTxtLeft: {
    ...CS.hnBold,
    fontSize: 16,
    color: Color.blue,
  },
  txt: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.primary,
    textAlign: "center",
    justifyContent: "center",
  },
  btnText: {
    ...CS.hnBold,
    fontSize: 16,
    color: Color.text,
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
