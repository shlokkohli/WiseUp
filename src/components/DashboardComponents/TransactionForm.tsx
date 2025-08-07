import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "../MyUi/Button";

type TransactionFormProps = {
  onSubmit: (data: TransactionData) => void;
};

export type TransactionData = {
  paymentFor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  category: TransactionCategory;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [data, setData] = useState<{
    paymentFor: string;
    amount: number;
    paymentMethod: PaymentMethod | "";
    category: TransactionCategory | "";
  }>({
    paymentFor: "",
    amount: 0,
    paymentMethod: "",
    category: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.paymentFor || !data.amount || !data.paymentMethod || !data.category) {
      toast({
        title: "Error",
        description: "All fields are required!",
        variant: "destructive",
      });
      return;
    }

    onSubmit(data as TransactionData);
    setData({ paymentFor: "", amount: 0, paymentMethod: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-5 rounded-lg">
      {/* Row 1 */}
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Payment Done For?"
          value={data.paymentFor}
          onChange={(e) => handleChange("paymentFor", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount in Rupees"
          value={Number(data.amount).toString()}
          onChange={(e) => handleChange("amount", parseInt(e.target.value))}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Row 2 */}
      <div className="flex space-x-4">
        <select
          value={data.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Payment Method</option>
          {Object.values(PaymentMethod).map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        <select
          value={data.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {Object.values(TransactionCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TransactionForm;
