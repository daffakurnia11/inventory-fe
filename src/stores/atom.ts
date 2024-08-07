import { atom, createStore } from "jotai";

/**
 * Message content state
 */
export const messageContent = atom<any>({
  type: "success",
  message: null,
});
export const setMessageContent = createStore();
