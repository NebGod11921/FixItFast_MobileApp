import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import TextBase from "../shared/text/TextBase";
import { WindowWidth } from "@freakycoder/react-native-helpers";
import { Color } from "../themes/app.colors";
import { CS } from "../styles/cs.style";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import LoadingUpdateMedia from "./LoadingUpdateMedia";
import { selectMedia } from "../helpers/file.helper";
import { isIos } from "../helpers/device.info.helper";
import { showToast } from "../helpers/super.modal.helpers";
import { uploadMedia } from "../configs/services/api/image.api";

interface SelectImageHookProps {
  link?: string;
  id?: string;
  type?: "phote" | "video" | "any";
  placeholder?: string;
  typeM?: string;
}

const UseSelectImageHook = ({
  link,
  id,
  typeM,
  type = "any",
  placeholder,
}: SelectImageHookProps) => {
  const [updatingVid, setUpdatingVid] = React.useState(false);
  const [process, setProcess] = useState(0);
  const [media, setMedia] = useState({
    link: link || "",
    id: id || "",
    typeM: typeM || "",
  });

  const onUploadProgress = function (progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProcess(percentCompleted);
  };

  const onPressChangeMedia = async () => {
    selectMedia({
      config: { mediaType: type },
      callback: async (image) => {
        const uri = isIos() ? image.path?.replace("file://", "") : image.path;
        setUpdatingVid(true);
        const res = await uploadMedia(
          {
            name:
              image?.filename || image.path?.split("/")?.reverse()?.[0] || "",
            uri: uri,
            type: image.mime,
          },
          onUploadProgress
        );
        if (res?.[0]?.callback?._id) {
          setMedia({
            typeM: image.mime,
            id: res[0]?.callback?._id,
            link: res?.[0]?.callback?.media_thumbnail,
          });
          setUpdatingVid(false);
          setProcess(0);
        } else {
          setUpdatingVid(false);
          showToast({
            type: "error",
            message: "Tải ảnh lên không thành công",
          });
        }
      },
      _finally: () => {
        setUpdatingVid(false);
      },
    });
  };

  const renderSelectBackground = () => {
    return (
      <Pressable onPress={onPressChangeMedia}>
        <ImageBackground
          source={require("@/assets/images/motocycle/motorcycle.png")}
          style={styles.viewImage}
          borderRadius={8}
        >
          <Pressable onPress={onPressChangeMedia} style={styles.styleBtn}>
            <View style={styles.viewGally}>
              <Icon name="image" type={IconType.Feather} size={24} />
            </View>
          </Pressable>
          <Image source={{ uri: media.link }} style={styles.viewImage1} />
          {updatingVid && (
            <View style={styles.viewImageFill}>
              <LoadingUpdateMedia />
              <View style={styles.viewImageFill}>
                <ActivityIndicator size={"small"} />
                <TextBase fontSize={12} fontWeight="500" color="primary">
                  {process}%
                </TextBase>
              </View>
            </View>
          )}
        </ImageBackground>
      </Pressable>
    );
  };

  return {
    renderSelectBackground,
  };
};

export default UseSelectImageHook;

const styles = StyleSheet.create({
  viewImageFull: {
    height: (WindowWidth / 16) * 9,
    backgroundColor: Color.placeholder,
  },
  viewFull: {
    width: WindowWidth,
    height: (WindowWidth / 16) * 9,
  },
  viewImage: {
    height: (WindowWidth / 16) * 9,
    backgroundColor: Color.placeholder,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  viewImage2: {
    ...CS.center,
    height: 48,
    backgroundColor: Color.background,
    marginHorizontal: 20,
    borderRadius: 12,
    borderStyle: "dashed",
    borderColor: Color.borderColor,
    borderWidth: 1,
  },
  viewImageFill: {
    ...CS.fillParent,
    ...CS.center,
    backgroundColor: Color.placeholder,
    ...CS.row,
    gap: 8,
    borderRadius: 12,
  },
  deleteViceo: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    ...CS.center,
    backgroundColor: Color.placeholder,
  },
  viewGally: {
    ...CS.center,
  },
  viewIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  styleBtn: {
    backgroundColor: Color.placeholder,
    width: 98,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 99,
  },
  viewImage1: {
    height: (WindowWidth / 16) * 9,
    borderRadius: 8,
  },
  viewSelectImage: {
    height: 40,
    backgroundColor: Color.background,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Color.primary,
  },
});
