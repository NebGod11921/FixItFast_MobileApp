import { createMechanic } from "@/src/configs/services/api/moto.api";
import useStore from "@/src/configs/services/store/store";
import eventEmitter from "@/src/helpers/eventEmitter";
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
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AddMechanicInfo = () => {
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
      name: "",
      username: "",
      address: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    const params = {
      name: data.name,
      username: data.username,
      address: data.address,
      description: data.description,
    };
    setUpdating(true);
    createMechanic(params).then((res) => {      
      if (!res.isError) {
        showToast({
          type: "success",
          message: "Tạo thông tin mechanic thành công",
        });
        setUpdating(false);
        setUserData({
          ...userData,
          id: userData?.garage,
        });
        eventEmitter.emit("reload_list_infoMechanic");
        router.back();
      }
    });
    setUpdating(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : undefined}
      style={CS.flex1}
    >
      <SafeAreaView style={CS.safeAreaView}>
        <Header onPressLeft={() => router.back()} text="Thông tin Mechanic" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: Color.white,
          }}
        >
          <View style={{ marginTop: 15, gap: 10 }}>
            <InputHook
              setFocus={setFocus}
              name="name"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập tên mechanic",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.name?.message}
              maxLength={52}
              label="Tên mechanic"
            />
            <InputHook
              setFocus={setFocus}
              name="username"
              customStyle={CS.flex1}
              inputProps={{
                type: "number",
                defaultValue: "",
                placeholder: "Nhập số điện thoại mechanic",
                keyboardType: "numeric",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.username?.message}
              maxLength={52}
              label="Số điện thoại"
            />
            <InputHook
              setFocus={setFocus}
              name="address"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập địa chỉ mechanic",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.address?.message}
              maxLength={52}
              label="Địa chỉ"
            />
            <InputHook
              setFocus={setFocus}
              name="description"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Mô tả chi tiết về mechanic",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              multiline
              errorTxt={errors.description?.message}
              label="Giới thiệu về mechanic"
            />
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
        <View style={styles.viewBtn}>
          <Button
            style={{
              backgroundColor: updating ? Color.placeholder : Color.primary,
              justifyContent: "center",
            }}
            text="Lưu lại"
            disabled={updating}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddMechanicInfo;

const styles = StyleSheet.create({
  viewBtn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
    backgroundColor: Color.white,
    ...CS.borderTopStyle,
  },
});
