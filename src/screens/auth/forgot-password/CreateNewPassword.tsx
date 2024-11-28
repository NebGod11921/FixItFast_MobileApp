import { createNewPass } from "@/src/configs/services/api/user.api";
import {
  closeSuperModal,
  EnumModalContentType,
  EnumStyleModalType,
  showSuperModal,
  showToast,
} from "@/src/helpers/super.modal.helpers";
import { ICreateNewPass, ILogin } from "@/src/models";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

const CreateNewPassword = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const { otp } = useLocalSearchParams<{ otp: string }>();
  const verifyCodeRef = useRef<string>(otp || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Verify Code:", verifyCodeRef.current);
  }, []);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmedPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    showSuperModal({
      contentModalType: EnumModalContentType.Loading,
      styleModalType: EnumStyleModalType.Middle,
    });
    const params: ICreateNewPass = {
      otp: verifyCodeRef.current,
      newPassword: data.newPassword,
      confirmedPassword: data.confirmedPassword,
    };
    try {
      const res = await createNewPass(params);
      closeSuperModal();
      setIsLoading(false);
      if (!res.isError) {
        router.navigate("/(routes)/loginRoute");
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
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <Image source={require("@/assets/images/logo/logoApp.png")} />
          <Text style={styles.txtTitle}>Tạo mật khẩu mới</Text>
        </View>

        <View>
          {/* new pass input */}
          <InputHook
            name="newPassword"
            customStyle={{ flex: 1 }}
            inputProps={{
              type: "text",
              defaultValue: "",
              placeholder: "Mật khẩu mới",
            }}
            control={control}
            rules={{
              required: true,
              pattern: {
                // value: passRegex,
                message: "Mật khẩu gồm ít nhất 8 kí tự",
              },
            }}
            isPassword={!showPass}
            errorTxt={errors.newPassword?.message}
            label="Tạo mật khẩu mới"
          />

          {/* renew pass input */}
          <InputHook
            name="confirmedPassword"
            customStyle={{ flex: 1 }}
            inputProps={{
              type: "text",
              defaultValue: "",
              placeholder: "Xác nhận mật khẩu mới",
            }}
            control={control}
            rules={{
              required: true,
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "Mật khẩu mới không trùng khớp";
                }
              },
            }}
            isPassword={!showPass}
            errorTxt={errors.confirmedPassword?.message}
            label="Xác nhận mật khẩu mới"
          />
        </View>
        <View style={styles.paddingButton}>
          <Button
            onPress={handleSubmit(onSubmit)}
            textColor={Color.white}
            backgroundColor={Color.primary}
            disabled={isLoading}
            text="Cập nhật mật khẩu"
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

export default CreateNewPassword;

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
