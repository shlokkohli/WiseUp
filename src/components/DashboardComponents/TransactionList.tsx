import TransactionCard from "./TransactionCard";


type TransactionsListProps = {
  transactions: any[];
};

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="font-semibold text-gray-500 min-h-[50vh]">
        No Transactions matched with search string
      </div>
    );
  }

  return (
    <div className="min-h-[50vh]">
      <TransactionCard transactions={transactions} />
    </div>
  );
};

export default TransactionsList;
