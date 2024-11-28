import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconBtn from "../button/IconBtn";
import { isAndroid } from "@/src/helpers/constant";
import { useRouter } from "expo-router";

interface HeaderProps {
  iconNameLeft?: string;
  iconNameRight?: string;
  text?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  textRight?: string;
  customStyle?: ViewStyle;
  badge?: number;
  hideBackBtn?: boolean;
  // rightComponent?: JSX.Element;
}

const Header = ({
  iconNameLeft,
  iconNameRight,
  text,
  onPressLeft,
  onPressRight,
  textRight,
  customStyle,
  badge,
  hideBackBtn = false,
  // rightComponent,
}: HeaderProps) => {
  const router = useRouter();

  const _onPressLeft = () => {
    if (onPressLeft) {
      onPressLeft();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <View style={styles.viewIcons}>
        {!hideBackBtn && (
          <IconBtn
            onPress={_onPressLeft}
            name={iconNameLeft || "chevron-left"}
            type={IconType.Feather}
            size={25}
            color={Color.text}
          />
        )}
      </View>
      <Text
        numberOfLines={1}
        style={[styles.textHeader, { color: Color.text, ...CS.flex1 }]}
      >
        {text || ""}
      </Text>
      {/* {!!iconNameRight && ( */}
      <View style={styles.viewIcons}>
        {!!iconNameRight && (
          <IconBtn
            onPress={onPressRight}
            name={iconNameRight || "ellipsis-horizontal"}
            type={IconType.Feather}
            size={25}
            color={Color.text}
          />
        )}
        {!!badge && !!iconNameRight && (
          <TouchableOpacity onPress={onPressRight} style={styles.badge}>
            <Text style={styles.txtBadge}>{badge}</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* )} */}
      {(!textRight || textRight?.trim() !== "") && (
        <TouchableOpacity
          onPress={onPressRight}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
            ...CS.center,
            paddingRight: 16,
          }}
        >
          <Text
            style={[
              styles.textHeader,
              { color: Color.text, textDecorationLine: "underline" },
            ]}
          >
            {textRight}
          </Text>
        </TouchableOpacity>
      )}
      {/* {!!rightComponent && rightComponent()} */}
      {isAndroid && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: -20,
            right: 0,
            height: 20,
            backgroundColor: "white",
            zIndex: 1,
          }}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 2,
    gap: 8,
    backgroundColor: Color.white,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 10,
    shadowRadius: 5,
    // marginTop: isIos ? 0 : getStatusBarHeight(),
  },
  textHeader: {
    ...CS.hnBold,
    fontSize: 22,
    textAlign: "center",
  },
  viewIcons: {
    width: 40,
    height: 40,
    ...CS.center,
  },
  badge: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Color.red,
    ...CS.flexCenter,
    borderRadius: 99,
    ...CS.borderStyle,
    borderColor: Color.white,
  },
  txtBadge: {
    ...CS.hnRegular,
    fontSize: 13,
    color: Color.white,
  },
});
