"use client";

import { UserCookiesData } from "@/types/auth";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export function getSession() {
  const session = getCookie("session");

  const cookie = session ? JSON.parse(session) : "";

  return cookie;
}

export async function createSession(user: UserCookiesData) {
  // Expired in 1 day (Default)
  const expiresAt = new Date(
    Date.now() +
      (Number(process.env.NEXT_PUBLIC_COOKIES_EXPIRATION) ||
        24 * 60 * 60 * 1000)
  );

  setCookie("session", user, {
    expires: expiresAt,
  });
}

export async function updateSession() {
  const cookie = getSession();

  if (!cookie) return null;

  createSession(cookie);
}

export function deleteSession() {
  deleteCookie("session");
}
