import { ApiService } from "./api-service";
import * as url from "../urls/transaction";
import {
  BulkTransactionPayload,
  TransactionPayload,
} from "@/types/transaction";

class TransactionService extends ApiService {
  public async getTransactions() {
    return await this.get(url.TransactionUrl);
  }

  public async createTransaction(payload: TransactionPayload) {
    return await this.post(url.TransactionUrl, payload);
  }

  public async bulkCreateTransaction(payload: BulkTransactionPayload) {
    return await this.post(url.TransactionBulkUrl, payload);
  }
}

export const transactionService = new TransactionService();
