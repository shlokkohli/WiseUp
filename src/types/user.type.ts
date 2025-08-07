// src/types/user.types.ts
import { Transactions } from '@prisma/client';
import { Subscription } from './subscription.type'; // Import Subscription type

export interface User {
    id: string;
    email: string;
    isSubscribed: boolean;
    subscriptionEnds?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    Transactions: Transactions[];
    SubscriptionsBought: Subscription[];
}
