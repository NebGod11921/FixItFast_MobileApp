import { updateProfile } from "@/src/configs/services/api/user.api";
import useStore from "@/src/configs/services/store/store";
import { phoneRegex, regexEmail } from "@/src/constants/regex.constant";
import { showToast } from "@/src/helpers/super.modal.helpers";
import Button from "@/src/shared/button/Button";
import InputHook from "@/src/shared/form/InputHook";
import Header from "@/src/shared/header/Header";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

const EditProfile = () => {
  const router = useRouter();
  const userData = useStore((store) => store.userData);
  const setUserData = useStore((store) => store.setUserData);
  const [updating, setUpdating] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    },
  });

  const onSubmit = (data: any) => {
    const params = {
      id: userData?.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    setUpdating(true);
    updateProfile(params).then((res) => {      
      if (!res.isError) {
        showToast({ type: "success", message: "Cập nhật thành công" });
        setUpdating(false);
        setUserData({
          ...userData,
          id: userData?.id,
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
        });
        router.back();
      } else {
        showToast({
          type: "error",
          message: "Hệ thống xảy ra lỗi. Vui lòng thử lại sau!",
        });
        setUpdating(false);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : undefined}
      style={CS.flex1}
    >
      <SafeAreaView style={CS.safeAreaView}>
        <Header onPressLeft={() => router.back()} text="Chỉnh sửa thông tin" />
        <View
        style={{
          flex: 1,
          backgroundColor: Color.white,
        }}
        >
          <InputHook
            setFocus={setFocus}
            name="name"
            customStyle={CS.flex1}
            inputProps={{
              type: "text",
              defaultValue: "",
              placeholder: "Họ và tên",
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
            showPlaceholder
          />

          <InputHook
            setFocus={setFocus}
            name="email"
            customStyle={CS.flex1}
            inputProps={{
              type: "email",
              defaultValue: "",
              placeholder: "Email",
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
            showPlaceholder
          />

          <InputHook
            setFocus={setFocus}
            name="phone"
            customStyle={CS.flex1}
            inputProps={{
              type: "number",
              defaultValue: "",
              placeholder: "Số điện thoại",
            }}
            control={control}
            rules={{
              pattern: {
                value: phoneRegex,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            errorTxt={errors.phone?.message}
            showPlaceholder
          />

          <InputHook
            setFocus={setFocus}
            name="address"
            customStyle={CS.flex1}
            inputProps={{
              type: "text",
              defaultValue: "",
              placeholder: "Địa chỉ",
            }}
            control={control}
            rules={{}}
            showPlaceholder
          />
          <View style={{ height: 100 }} />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            padding: 16,
            backgroundColor: Color.white,
            ...CS.borderTopStyle,
          }}
        >
          <Button
            style={{
              backgroundColor: updating ? Color.placeholder : Color.primary,
              marginBottom: 16,
            }}
            text="Lưu hồ sơ"
            disabled={updating}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;