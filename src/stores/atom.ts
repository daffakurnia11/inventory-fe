import { atom, createStore } from "jotai";
import { atomWithStore } from "jotai-zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserLoginDataType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  gender: string;
}

export interface LoginDataType {
  login: boolean;
  user: UserLoginDataType;
  token: string;
}

export const loginStorage = create(
  persist(
    () => ({
      login: false,
      userData: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        birth_date: null,
        gender: null,
      },
      token: null,
    }),
    {
      name: "user-login",
      getStorage: () => localStorage,
    }
  )
);

export const loginData = atomWithStore(loginStorage);

/**
 * Message content state
 */
export const messageContent = atom<any>({
  type: "success",
  message: null,
});
export const setMessageContent = createStore();
