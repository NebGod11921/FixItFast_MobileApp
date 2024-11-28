import React from "react";
import { useRouter } from "expo-router";

import eventEmitter from "../helpers/eventEmitter";
import useStore from "../configs/services/store/store";
import { _getJson, _setJson, USER_TOKEN } from "../local-storage";
import { TypedUser } from "../models";
import { showToast } from "../helpers/super.modal.helpers";
import { Text, TouchableOpacity, View } from "react-native";
import { Color } from "../themes/app.colors";
import { CS } from "../styles/cs.style";
import { getCurrentUser } from "../configs/services/api/user.api";

export const useUserHook = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const setUserInfo = useStore((state) => state.setUserInfo);

  const isLoggedIn = React.useCallback(() => {
    return _getJson(USER_TOKEN) && !!userData?.id;
  }, [userData]);

  const handleLogin = (token: string) => {
    console.log("Token :", token);

    _setJson(USER_TOKEN, token);

    _setJson("is_still_login", "true");

    getCurrentUser().then((res) => {
      if (!res.isError) {
        initData(res.data.data, true);
        console.log("Get Info User: ", res.data.data);
        eventEmitter.emit("reload_list_post");
        router.push("/(tabs)/home");
        showToast({
          type: "success",
          message: "Đăng nhập thành công",
        });
      }
    });
  };

  const getUserData = (initUserData = true) => {
    getCurrentUser().then((res) => {
      if (!res.isError) {
        initData(res.data, initUserData);
      }
    });
  };

  const initData = (data: TypedUser, initUserData: boolean) => {
    initUserData && setUserData(data);
    setUserInfo(data);
  };

  const logout = () => {
    showToast({
      type: "success",
      message: "Đăng xuất thành công",
    });
    _setJson(USER_TOKEN, "");
    setUserData(null);
    setUserInfo(null);
    router.navigate("/(routes)/onBoardingRoute");
    eventEmitter.emit("reload_list_post");
  };

  const renderViewRequestLogin = () => {
    if (isLoggedIn()) return null;
    return (
      <View
        style={{
          alignItems: "center",
          padding: 20,
          backgroundColor: Color.white,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            ...CS.hnRegular,
            fontSize: 20,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Bạn cần phải đăng nhập để sử dụng chức năng này
        </Text>
        <TouchableOpacity
          style={CS.btnActive}
          onPress={() => {
            router.navigate("/(routes)/loginRoute");
          }}
        >
          <Text style={CS.txtBtnActive}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return {
    handleLogin,
    getUserData,
    isLoggedIn,
    logout,
    renderViewRequestLogin,
  };
};
