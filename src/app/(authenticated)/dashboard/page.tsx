'use client';

import { useDebounceValue } from "usehooks-ts";
import useHandleDash from "@/hooks/useHandleDash";
import { Pagination } from "@/components/Pagination";
import { useState } from "react";
import TransactionSearchBar from "@/components/DashboardComponents/TransactionSearchBar";
import TransactionForm from "@/components/DashboardComponents/TransactionForm";
import TransactionsList from "@/components/DashboardComponents/TransactionList";
import GenericLoader from "@/components/skeletons/GenericLoader";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

  const {
    handleAddTransaction,
    allTransactions,
    handleFetchTransactions,
    currentPage,
    totalPages,
    isLoading,
    isError,
  } = useHandleDash(debouncedSearchTerm);

  return (
    <div className="p-10 w-full mx-auto rounded-md my-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold w-full text-gray-700">Add Transaction</h1>
        <TransactionSearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <TransactionForm onSubmit={handleAddTransaction} />

      <div className="py-5">
        <h3 className="text-xl pt-5 pb-2 font-semibold text-gradient">Your Previous Transactions</h3>
        
        {isLoading ? (
          <GenericLoader/>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">Error loading transactions. Please try again.</div>
        ) : (
          <>
            <TransactionsList transactions={allTransactions} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => handleFetchTransactions(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;