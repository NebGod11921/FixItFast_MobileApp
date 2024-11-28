import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnOption1: {
    height: 180,
    backgroundColor: Color.background,
    borderRadius: 29,
    justifyContent: "center",
    gap: 4,
  },
  btnOption2: {
    height: 180,
    backgroundColor: Color.background,
    borderRadius: 29,
    justifyContent: "center",
    gap: 10,
  },
  btnOption3: {
    height: 100,
    backgroundColor: Color.background,
    borderRadius: 29,
    justifyContent: "center",
    gap: 10,
  },
  styleBtn: {
    // height: 40,
    marginHorizontal: 42,
    // backgroundColor: Color.black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  txtText: {
    fontFamily: "outfit-semibold",
    fontSize: 18,
    color: Color.white,
  },
  viewOption: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    marginHorizontal: 14,
    height: 100,
  },
  txtOption2: {
    textAlign: "center",
    fontFamily: "outfit-bold",
    fontSize: 24,
    color: Color.primary,
  },
  txtOption21: {
    textAlign: "center",
    fontFamily: "outfit-semibold",
    fontSize: 16,
  },
  txtOption3: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    color: Color.primary,
  },
  viewBtn: {
    borderRadius: 24,
  },
});

export default styles;
