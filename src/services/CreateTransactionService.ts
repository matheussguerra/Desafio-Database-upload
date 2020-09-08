import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({ category, title, type, value }: Request): Promise<Transaction> {



    return transaction;
  }
}

export default CreateTransactionService;
