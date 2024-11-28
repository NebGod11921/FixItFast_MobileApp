import { createMoto } from "@/src/configs/services/api/moto.api";
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
  View,
} from "react-native";

const AddMotoInfo = () => {
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
      licensePlate: "",
      brand: "",
      color: "",
      bodyStyle: "",
      origin: "",
      machineNumber: "",
      frameNumber: "",
      year: "",
    },
  });

  const onSubmit = (data: any) => {
    const params = {
      licensePlate: data.licensePlate,
      brand: data.brand,
      color: data.color,
      bodyStyle: data.bodyStyle,
      origin: data.origin,
      machineNumber: data.machineNumber,
      frameNumber: data.frameNumber,
      year: data.year,
    };
    setUpdating(true);
    createMoto(params).then((res) => {
      if (!res.isError) {
        showToast({
          type: "success",
          message: "Tạo thông tin xe thành công.",
        });
        setUpdating(false);
        setUserData({
          ...userData,
          moto: params,
        });
        eventEmitter.emit("reload_list_infoMoto");
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
        <Header onPressLeft={() => router.back()} text="Thêm thông tin xe" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: Color.white,
          }}
        >
          {/* <View>{renderSelectImage()}</View> */}
          <View style={{ marginTop: 15 }}>
            <InputHook
              setFocus={setFocus}
              name="licensePlate"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập biển số đăng ký xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.licensePlate?.message}
              maxLength={52}
              label="Biển số đăng ký"
            />
            <InputHook
              setFocus={setFocus}
              name="brand"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập nhãn hiệu xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.brand?.message}
              maxLength={52}
              label="Nhãn hiệu"
            />
            <InputHook
              setFocus={setFocus}
              name="color"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập màu sơn xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.color?.message}
              maxLength={52}
              label="Màu sơn"
            />
            <InputHook
              setFocus={setFocus}
              name="bodyStyle"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập tên loại xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.bodyStyle?.message}
              maxLength={52}
              label="Tên xe"
            />
            <InputHook
              setFocus={setFocus}
              name="origin"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập nơi sản xuất",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.origin?.message}
              maxLength={52}
              label="Nơi sản xuất"
            />
            <InputHook
              setFocus={setFocus}
              name="machineNumber"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập số máy xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.machineNumber?.message}
              maxLength={52}
              label="Số máy"
            />
            <InputHook
              setFocus={setFocus}
              name="frameNumber"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập số khung xe",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.frameNumber?.message}
              maxLength={52}
              label="Số khung"
            />
            <InputHook
              setFocus={setFocus}
              name="year"
              customStyle={CS.flex1}
              inputProps={{
                type: "text",
                defaultValue: "",
                placeholder: "Nhập năm sản xuất",
              }}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ô nhập không được để trống",
                },
              }}
              errorTxt={errors.year?.message}
              maxLength={52}
              label="Năm sản xuất"
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

export default AddMotoInfo;

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
