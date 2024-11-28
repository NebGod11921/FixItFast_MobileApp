import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: "space-around",
    gap: 150,
    marginHorizontal: 16,
  },
  viewDiscount: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  txtTitle: {
    ...CS.hnBold,
    fontSize: 32,
    color: Color.text,
  },
  txtViewMore: {
    ...CS.hnMedium,
    fontSize: 18,
    color: Color.textError
  },
  viewPrice: {
    gap: 20,
  },
  styleBtn: {
    backgroundColor: Color.yellowComment,
    borderRadius: 14,
  },
  viewInfoPrice: {
    height: 80,
    backgroundColor: Color.lightBlue,
    gap: 20,
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  txtPrice: {
    ...CS.hnSemiBold,
    fontSize: 16,
    color: Color.white,
  },
  txt: {
    ...CS.hnBold,
    fontSize: 18,
    color: Color.white,
  },
  viewBest: {
    height: 24,
    width: 80,
    borderRadius: 10,
    backgroundColor: Color.primary,
    justifyContent: "center",
  },
  txt1: {
    ...CS.hnBold,
    fontSize: 12,
    textAlign: "center",
    color: Color.white,
  },
});

export default styles;
