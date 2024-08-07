export interface RegisterPayload {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UserCookiesData = {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
    gender: string;
  };
};
