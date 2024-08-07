export const AUTH_PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const PATH = {
  ROOT: "/",
};

export const PUBLIC_PATH = [AUTH_PATH.LOGIN, AUTH_PATH.REGISTER];

export const PROTECTED_PATH = [PATH.ROOT];
