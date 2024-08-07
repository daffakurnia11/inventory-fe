import { productService } from "@/services/apis/product";
import { transactionService } from "@/services/apis/transaction";
import { ProductUrl } from "@/services/urls/product";
import { TransactionUrl } from "@/services/urls/transaction";
import { BulkTransactionPayload } from "@/types/transaction";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useAddTransaction = () => {
  const { data: products, isLoading } = useSWR(ProductUrl, () =>
    productService.getProducts()
  );

  const { trigger: addTransaction, isMutating } = useSWRMutation(
    TransactionUrl,
    (_, { arg }: { arg: BulkTransactionPayload }) => {
      return transactionService.bulkCreateTransaction(arg);
    }
  );

  return { addTransaction, products, isLoading, isMutating };
};
