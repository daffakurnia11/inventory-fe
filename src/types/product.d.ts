export interface ProductPayload {
  product_name: string;
  product_description: string;
  product_image: number;
  stock: number;
  category_id: string;
}

export interface ProductData {
  id: string;
  product_name: string;
  product_description: string;
  stock: number;
  category?: {
    id: string;
    category_name: string;
  };
};