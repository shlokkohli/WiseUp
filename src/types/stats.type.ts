export interface CategoryDivision {
    _sum: {
        amount: number | null;
    };
    category: string;
}

export interface PaymentMethodDivision {
    _sum: {
        amount: number | null;
    };
    paymentMethod: string;
}

export interface TotalAmount {
    _sum: {
        amount: number | null;
    };
}

export interface DatewiseSum {
    [key: string]: number;
}

export interface statsResponse {
        categoryDivisions: CategoryDivision[];
        paymentMethodDivisions: PaymentMethodDivision[];
        totalAmount: TotalAmount;
        lastYear: DatewiseSum;
        lastWeek: DatewiseSum;
}
