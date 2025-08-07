import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { toast } from "./use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type TransactionData = {
  paymentFor: string;
  amount: Number;
  paymentMethod: PaymentMethod;
  category: TransactionCategory;
};


// API functions (separated for better organization)
const fetchTransactions = async ({ 
  page = 1, 
  searchTerm = "" 
}: { 
  page: number; 
  searchTerm: string;
}) => {
  const response = await fetch(`/api/transactions?page=${page}&search=${searchTerm}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch transactions");
  }
  return response.json();
};

const addTransaction = async (data: TransactionData) => {
  const response = await fetch('/api/transactions', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  
  return response.json();
};

const useHandleDash = (debouncedSearchString: string) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Query for fetching transactions
  const { 
    data, 
    isLoading, 
    isError, 
    error
  } = useQuery({
    queryKey: ['transactions', currentPage, debouncedSearchString],
    queryFn: () => fetchTransactions({ 
      page: currentPage, 
      searchTerm: debouncedSearchString 
    }),
  });
  
  // Extract data from the query result
  const allTransactions = data?.transactions || [];
  const totalPages = data?.totalPages || 1;
  
  // Mutation for adding transactions
  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Transaction Added Successfully",
        variant: "default"
      });
      
      // Invalidate the transactions query to refetch data
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Function to handle page changes
  const handleFetchTransactions = (page: number) => {
    // invoking fetch transactions indirectly by changing one of it's key
    setCurrentPage(page);
  };
  
  // Function to handle adding transactions
  const handleAddTransaction = (data: TransactionData) => {
    addTransactionMutation.mutate(data);
  };
  
  return {
    handleAddTransaction,
    allTransactions,
    handleFetchTransactions,
    currentPage,
    totalPages,
    isLoading,
    isError,
    error: error as Error | null,
  };
};

export default useHandleDash;



