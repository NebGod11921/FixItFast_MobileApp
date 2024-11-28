import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import Button from "@/src/shared/button/Button";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-screen-helper";
import InputHook from "@/src/shared/form/InputHook";
import { useForm } from "react-hook-form";
import { ISignUp } from "@/src/models";
import { signUp } from "@/src/configs/services/api/user.api";
import {
  closeSuperModal,
  EnumModalContentType,
  EnumStyleModalType,
  showSuperModal,
  showToast,
} from "@/src/helpers/super.modal.helpers";
import { regexEmail } from "@/src/constants/regex.constant";

const RegistrationScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [usePhoneRegex, setUsePhoneRegex] = useState(false);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  React.useEffect(() => {
    const value = watch("phone") || " ";
    const isPhoneValue = !Number(value);
    if (isPhoneValue != usePhoneRegex) {
      setUsePhoneRegex((old) => !old);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("phone")]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    showSuperModal({
      contentModalType: EnumModalContentType.Loading,
      styleModalType: EnumStyleModalType.Middle,
    });
    const params: ISignUp = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "ROLE_USER",
    };
    try {
      const res = await signUp(params);
      closeSuperModal();
      if (!res.isError) {
        const user_token = res.data.data.accessToken;
        router.navigate({
          pathname: "/(routes)/verifyCodeRegisRoute",
          params: { email: data.email },
        });
        // setIsLoading(false);
      } else {
        showToast({
          type: "error",
          ...res,
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
      <SafeAreaView style={CS.flex1}>
        <ScrollView showsVerticalScrollIndicator={false} style={[CS.flex1]}>
          <View style={styles.container}>
            <View style={styles.viewLogo}>
              <Image source={require("@/assets/images/logo/logoApp.png")} />
              <Text style={styles.txtTitle}>Đăng ký tài khoản</Text>
            </View>
            <View style={{ gap: 10 }}>
              {/* phone input */}
              <InputHook
                name="email"
                customStyle={CS.flex1}
                inputProps={{
                  type: "email",
                  defaultValue: "",
                  placeholder: "Nhập email",
                }}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ô nhập không được để trống",
                  },
                  pattern: {
                    value: regexEmail,
                    message: "Email không hợp lệ",
                  },
                }}
                errorTxt={errors.email?.message}
                label="Email"
              />
              <InputHook
                name="phone"
                customStyle={{}}
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
                label="Số điện thoại"
                errorTxt={errors.phone?.message}
              />
              <InputHook
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
                label="Họ và tên"
              />
              {/* Input password */}
              <InputHook
                name="password"
                customStyle={{}}
                inputProps={{
                  type: "password",
                  defaultValue: "",
                  placeholder: "Nhập mật khẩu",
                }}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhập lại mật khẩu",
                  },
                }}
                isPassword={!showPass}
                label="Mật khẩu"
                errorTxt={errors.password?.message}
              />
              {/* Input repassword */}
              <InputHook
                name="confirmPassword"
                customStyle={{}}
                inputProps={{
                  type: "password",
                  defaultValue: "",
                  placeholder: "Nhập lại mật khẩu",
                }}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Mật khẩu chưa khớp",
                  },
                }}
                isPassword={!showPass}
                label="Xác nhận mật khẩu"
                errorTxt={errors.password?.message}
              />
            </View>

            <View style={styles.paddingButton}>
              <Button
                onPress={handleSubmit(onSubmit)}
                textColor={Color.white}
                backgroundColor={Color.primary}
                disabled={isLoading}
                text="Đăng Ký"
              />
            </View>
            {isLoading && (
              <ActivityIndicator size="large" color={Color.primary} />
            )}
            <View style={styles.viewTxt}>
              <Text style={styles.styleTxt}>
                Với việc sử dụng dịch vụ của chúng tôi, bạn đã đồng ý với
                <Text
                  style={styles.TxtBold}
                >{` Điều khoản & Chính sách bảo mật`}</Text>
              </Text>
            </View>
            <Text style={styles.textRegister}>
              Bạn đã có tài khoản?
              <Text
                style={[
                  CS.hnMedium,
                  {
                    color: Color.primary,
                    fontSize: 16,
                  },
                ]}
                onPress={() => router.navigate("/(routes)/loginRoute")}
              >
                {` Đăng nhập`}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    ...CS.flex1,
    justifyContent: "space-between",
    paddingTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
    paddingBottom: 10,
    marginHorizontal: 14,
    gap: 20,
  },
  viewLogo: {
    alignItems: "center",
  },
  textRegister: {
    ...CS.hnMedium,
    color: Color.mainColor2,
    textAlign: "center",
    marginTop: 16,
  },
  paddingButton: {
    paddingHorizontal: 20,
  },
  txtForgotPass: {
    ...CS.hnBold,
    color: Color.primary,
    marginTop: 12,
  },
  txtForgotPass1: {
    ...CS.hnSemiBold,
    color: Color.text,
    marginTop: 10,
  },
  viewIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
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
  txtTitle: {
    ...CS.hnBold,
    fontSize: 24,
    color: Color.primary,
    marginTop: 16,
    textAlign: "center",
  },
  inputGroup: {
    padding: 5,
    gap: 5,
  },
  txtGroup: {
    ...CS.hnSemiBold,
    fontSize: 20,
  },
  input: {
    borderColor: Color.blue,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
