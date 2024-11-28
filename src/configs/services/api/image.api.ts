import { Asset } from "react-native-image-picker";
import request, { BASEURL, METHOD, UPLOAD_URL } from "./api";
import { TypedCropImage } from "@/src/models";

interface MediaAsset extends TypedCropImage, Asset {
  duration?: any;
  path?: string;
  name?: string;
}

export async function uploadMedia(file: MediaAsset, onUploadProgress?: any) {
  const newForm = new FormData();
  newForm.append("file[]", file);
  return request({
    method: METHOD.POST,
    url: `${UPLOAD_URL}upload-media?callback=${BASEURL}media/create`,
    data: newForm,
    customHeader: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onUploadProgress ? onUploadProgress : () => {},
    timeOut: 1800000,
  }).then((response) => {
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  });
}
