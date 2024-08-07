import { ApiService } from "./api-service";
import * as url from "../urls/admin";
import { EditProfilePayload } from "@/types/profile";

class AdminService extends ApiService  {
  public async getProfile() {
    return await this.get(url.AdminUrl);
  }

  public async updateProfile(payload: EditProfilePayload) {
    return await this.patch(url.AdminUrl, payload);
  }
}

export const adminService = new AdminService()