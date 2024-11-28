import useStore from "@/src/configs/services/store/store";
import Header from "@/src/shared/header/Header";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemAppointment from "./components/ItemAppointment";
import { useListData } from "@/src/hooks/useListData";
import {
  getAllListAppointmentMechanic,
  getAllListAppointmentUser,
  TypeParamsRequestAppointmentUser,
} from "@/src/configs/services/api/appointment.api";
import { TypeAppointmentStatus } from "@/src/constants/system.constant";
import { useIsFocused } from "@react-navigation/native";

const AppointmentScreen = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const userData = useStore((state) => state.userData);
  const appointmentData = useStore((state) => state.appointmentData);
  const setAppointmentData = useStore((state) => state.setAppointmentData);
  const [paramsRequest, setParamsRequest] =
    useState<TypeParamsRequestAppointmentUser>({
      limit: "12",
      user_id: userData?.id || "",
      status: "NEW",
    });
  const header = useMemo<
    {
      title: string;
      status: TypeAppointmentStatus;
      color: string;
    }[]
  >(
    () => [
      {
        title: "NEW",
        status: "NEW",
        color: "green",
      },
      {
        title: "CONFIRMED",
        status: "CONFIRMED",
        color: "green",
      },
      {
        title: "PROCESSING",
        status: "PROCESSING",
        color: "green",
      },
      {
        title: "COMPLETED",
        status: "COMPLETED",
        color: "green",
      },
      {
        title: "CANCELED",
        status: "CANCELED",
        color: "red",
      },
    ],
    [],
  );
  const [tabActive, setTabActive] = useState<TypeAppointmentStatus>("NEW");
  const { listData, apiCode, appointmentStatus } = useListData(
    paramsRequest,
    userData?.roleName === "ROLE_USER"
      ? getAllListAppointmentUser
      : getAllListAppointmentMechanic,
    [],
    isFocused,
  );
  const [reRender, setRerender] = useState<number>(0); //force rerender

  useEffect(() => {
    if (apiCode === 200) {
      setAppointmentData(appointmentStatus, listData);
      setRerender(new Date().getTime()); //force rerender
    }
  }, [apiCode, listData, isFocused]);
  /// đây e xem chỗ naytf nó truyền này
  useEffect(() => {
    setParamsRequest({
      ...paramsRequest,
      status: tabActive,
    });
  }, [tabActive]);

  const renderItemSelected = ({ item, index }) => {
    return <ItemAppointment data={item} key={index} />;
  };
  return (
    <SafeAreaView style={CS.safeAreaView}>
      <Header
        text="Lịch hẹn"
        hideBackBtn
        customStyle={{ backgroundColor: Color.transparent }}
      />
      <ScrollView
        horizontal
        style={styles.header}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 40 }}
      >
        {header.map((item) => (
          <TouchableOpacity
            style={[
              styles.buttonHeader,
              item.status === tabActive && styles.tabActive,
            ]}
            onPress={() => setTabActive(item.status)}
          >
            <Text style={styles.txtHeader}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={appointmentData[tabActive]} //đât kaf data nó lấy đc
        renderItem={renderItemSelected}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        scrollEventThrottle={16}
        initialNumToRender={2}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  viewBtn: {
    height: 180,
    backgroundColor: Color.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.blueBorder,
    paddingHorizontal: 18,
    gap: 10,
    justifyContent: "center",
  },
  viewHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  viewLeft: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtHead: {
    ...CS.hnBold,
    fontSize: 19,
    color: Color.iconBlack,
  },
  txtDes: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.gold,
  },
  viewTextIcon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  viewTxt: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.text,
  },

  header: {
    height: 45,
    paddingHorizontal: 20,
  },
  buttonHeader: {
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  txtHeader: {
    color: "#6B6D6C",
  },
  tabActive: {
    backgroundColor: "#D1E5EF",
    borderRadius: 8,
  },
});
