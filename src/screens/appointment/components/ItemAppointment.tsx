import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const ItemAppointment = ({ data }: { data: any }) => {
  const router = useRouter();

  const IconText = ({ text, nameIcon }: { text: string; nameIcon: string }) => {
    return (
      <View style={styles.viewTextIcon}>
        <Icon name={nameIcon} type={IconType.Feather} size={20} />
        <Text style={styles.viewTxt}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: 20, marginHorizontal: 16 }}>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() =>
          router.push({
            pathname: "/(routes)/viewMoreAppointmentRoute",
            params: { data: JSON.stringify(data) },
          })
        }
      >
        <View style={styles.viewHead}>
          <View style={styles.viewLeft}>
            <Icon name="zap" type={IconType.Feather} color={Color.iconBlack} />
            <Text
              style={[
                styles.txtHead,
                { color: data.type === "SOS" ? "red" : "black" },
              ]}
            >
              {data.type}
            </Text>
          </View>
          <Text style={styles.txtDes}>{data.status}</Text>
        </View>
        <Text style={styles.txtHead}>{data.formattedAppointmentDate}</Text>
        <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
          <IconText
            nameIcon="speaker"
            text={`${data?.driver?.moto?.brand} ${data?.driver?.moto?.licensePlate}`}
          />
          <IconText nameIcon="users" text={data?.driver?.name} />
        </View>
        <View style={{ gap: 10 }}>
          <IconText nameIcon="trello" text={data?.mechanic?.garage?.name} />
          <IconText
            nameIcon="map-pin"
            text={
              data.type === "SOS"
                ? data?.address
                : data?.mechanic?.garage?.address
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemAppointment;

const styles = StyleSheet.create({
  viewBtn: {
    minHeight: 180,
    backgroundColor: Color.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Color.blueBorder,
    paddingHorizontal: 18,
    gap: 10,
    justifyContent: "center",
    paddingBottom: 10,
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
    ...CS.hnBold,
    fontSize: 16,
    color: Color.gold,
  },
  viewTextIcon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  viewTxt: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.text,
  },
});
