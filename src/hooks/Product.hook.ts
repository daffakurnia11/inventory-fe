import { categoryService } from "@/services/apis/category";
import { productService } from "@/services/apis/product";
import { CategoryUrl } from "@/services/urls/category";
import { ProductDetailUrl, ProductUrl } from "@/services/urls/product";
import { ProductPayload } from "@/types/product";
import { useParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useAddProduct = () => {
  const { data: category, isLoading } = useSWR(CategoryUrl, () =>
    categoryService.getCategories()
  );

  const { trigger: addProduct, isMutating } = useSWRMutation(
    ProductUrl,
    (_, { arg }: { arg: ProductPayload }) => {
      return productService.createProduct(arg);
    }
  );

  return { category, addProduct, isLoading, isMutating };
};

export const useEditProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useSWR(ProductDetailUrl, () =>
    productService.detailProduct(id as string)
  );
  const { data: category, isLoading: isLoadingCategory } = useSWR(CategoryUrl, () =>
    categoryService.getCategories()
  );

  const product: any = data;

  const { trigger: editProduct, isMutating } = useSWRMutation(
    ProductUrl,
    (_, { arg }: { arg: ProductPayload }) => {
      return productService.updateProduct(id as string, arg);
    }
  );

  return {
    product,
    editProduct,
    category,
    isLoading,
    isMutating,
    isLoadingCategory
  }
}
