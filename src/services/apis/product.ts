import { ApiService } from "./api-service";
import * as url from "../urls/product";
import { ProductPayload } from "@/types/product";

class ProductService extends ApiService {
  public async getProducts() {
    return await this.get(url.ProductUrl);
  }

  public async detailProduct(id: string) {
    return await this.get(url.ProductDetailUrl(id));
  }

  public async createProduct(payload: ProductPayload) {
    return await this.post(url.ProductUrl, payload);
  }

  public async updateProduct(id: string, payload: ProductPayload) {
    return await this.patch(url.ProductDetailUrl(id), payload);
  }

  public async deleteProduct(id: string) {
    return await this.delete(url.ProductDetailUrl(id));
  }
}

export const productService = new ProductService();
