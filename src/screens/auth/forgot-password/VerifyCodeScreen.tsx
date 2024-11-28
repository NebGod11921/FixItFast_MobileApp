import InputHook from "@/src/shared/form/InputHook";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "@/src/shared/button/Button";
import { Color } from "@/src/themes/app.colors";
import { useForm } from "react-hook-form";
import { CS } from "@/src/styles/cs.style";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-screen-helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  closeSuperModal,
  EnumModalContentType,
  EnumStyleModalType,
  showSuperModal,
  showToast,
} from "@/src/helpers/super.modal.helpers";
import { IVerifyCode } from "@/src/models";
import { verifyCode } from "@/src/configs/services/api/user.api";

const VerifyCodeScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useLocalSearchParams<{ email: string }>();
  const emailRef = useRef<string>(email || "");

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
      type: "RESET",
    };
    try {
      const res = await verifyCode(params);
      closeSuperModal();
      setIsLoading(false);
      if (!res.isError) {
        router.push({
          pathname: "/(routes)/createNewPasswordRoute",
          params: {
            otp: data.otp,
            email: emailRef.current,
            type: data.type,
          },
        });
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

        <View>
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

export default VerifyCodeScreen;

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
});
