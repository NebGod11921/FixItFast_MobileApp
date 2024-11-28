import React from "react";
import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";

interface IconCustomType {
  name: string;
  color?: string;
  size?: number;
  customStyle?: ViewStyle;
  onPress?: () => void;
  type?: IconType;
}

const IconBtn = React.forwardRef(
  (
    { name, color, size, customStyle, onPress, type }: IconCustomType,
    // children,
  ) => {
    if (!name) return null;
    if (!onPress)
      return (
        <Icon
          name={name}
          type={type || IconType.Feather}
          size={size}
          style={[
            { color: color || Color.text },
            !!customStyle && customStyle,
          ]}
        />
      );

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.wrapIcon, customStyle]}
      >
        {!!name && (
          <Icon
            name={name}
            type={type || IconType.Feather}
            size={size}
            style={{ color }}
          />
        )}
        {/* {!!children && children} */}
      </TouchableOpacity>
    );
  },
);

export default IconBtn;

const styles = StyleSheet.create({
  wrapIcon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    ...CS.flexCenter,
  },
});
