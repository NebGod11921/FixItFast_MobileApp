import { CS } from "@/src/styles/cs.style";
import { Color } from "@/src/themes/app.colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    gap: 10,
  },
  styleHeader: {
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  txtHeader: {
    ...CS.hnBold,
    fontSize: 22,
  },
  info: {
    height: 100,
    marginTop: 16,
    flexDirection: "row",
    backgroundColor: Color.white,
    borderRadius: 24,
    alignItems: "center",
  },
  viewinfo: {
    marginHorizontal: 20,
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
  txtName: {
    ...CS.hnBold,
    fontSize: 18,
    color: Color.text,
  },
  txtPhone: {
    ...CS.hnMedium,
    fontSize: 18,
    color: Color.text,
  },
  txtEdit: {
    ...CS.hnMedium,
    fontSize: 18,
    color: Color.primary,
  },
  btnDeleteUser: {
    height: 50,
    marginHorizontal: 48,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewBtnAdd: {
    height: 300,
    backgroundColor: Color.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  viewIconAdd: {
    height: 70,
    width: 70,
    backgroundColor: Color.primary,
    borderRadius: 100,
  },
  viewBtnAdd1: {
    height: 100,
    backgroundColor: Color.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  viewIconAdd1:{
    height: 40,
    width: 40,
    backgroundColor: Color.primary,
    borderRadius: 100,
  },
});

export default styles;