// // stack -> screenAuth + tab screen + screenTabBar ( StackScrenn)  - nested navigator screen

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import { useForm } from "react-hook-form";
import { ILogin } from "@/src/models";
import { loginWithPass } from "@/src/configs/services/api/user.api";
import { useUserHook } from "@/src/hooks/useUserHook";
import {
  closeSuperModal,
  EnumModalContentType,
  EnumStyleModalType,
  showSuperModal,
  showToast,
} from "@/src/helpers/super.modal.helpers";

const LoginScreen = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const { handleLogin } = useUserHook();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "mechanic-super@gmail.com",
      password: "Pass@1234",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true); 
    showSuperModal({
      contentModalType: EnumModalContentType.Loading,
      styleModalType: EnumStyleModalType.Middle,
    });
  
    const params: ILogin = {
      username: data.username,
      password: data.password,
      deviceToken: "iphone",
    };
  
    try {
      const res = await loginWithPass(params);
      closeSuperModal();  
      if (!res.isError) {
        const user_token = res.data.data.accessToken;
        handleLogin(user_token);
        setIsLoading(false); 
      } else {
        showToast({
          type: "error",
          ...res,
        });
      }
    } catch (error) {
      closeSuperModal();
      setIsLoading(false); 
      showToast({ type: "error", message: "Đã xảy ra lỗi, vui lòng thử lại." });
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
          <Text style={styles.txtTitle}>Đăng nhập tài khoản</Text>
        </View>

        <View style={{ gap: 20 }}>
          {/* phone input */}
          <InputHook
            name="username"
            customStyle={{ flex: 1 }}
            inputProps={{
              type: "number",
              defaultValue: "",
              placeholder: "Nhập email hoặc số điện thoại",
            }}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Số điện thoại không phù hợp",
              },
            }}
            errorTxt={errors.username?.message}
            label="Email hoặc số điện thoại"
          />
          {/* password input */}
          <InputHook
            name="password"
            customStyle={{}}
            inputProps={{
              type: "password",
              defaultValue: "",
              placeholder: "Nhập mật khẩu của bạn",
            }}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Vui lòng nhập lại mật khẩu",
              },
            }}
            isPassword={!showPass}
            errorTxt={errors.password?.message}
            label="Mật khẩu"
          />
          <View style={{ alignItems: "flex-end", paddingHorizontal: 20 }}>
            <Text
              onPress={() => router.navigate("/(routes)/resetPasswordRoute")}
              style={styles.txtForgotPass}
            >
              Quên mật khẩu?
            </Text>
          </View>
        </View>

        <View style={styles.paddingButton}>
          <Button
            onPress={handleSubmit(onSubmit)}
            textColor={Color.white}
            backgroundColor={Color.primary}
            disabled={isLoading}
            text={"Đăng nhập"}
          />
        </View>
        {isLoading && <ActivityIndicator size="large" color={Color.primary} />}
        <Text style={styles.textRegister}>
          Chưa có tài khoản?
          <Text
            style={[
              CS.hnMedium,
              {
                color: Color.primary,
                fontSize: 16,
              },
            ]}
            onPress={() => router.navigate("/(routes)/registrationRoute")}
          >
            {` Đăng ký`}
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
