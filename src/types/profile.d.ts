export interface EditProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}