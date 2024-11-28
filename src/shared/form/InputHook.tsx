// Input.js

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  StyleSheet,
  TextStyle,
  Pressable,
} from "react-native";
import { Controller } from "react-hook-form";
import { Color } from "@/src/themes/app.colors";
import { CS } from "@/src/styles/cs.style";

interface InputPropsType {
  type: "text" | "number" | "email" | "password";
  defaultValue: string | number;
  placeholder: string;
  keyboardType?: "default" | "numeric";
}

interface InputHookProps {
  inputProps: InputPropsType;
  control: any;
  rules?: any;
  customStyle: TextStyle;
  errorTxt?: string;
  name: string;
  isPassword?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  viewStyle?: ViewStyle;
  noBorder?: boolean;
  multiline?: boolean;
  maxLength?: number;
  showPlaceholder?: boolean;
  setFocus?: any;
  label?: string;
  countLength?: boolean;
  textWarning?: string;
}

// eslint-disable-next-line react/display-name
const InputHook: React.FC<InputHookProps> = ({
  inputProps,
  control,
  rules,
  errorTxt,
  customStyle,
  name,
  isPassword = false,
  iconLeft,
  iconRight,
  viewStyle,
  noBorder,
  multiline = false,
  maxLength = 500,
  showPlaceholder,
  setFocus,
  label,
  countLength,
  textWarning,
}) => {
  const refInput = useRef<TextInput>(null);
  const _forcusInput = () => {
    if (setFocus) {
      setFocus(name);
    } else {
      refInput.current?.focus();
    }
  };
  const [length, setLength] = useState("");
  return (
    <View
      style={[styles.wrapper, showPlaceholder || label ? { marginTop: 8 } : {}]}
    >
      {showPlaceholder && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.textTitle}>{inputProps.placeholder}</Text>
          {!textWarning && countLength && (
            <Text style={styles.textCount}>{`${length}/${maxLength}`}</Text>
          )}
        </View>
      )}
      {!!label && (
        <Text style={styles.label}>
          {label}
          {rules?.required && (
            <Text style={{ color: Color.primary }}> *</Text>
          )}
        </Text>
      )}

      <Pressable
        onPress={_forcusInput}
        style={[
          styles.viewBorder,
          !!viewStyle && viewStyle,
          errorTxt ? { borderColor: Color.danger } : {},
          !!noBorder && { borderWidth: 0 },
          multiline
            ? {
                height: 100,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                paddingTop: 8,
              }
            : {},
        ]}
      >
        {!!iconLeft && iconLeft}
        <Controller
          control={control}
          rules={rules}
          render={({ field: { ref, onChange, value } }) => {
            setLength(value?.length || 0);
            return (
              <TextInput
                {...inputProps}
                ref={ref || refInput}
                multiline={multiline}
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value}
                style={[
                  styles.input,
                  !!customStyle && customStyle,
                  multiline && { flex: 1, textAlignVertical: "top" },
                ]}
                secureTextEntry={isPassword}
                placeholderTextColor={Color.placeholder}
                maxLength={maxLength}
              />
            );
          }}
          name={name}
        />
        {!!iconRight && iconRight}
      </Pressable>

      {errorTxt && <Text style={styles.errorText}>{errorTxt}</Text>}
      {textWarning && (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textCount}>{textWarning}</Text>
          {countLength && (
            <Text style={styles.textCount}>{`${length}/${maxLength}`}</Text>
          )}
        </View>
      )}
    </View>
  );
};
export default InputHook;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 48,
    width: "100%",
  },
  label: {
    ...CS.hnSemiBold,
    color: Color.text,
    paddingHorizontal: 20,
  },
  viewBorder: {
    marginTop: 8,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    gap: 15,
    ...CS.borderStyle,
  },
  input: {
    ...CS.flex1,
    color: Color.text,
    paddingVertical: 0,
    // ...CS.mb6,
  },
  errorText: {
    color: Color.danger,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  textTitle: {
    ...CS.hnBold,
  },
  textCount: {
    ...CS.hnRegular,
    fontSize: 12,
    color: Color.textOpacity6,
  },
});
