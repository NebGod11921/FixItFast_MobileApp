import { verifyCode } from "@/src/configs/services/api/user.api";
import {
  closeSuperModal,
  EnumModalContentType,
  EnumStyleModalType,
  showSuperModal,
  showToast,
} from "@/src/helpers/super.modal.helpers";
import { useUserHook } from "@/src/hooks/useUserHook";
import { IVerifyCode } from "@/src/models";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-screen-helper";

const VerifyCodeRegis = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const emailRef = useRef<string>(email || "");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    showSuperModal({
      contentModalType: EnumModalContentType.Loading,
      styleModalType: EnumStyleModalType.Middle,
    });
    const params: IVerifyCode = {
      email: emailRef.current,
      otp: data.otp,
      type: "REGISTER",
    };
    try {
      const res = await verifyCode(params);
      closeSuperModal();
      setIsLoading(false);
      if (!res.isError) {
        router.navigate("/(routes)/loginRoute");
        // setIsLoading(false);
      } else {
        showToast({
          type: "error",
          message: res.message || "Mã OTP không hợp lệ, vui lòng thử lại.",
        });
      }
    } catch (error) {
      closeSuperModal();
      setIsLoading(false);
      showToast({
        type: "error",
        message: "Đã xảy ra lỗi, vui lòng thử lại.",
      });
      console.error("OTP Verification Error: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <Image source={require("@/assets/images/logo/logoApp.png")} />
          <Text style={styles.txtTitle}>Nhập mã xác thực</Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          {/* code input */}
          <InputHook
            name="otp"
            customStyle={{ flex: 1 }}
            inputProps={{
              type: "text",
              defaultValue: "",
              placeholder: "Nhập mã xác thực",
            }}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Ô nhập không được để trống",
              },
            }}
            label="Nhập mã xác thực đã được gửi về email của bạn"
            errorTxt={errors.otp?.message}
          />
        </View>
        <View style={styles.paddingButton}>
          <Button
            onPress={handleSubmit(onSubmit)}
            textColor={Color.white}
            backgroundColor={Color.primary}
            disabled={isLoading}
            text="Tiếp tục"
          />
        </View>
        {isLoading && <ActivityIndicator size="large" color={Color.primary} />}
        <View style={styles.viewTxt}>
          <Text style={styles.styleTxt}>
            Với việc sử dụng dịch vụ của chúng tôi, bạn đã đồng ý với
            <Text
              style={styles.TxtBold}
            >{` Điều khoản & Chính sách bảo mật`}</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyCodeRegis;

const styles = StyleSheet.create({
  container: {
    ...CS.container,
    justifyContent: "space-evenly",
    paddingTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
    marginHorizontal: 18,
  },
  viewLogo: {
    alignItems: "center",
  },
  txtTitle: {
    ...CS.hnBold,
    marginTop: 20,
    fontSize: 24,
    color: Color.primary,
  },
  viewTxt: {
    paddingHorizontal: 16,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  styleTxt: {
    ...CS.hnMedium,
    fontSize: 14,
    textAlign: "center",
  },
  TxtBold: {
    ...CS.hnBold,
    fontSize: 14,
    color: Color.primary,
  },
  paddingButton: {
    marginHorizontal: 16,
  },
  textHeader: {
    ...CS.hnSemiBold,
    fontSize: 24,
    color: Color.mainColor2,
    textAlign: "center",
  },
  styleTextInput: {
    borderWidth: 1,
    borderColor: Color.grey,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
});
