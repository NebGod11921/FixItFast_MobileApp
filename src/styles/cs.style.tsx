import { FlexStyle, StyleSheet } from "react-native";
import { Color } from "../themes/app.colors";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-screen-helper";
import { isAndroid } from "@freakycoder/react-native-helpers";

const flexBase: FlexStyle = {
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
};

const CS = StyleSheet.create({
    flex1: { flex: 1 },
    flex2: {
      paddingTop: 10,
      marginHorizontal: 16,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    flexStart: {
      ...flexBase,
      justifyContent: "flex-start",
    },
    flexStartTop: {
      ...flexBase,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    flexEnd: {
      ...flexBase,
      justifyContent: "flex-end",
    },
    flexRear: {
      ...flexBase,
      justifyContent: "space-between",
    },
    flexRearTop: {
      ...flexBase,
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    flexSpaceAround: {
      ...flexBase,
      justifyContent: "space-around",
    },
    flexCenter: {
      ...flexBase,
      justifyContent: "center",
    },
    flexCenterTop: {
      ...flexBase,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    fillParent: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    txtLink: {
      fontSize: 16,
      color: Color.link,
      textDecorationLine: "underline",
    },
    hnRegular: {
      fontFamily: "outfit-regular",
      color: Color.text,
      fontSize: 18,
    },
    hnBold: {
      fontFamily: "outfit-bold",
      color: Color.text,
      fontSize: 22,
    },
    hnSemiBold: {
      fontFamily: "outfit-light",
      color: Color.text,
      fontSize: 18,
    },
    hnMedium: {
      fontFamily: "outfit-medium",
      color: Color.text,
      fontSize: 18,
    },
    hnLight: {
      fontFamily: "outfit-light",
      color: Color.text,
      fontSize: 18,
    },
    // hnItalic: {
    //   fontFamily: font.outfit.italic,
    // },
    borderStyle: {
      borderColor: Color.borderColor1,
      borderStyle: "solid",
      borderWidth: 1,
    },
    borderBottomStyle: {
      borderColor: Color.borderColor1,
      borderStyle: "solid",
      borderBottomWidth: 1,
    },
    borderTopStyle: {
      borderColor: Color.borderColor1,
      borderStyle: "solid",
      borderTopWidth: 1,
    },
    text: {
      fontSize: 14,
      lineHeight: 16,
      color: Color.black,
    },
    headerTitle: {
      fontSize: 26,
      color: Color.mainColor2,
    },
    btnActive: {
      padding: 12,
      paddingHorizontal: 20,
      borderRadius: 99,
      backgroundColor: Color.primary,
    },
    txtBtnActive: {
      fontSize: 16,
      color: Color.white,
    },
    textCourse: {
      fontSize: 16,
      lineHeight: 20,
      // fontFamily: font.outfit.medium,
      color: Color.text,
    },
    textTitleStream: {
      fontSize: 16,
      lineHeight: 20,
      // fontFamily: font.outfit.semiBold,
      color: Color.white,
    },
    textOpacity8: {
      fontSize: 16,
      lineHeight: 20,
      // fontFamily: font.outfit.semiBold,
      color: Color.textOpacity6,
    },
    textOpacity6: {
      fontSize: 16,
      lineHeight: 20,
      color: Color.textOpacity6,
    },
    textOpacity4: {
      fontSize: 12,
      lineHeight: 16,
      // fontFamily: font.outfit.medium,
      color: Color.btnRedPrimary,
    },
    textRate: {
      fontSize: 12,
      lineHeight: 16,
      // fontFamily: font.outfit.medium,
      color: Color.textOpacity6,
    },
    textBuy: {
      fontSize: 12,
      lineHeight: 16,
      // fontFamily: font.outfit.medium,
      color: Color.whiteOverlay1,
    },
    txtPriceNew: {
      fontSize: 14,
      lineHeight: 24,
      // fontFamily: font.outfit.bold,
      color: Color.textOpacity2,
    },
    txtPriceOld: {
      fontSize: 10,
      lineHeight: 24,
      // fontFamily: font.outfit.medium,
      color: Color.primary,
    },
    txtTitle: {
      fontSize: 16,
      lineHeight: 24,
      // fontFamily: font.outfit.semiBold,
      color: Color.textOpacity2,
    },
    safeAreaView: {
      flex: 1,
      marginBottom: isAndroid ? getBottomSpace() : 0,
      marginTop: isAndroid ? getStatusBarHeight() : 0,
    },
    container: {
      flex: 1,
      marginTop: isAndroid ? getStatusBarHeight() : 0,
    },
    textLive: {
      fontSize: 14,
      lineHeight: 22,
      // fontFamily: font.outfit.medium,
      color: Color.white,
    },
    txtPoint: {
      lineHeight: 22,
      // fontFamily: font.outfit.regular,
    },
  });

export {CS};