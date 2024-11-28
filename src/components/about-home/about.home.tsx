import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./about.home.style";
import OptionsHome from "./btn-Options/options.home";
import { useRouter } from "expo-router";
import useStore from "@/src/configs/services/store/store";
import MechanicScreenHome from "./option-Mechanic/MechanicScreenHome";
import { isAndroid } from "@freakycoder/react-native-helpers";

const AboutHome = () => {
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const userMedia = useStore((state) => state.userMedia);

  const isMechanic = userData?.roleName === "ROLE_MECHANIC";
  const isUser = userData?.roleName === "ROLE_USER";

  const InfoUser =() => {
    const gotoProfile = () => {
      router.replace("/(tabs)/profile");
    };

    const Avatar =() => {
      return (
        <TouchableOpacity style={styles.viewAvatar} onPress={gotoProfile}>
          <Image
            source={
              (userMedia?.imageUrl || "").trim().length > 0
                ? { uri: userMedia?.imageUrl }
                : require("@/assets/images/default_avatar.jpg")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.btnInfo}>
        <View style={styles.intro}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.txtApp}>Fix It Fast</Text>
          </View>
          <Image source={require("@/assets/images/logo/logoApp.png")} />
        </View>
        <TouchableOpacity style={styles.infoUser} onPress={gotoProfile}>
          {Avatar()}
          <View style={styles.viewName}>
            <Text style={styles.txtName}>{`Xin chào ${userData?.name}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: isAndroid ? 30 : 0 }}>
      {InfoUser()}
      {isUser && <OptionsHome/>}
      {isMechanic && <MechanicScreenHome/>}
    </View>
  );
};

export default AboutHome;
