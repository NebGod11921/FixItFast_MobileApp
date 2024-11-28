import { PermissionHelper } from "./index";
// import { translations } from "@localization";
import {
  checkMultiple,
  openSettings,
  Permission,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import { Alert, Linking } from "react-native";
import { isAndroid } from "./device.info.helper";
/**
 *
 * @param listPermission chưa check null ?
 * @returns
 */

export async function requestPermission(
  listPermission: Permission[],
  txtWaring: string
): Promise<string> {
  let status = null;

  status = await requestMultiple(listPermission);
  const permissionRequestResult: Permission[] = [];
  let isBlocked = false;
  const isNerverAskAgain = false;

  listPermission.map((item) => {
    if (status[item] === RESULTS.DENIED) permissionRequestResult.push(item);
    if (status[item] === RESULTS.BLOCKED) isBlocked = true;
    // if (status[item] === "never_ask_again") isNerverAskAgain = true;
  });

  if ((!isAndroid() && isBlocked) || isNerverAskAgain) {
    Alert.alert(
      "Không có quyền truy cập",
      `Hiện tại bạn không có quyền truy cập. ${
        txtWarning || ""
      } Bạn có muốn vào Cài đặt để có thể tiếp tục?`,
      //   translations.profile.permissionDeniedDes(txtWaring || ""),
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Mở cài đặt",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      { cancelable: false }
    );
    return RESULTS.BLOCKED;
  }
  if (isBlocked) return RESULTS.BLOCKED;
  if (permissionRequestResult.length === 0) {
    return RESULTS.GRANTED;
  }
  return RESULTS.DENIED;
}

export async function checkPermission(
  listPermission: Permission[]
): Promise<string> {
  return await checkMultiple(listPermission)
    .then((statuses) => {
      const permissionNeedRequest: Permission[] = [];
      let isBlocked = false;
      listPermission.map((item) => {
        if (statuses[item] === RESULTS.DENIED) permissionNeedRequest.push(item);
        if (statuses[item] === RESULTS.BLOCKED) isBlocked = true;
      });

      if (isBlocked) {
        return RESULTS.BLOCKED;
      } else {
        if (permissionNeedRequest.length === 0) return RESULTS.GRANTED;
        else return RESULTS.DENIED;
      }
    })
    .catch((error) => {
      return RESULTS.BLOCKED;
    });
}

/**
 * Jamviet.com check and refactor
 * @param permissionForPlatform
 * @param setIsPermissionGranted
 * @returns
 */
export function grantPermission(
  permissionForPlatform: Permission[],
  setIsPermissionGranted?: (value: boolean) => void
) {
  return async (
    needRequest = true,
    needOpenSetting = false
  ): Promise<boolean> => {
    const checkPermissionResult: string =
      await PermissionHelper.checkPermission(permissionForPlatform);
    if (checkPermissionResult === RESULTS.GRANTED) {
      setIsPermissionGranted?.(true);
      return true;
    } else {
      if (checkPermissionResult === RESULTS.DENIED) {
        const requestPermissionResult: string = needRequest
          ? await PermissionHelper.requestPermission(permissionForPlatform)
          : checkPermissionResult;
        if (requestPermissionResult === RESULTS.GRANTED) {
          setIsPermissionGranted?.(true);
          return true;
        } else {
          setIsPermissionGranted?.(false);
          if (needOpenSetting) {
            openSettings().catch(() => console.log("cannot open settings"));
          }
          return false;
        }
      } else {
        setIsPermissionGranted?.(false);
        if (needOpenSetting) {
          openSettings().catch(() => console.log("cannot open settings"));
        }
        return false;
      }
    }
  };
}
