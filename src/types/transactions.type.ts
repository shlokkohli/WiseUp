// src/types/transaction.types.ts
import { User } from './user.type'; // Import User type
import { PaymentMethod, TransactionCategory } from '@prisma/client'; // Import enums directly from Prisma

export interface Transactions {
    id: string;
    userId: string;
    user: User;
    paymentMethod: PaymentMethod;
    paymentFor: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    category: TransactionCategory;
}