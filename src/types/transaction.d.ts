export interface TransactionPayload {
  product_id: string;
  quantity: number;
  state: "In" | "Out";
}

export interface BulkTransactionPayload {
  transactions: TransactionPayload[];
}