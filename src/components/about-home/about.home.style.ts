import { StyleSheet } from "react-native";

import { Color } from "@/src/themes/app.colors";

const SIZE_AVATAR = 75;

const styles = StyleSheet.create({
  btnInfo: {
    height: 200,
    backgroundColor: Color.background,
    borderRadius: 29,
    justifyContent: "center",
    gap: 10,
  },
  intro: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  infoUser: {
    flexDirection: "row",
    marginHorizontal: 24,
  },
  avatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    borderRadius: SIZE_AVATAR / 2,
  },
  txtApp: {
    fontFamily: "outfit-bold",
    fontSize: 42,
  },
  txtName: {
    fontFamily: "outfit-semibold",
    fontSize: 16,
  },
  viewAvatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    borderRadius: SIZE_AVATAR / 2,
  },
  viewName: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  }
});

export default styles;