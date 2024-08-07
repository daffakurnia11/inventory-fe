import { ApiService } from "./api-service";
import * as url from "../urls/category";
import { CategoryPayload } from "@/types/category";

class CategoryService extends ApiService {
  public async getCategories() {
    return await this.get(url.CategoryUrl);
  }

  public async detailCategory(id: string) {
    return await this.get(url.CategoryDetailUrl(id));
  }

  public async createCategory(payload: CategoryPayload) {
    return await this.post(url.CategoryUrl, payload);
  }

  public async updateCategory(id: string, payload: CategoryPayload) {
    return await this.patch(url.CategoryDetailUrl(id), payload);
  }

  public async deleteCategory(id: string) {
    return await this.delete(url.CategoryDetailUrl(id));
  }
}

export const categoryService = new CategoryService();
