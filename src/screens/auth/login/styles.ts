import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-screen-helper";

const styles = StyleSheet.create({
  container: {
    ...CS.flex1,
    justifyContent: "space-between",
    paddingTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
    paddingBottom: 10,
    marginHorizontal: 14,
  },
  viewLogo: {
    alignItems: "center",
  },
  textRegister: {
    ...CS.hnMedium,
    color: Color.mainColor2,
    fontSize: 16,
    textAlign: "center",
  },
  paddingButton: {
    paddingHorizontal: 20,
  },
  txtForgotPass: {
    ...CS.hnMedium,
    color: Color.primary,
    marginTop: 16,
    fontSize: 16,
  },
  txtTitle: {
    ...CS.hnBold,
    marginTop: 20,
    fontSize: 24,
    color: Color.primary,
  },
});

export default styles;
