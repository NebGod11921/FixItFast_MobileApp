import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./profile.screen.style";
import { Color } from "@/src/themes/app.colors";
import Avatar from "@/src/shared/avatar/Avatar";
import Button from "@/src/shared/button/Button";
import { useRouter } from "expo-router";
import { useUserHook } from "@/src/hooks/useUserHook";
import useStore from "@/src/configs/services/store/store";
import Header from "@/src/shared/header/Header";
import MotoInfo from "@/src/components/info-moto/MotoInfo";
import { CS } from "@/src/styles/cs.style";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { deleleMoto } from "@/src/configs/services/api/moto.api";
import { showToast } from "@/src/helpers/super.modal.helpers";
import InfoGarage from "@/src/components/info-Garage/InfoGarage";
import { getCurrentUser } from "@/src/configs/services/api/user.api";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen() {
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const userMedia = useStore((state) => state.userMedia);
  const setUserData = useStore((store) => store.setUserData);
  const setUserInfo = useStore((store) => store.setUserInfo);
  const [updating, setUpdating] = useState(false);

  const isFocused = useIsFocused();

  const { logout } = useUserHook();

  const handleDeleteMoto = (data: any) => {
    if (!userData?.id) return;
    const params = {
      id: userData?.id,
    };
    setUpdating(true);
    deleleMoto(params).then((res) => {
      setUpdating(false);
      if (!res.isError) {
        setUserData({
          ...userData,
          moto: undefined,
        });
        showToast({
          type: "success",
          message: "Xóa thông tin xe thành công!",
        });
      } else {
        showToast({
          type: "error",
          message: "Hệ thống xảy ra lỗi. Vui lòng thử lại sau!",
        });
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      getCurrentUser().then((res) => {
        if (!res.isError) {
          setUserData(res?.data?.data);
          setUserInfo(res?.data?.data);
        }
      });
    }
  },[isFocused]);

  return (
    <SafeAreaView style={CS.safeAreaView}>
      <Header
        hideBackBtn
        text="Thông tin cá nhân"
        customStyle={{ backgroundColor: Color.transparent }}
      />
      <View style={styles.container}>
        <View style={styles.info}>
          <Avatar
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
            }}
            sourceUri={
              (userMedia?.imageUrl || "").trim().length > 0
                ? { uri: userMedia?.imageUrl }
                : require("@/assets/images/default_avatar.jpg")
            }
          />
          <View style={styles.viewinfo}>
            <Text numberOfLines={1} style={styles.txtName}>
              {userData?.name}
            </Text>
            <Text style={styles.txtPhone}>{userData?.phone}</Text>
            <Text
              style={styles.txtEdit}
              onPress={() => router.push("/(routes)/editProfileRoute")}
            >
              Chỉnh sửa thông tin
            </Text>
          </View>
        </View>
        {userData?.roleName === "ROLE_USER" && (
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.navigate("/(routes)/becomMechanicRoute")}
          >
            <Text
              style={{
                fontSize: 20,
                color: Color.btnRedPrimary,
                fontWeight: "600",
                marginTop: 5,
              }}
            >
              Đăng ký trở thành mechanic
            </Text>
          </TouchableOpacity>
        )}

        {userData?.roleName === "ROLE_MECHANIC" &&
          (userData?.garage ? (
            <TouchableOpacity
              onPress={() => router.navigate("/(routes)/viewMechanicRoute")}
            >
              <InfoGarage garage={userData?.garage} />
            </TouchableOpacity>
          ) : (
            <View style={styles.viewBtnAdd1}>
            <TouchableOpacity
              style={styles.viewIconAdd1}
              onPress={() => router.push("/(routes)/addInfoMechanicRoute")}
            >
              <Icon
                name="plus"
                type={IconType.Feather}
                size={40}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: Color.btnRedPrimary,
                fontWeight: "600",
              }}
            >
              Thêm thông tin mechanic
            </Text>
          </View>
          ))}

        {userData?.moto ? (
          <MotoInfo moto={userData?.moto} handleDelete={handleDeleteMoto} />
        ) : (
          <View style={styles.viewBtnAdd}>
            <TouchableOpacity
              style={styles.viewIconAdd}
              onPress={() => router.push("/(routes)/addInfoMotoRoute")}
            >
              <Icon
                name="plus"
                type={IconType.Feather}
                size={70}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: Color.btnRedPrimary,
                fontWeight: "600",
                marginTop: 5,
              }}
            >
              Thêm thông tin xe của bạn
            </Text>
          </View>
        )}
      </View>
      <View style={styles.btnDeleteUser}>
        <Button
          onPress={logout}
          text="Đăng xuất"
          backgroundColor={Color.primary}
        />
      </View>
    </SafeAreaView>
  );
}
