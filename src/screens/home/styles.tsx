import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...CS.flex1,
    backgroundColor: Color.background2
  },
});

export default styles;
