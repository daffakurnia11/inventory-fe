export interface EditProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
}