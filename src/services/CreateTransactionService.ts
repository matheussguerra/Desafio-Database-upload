import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm'

import Transaction from '../models/Transaction';
import Category from '../models/Category'
import TransactionsRepoitory from '../repositories/TransactionsRepository'


interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ category, title, type, value }: Request): Promise<Transaction> {
    const transactionsRepoitory = getCustomRepository(TransactionsRepoitory);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepoitory.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance')
    }

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      })

      await categoryRepository.save(transactionCategory)
    }


    const transaction = transactionsRepoitory.create({
      title,
      value,
      type,
      category: transactionCategory
    })

    await transactionsRepoitory.save(transaction);


    return transaction;
  }
}

export default CreateTransactionService;
