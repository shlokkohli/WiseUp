// src/types/subscription.types.ts
import { User } from './user.type'; // Import User type

export interface Subscription {
    id: string;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    subscriptionAmount: number;
}
