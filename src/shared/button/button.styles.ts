import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";

export default () => {
    return StyleSheet.create({
      viewButton: {
        paddingVertical: 9,
        borderRadius: 12,
        backgroundColor: Color.mainColor2,
        ...CS.flexCenter,
        paddingHorizontal: 16,
        gap: 8,
      },
      textButton: {
        ...CS.hnBold,
        color: Color.white,
        fontSize: 18,
      },
      pressableBtn: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: Color.mainColor2,
      },
      btnPrimary: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        ...CS.center,
        backgroundColor: Color.primary,
      },
      txtBtnPrimary: {
        ...CS.hnSemiBold,
        color: Color.white,
      },
      btnOutline: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        ...CS.center,
        ...CS.borderStyle,
        borderColor: Color.primary,
        backgroundColor: Color.white,
      },
      txtBtnOutline: {
        ...CS.hnSemiBold,
        color: Color.primary,
      },
      btnDisabled: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        ...CS.center,
        backgroundColor: Color.btnInactive,
      },
      txtBtnDisabled: {
        ...CS.hnSemiBold,
        color: Color.textOpacity4,
      },
      btnViewmore: {
        backgroundColor: Color.grey1,
      },
    });
  };