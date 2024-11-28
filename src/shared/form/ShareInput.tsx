import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface IProps {
  title?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value: any;
  setValue: (v: any) => void;
}

const ShareInput = (props: IProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const {
    title,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue,
  } = props;

  return (
    <View style={styles.inputGroup}>
      {title && <Text style={styles.txtGroup}>{title}</Text>}
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        keyboardType={keyboardType}
        style={[
          styles.input,
          { borderColor: isFocus ? Color.orange : Color.textOpacity24 },
        ]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default ShareInput;

const styles = StyleSheet.create({
  inputGroup: {
    padding: 5,
    gap: 5,
  },
  txtGroup: {
    ...CS.hnSemiBold,
    fontSize: 20,
  },
  input: {
    borderColor: Color.textOpacity24,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
