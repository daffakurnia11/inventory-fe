export const AUTH_PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const PATH = {
  ROOT: "/",
  PROFILE: "/profile",
  CHANGEPASS: "/change-password",
  CATEGORIES: "/categories",
};

export const PUBLIC_PATH = [...Object.values(AUTH_PATH)];

export const PROTECTED_PATH = [...Object.values(PATH)];
