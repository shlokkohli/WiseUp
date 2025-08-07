'use client';

import { useState } from "react";
import { PaymentMethod } from "@/types/enums.type";
import GenericLoader from "@/components/skeletons/GenericLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/MyUi/Button";
import MandateTable from "@/components/MandateTable";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (mandateData: any) => {
      const res = await fetch('/api/addMandate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mandateData),
      });
      if (!res.ok) throw new Error("Failed to create mandate");
      const data = await res.json();
      return data.mandate;
    },
    onSuccess() {
      toast({
        title: "Success",
        description: "Payment Set Successfully",
        variant: "default"
    });
      queryClient.invalidateQueries({ queryKey: ['get-mandates'] });
    },
    onError(err: any) {
      setError(err.message);
    },
  });

  const handleMandateSubmit = (data: any) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="p-10 w-full mx-auto rounded-md my-2">
      <h1 className="text-xl font-semibold text-gray-700 mb-3">Set Recurring Payment</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <MandateForm onSubmit={handleMandateSubmit} />

      {mutation.isPending && <GenericLoader />}
    </div>
  );
};

export default Page;


type MandateFormProps = {
  onSubmit: (data: MandateData) => void;
};

export type MandateData = {
  paymentFor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  repeat: number;
  startDate: string;
};

const MandateForm: React.FC<MandateFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<MandateData>({
    paymentFor: "",
    amount: 0,
    paymentMethod: PaymentMethod.CARD,
    repeat: 0,
    startDate: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !data.paymentFor ||
      !data.amount ||
      !data.paymentMethod ||
      !data.startDate ||
      !data.repeat
    ) {
      alert("All fields are required!");
      return;
    }
    onSubmit(data);
    setData({
      paymentFor: "",
      amount: 0,
      paymentMethod: PaymentMethod.CARD,
      repeat: 0,
      startDate: "",
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">

    <form onSubmit={handleSubmit} className="space-y-2 border p-5 rounded-lg">
      {/* Payment For & Amount */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="paymentFor" className="block mb-1 text-gray-700">
            Payment For
          </label>
          <input
            id="paymentFor"
            type="text"
            value={data.paymentFor}
            placeholder="Netflix"
            onChange={(e) => handleChange("paymentFor", e.target.value)}
            className="w-full p-1 border rounded"
            />
        </div>
        <div className="w-1/2">
          <label htmlFor="amount" className="block mb-1 text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={data.amount.toString()}
            onChange={(e) => handleChange("amount", parseInt(e.target.value))}
            onWheel={(e) => e.currentTarget.blur()}
            className="w-full p-1 border rounded"
            />
        </div>
      </div>

      {/* Payment Method & Repeat */}
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="paymentMethod" className="block mb-1 text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={data.paymentMethod}
            onChange={(e) => handleChange("paymentMethod", e.target.value)}
            className="w-full p-1 border rounded"
            >
            {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label htmlFor="repeat" className="block mb-1 text-gray-700">
            Repeat Interval (days)
          </label>
          <input
            id="repeat"
            type="number"
            value={data.repeat.toString()}
            onChange={(e) => handleChange("repeat", parseInt(e.target.value))}
            className="w-full p-1 border rounded"
            />
        </div>
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block mb-1 text-gray-700">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={data.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="w-full p-1 border rounded"
          />
      </div>

      <Button type="submit">Create Mandate</Button>
    </form>
    <MandateTable/>
          </div>
  );
};
