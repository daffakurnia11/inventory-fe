import { categoryService } from "@/services/apis/category";
import { CategoryDetailUrl, CategoryUrl } from "@/services/urls/category";
import { CategoryPayload } from "@/types/category";
import { useParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useAddCategory = () => {
  const { trigger: addCategory, isMutating: loading } = useSWRMutation(
    CategoryUrl,
    (_, { arg }: { arg: CategoryPayload }) => {
      return categoryService.createCategory(arg);
    }
  );

  return {
    addCategory,
    loading,
  };
};

export const useEditCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useSWR(CategoryDetailUrl, () =>
    categoryService.detailCategory(id as string)
  );

  const category: any = data;

  const { trigger: editCategory, isMutating } = useSWRMutation(
    CategoryUrl,
    (_, { arg }: { arg: CategoryPayload }) => {
      return categoryService.updateCategory(id as string, arg);
    }
  );

  return {
    category,
    editCategory,
    isLoading,
    isMutating,
  }
};
