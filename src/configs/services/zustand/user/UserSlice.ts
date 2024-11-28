import { TypeAppointment, TypeAppointmentByStatus, TypedUser } from "@/src/models";
import { StoreSlice } from "../../store/store";
import { EnumAppointmentStatus, TypeAppointmentStatus } from "@/src/constants/system.constant";


interface IUserMedia {
  imageUrl?: string;
}

export interface UserSlice {
  userData: TypedUser | null;
  setUserData: (user: TypedUser) => void;
  userToken: string | null;
  setUserToken: (userToken: string) => void;
  resetUserData: () => void;
  listFollow: string[];
  updateListFollow: (id: string) => void;
  linkAvatar: string;
  setLinkAvatar: (link: string) => void;
  userMedia: IUserMedia;
  setUserMedia: (v: IUserMedia) => void;
  userInfo: TypedUser | null;
  setUserInfo: (user: TypedUser) => void;
  isSendEliteClub: boolean;
  setIsSendEliteClub: (bol: boolean) => void;
  extraUserData: any;
  setExtraUserData: (data: any) => void;
  appointmentData: TypeAppointmentByStatus;
  setAppointmentData: (status: TypeAppointmentStatus, data: TypeAppointment[]) => void
}

const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  userData: null,
  setUserData: (user: TypedUser) => set({ userData: user }),
  userInfo: null,
  setUserInfo: (user: TypedUser) => set({ userInfo: user }),
  userToken: null,
  setUserToken: (value: string) => set({ userToken: value }),
  resetUserData: () => set({ userData: null }),
  listFollow: [],
  updateListFollow: (_id) => {
    set((state) => {
      const index = state.listFollow.findIndex((item) => item === _id);
      if (index >= 0) {
        return {
          listFollow: [...state.listFollow.filter((item) => item !== id)],
        };
      } else {
        return {
          listFollow: [...state.listFollow, _id],
        };
      }
    });
  },
  linkAvatar: "",
  setLinkAvatar: (link) => {
    set({ linkAvatar: link });
  },
  userMedia: {
    imageUrl: "",
  },
  setUserMedia: (v: IUserMedia) => {
    set((state) => {
      return { userMedia: { ...state.userMedia, ...v } };
    });
  },
  isSendEliteClub: false,
  setIsSendEliteClub: (bol: boolean) => {
    set({ isSendEliteClub: bol });
  },
  extraUserData: null,
  setExtraUserData: (data: any) => {
    set((state) => {
      return { extraUserData: { ...state.extraUserData, ...data } };
    });
  },
  appointmentData: {
    NEW: [],
    CONFIRMED: [],
    PROCESSING: [],
    COMPLETED: [],
    CANCELED: []
  },
  setAppointmentData: (status: TypeAppointmentStatus ,data: TypeAppointment[]) => {
    const key = status;
    set((state) => {
      const appointmentDataTemp = state.appointmentData;
      appointmentDataTemp[key] = data;
      return { appointmentData: appointmentDataTemp };
    });
  },
});

export default createUserSlice;
