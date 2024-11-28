import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StoreApi } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

import createAppSlice, { AppSlice } from "../zustand/app/AppSlice";
import createUserSlice, { UserSlice } from "../zustand/user/UserSlice";

export type StoreState = AppSlice & UserSlice;

export type StoreSlice<T> = (
  set: StoreApi<StoreState>["setState"],
  get: StoreApi<StoreState>["getState"]
) => T;

const ZustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return AsyncStorage.setItem(name, value);
  },
  getItem: async (name: string) => {
    const value = AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    return AsyncStorage.removeItem(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createAppSlice(set, get),
      ...createUserSlice(set, get),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => ZustandMMKVStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              ![
                "searchFriendTxt",
                "listPostDelete",
                // "currentMediaIds",
                "currentChatList",
                "courseFilterKeys",
                "listCourseFilterParams",
                "courseCurrentSort",
                "courseCurrentType",
                "courseSearchHistory",
                "setListVideoCourse",
                "shoppingProduct",
                "listLike",
                "listCommentDelete",
                "listFollow",
                "listBlock",
                "setIsMutedAll",
                "typeFilter",
              ].includes(key)
          )
        ),
    }
  )
);

export default useStore;
