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