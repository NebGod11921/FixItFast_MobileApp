import { requestMechanic } from "@/src/configs/services/api/user.api";
import useStore from "@/src/configs/services/store/store";
import { phoneRegex, regexEmail } from "@/src/constants/regex.constant";
import { showToast } from "@/src/helpers/super.modal.helpers";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import Header from "@/src/shared/header/Header";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const BecomMechanicScreen = () => {
  const router = useRouter();
  const userData = useStore((store) => store.userData);
  const setUserData = useStore((state) => state.setUserData);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    },
  });

  const onSubmit = (data: any) => {
    const params = {
      id: userData?.id,
    };
    requestMechanic(params).then((res) => {
      if (!res.isError) {
        showToast({ type: "success", message: "Gửi yêu cầu thành công" });
        setUserData({
          ...userData,
        });
        router.back();
      } else {
        showToast({
          type: "error",
          message: "Hệ  thống xảy ra lỗi. Vui lòng thử lại sau!",
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : undefined}
      style={CS.flex1}
    >
      <SafeAreaView style={CS.flex1}>
        <Header onPressLeft={() => router.back()} text="Đăng ký Mechanic" />
        <ScrollView style={[CS.flex1]} showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: ScreenWidth / 10,
              alignSelf: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "700",
                color: Color.text,
                paddingVertical: 10,
              }}
            >
              Đăng ký trở thành Mechanic
            </Text>
            <Text
              style={{
                color: Color.text,
                paddingVertical: 16,
                fontSize: 18,
              }}
            >
              Hãy điền thông tin của bạn bên dưới và sẽ có bộ phận hỗ trợ liên
              hệ với bạn để tư vấn thêm về những đặc quyền khi bạn trở thành
              Mechanic.
            </Text>
          </View>
          <View style={{ gap: 10 }}>
            <InputHook
              setFocus={setFocus}
              name="name"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập tên của bạn",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.name?.message}
              maxLength={32}
              label="Họ và Tên"
            />

            <InputHook
              name="phone"
              customStyle={{ flex: 1 }}
              inputProps={{
                type: "number",
                defaultValue: "",
                placeholder: "Nhập số điện thoại",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Số điện thoại không phù hợp",
                },
              }}
              errorTxt={errors.phone?.message}
              label="Số điện thoại"
            />
            <InputHook
              setFocus={setFocus}
              name="address"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập địa chỉ",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.address?.message}
              label="Địa chỉ liên hệ"
            />
            <View style={{ height: 100 }} />
          </View>
          <Button
            style={{
              width: ScreenWidth * 0.9,
              alignSelf: "center",
              marginTop: ScreenWidth / 6,
            }}
            text="Đăng ký ngay"
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BecomMechanicScreen;

const styles = StyleSheet.create({});
