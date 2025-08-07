import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { FaMoneyBillWave, FaCreditCard, FaWallet, FaTag, FaCalendarAlt } from "react-icons/fa";

type Transaction = {
  paymentFor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  category: TransactionCategory;
  createdAt: string;
};

const TransactionCard: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case "CASH":
        return <FaMoneyBillWave className="text-green-600 mr-2" />;
      case "CARD":
        return <FaCreditCard className="text-blue-600 mr-2" />;
      case "NETBANKING":
        return <FaWallet className="text-purple-600 mr-2" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = () => <FaTag className="text-yellow-500 mr-2" />;
  const getDateIcon = () => <FaCalendarAlt className="text-gray-500 mr-2" />;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3 border">Payment For</th>
            <th className="px-4 py-3 border">Amount</th>
            <th className="px-4 py-3 border">Payment Method</th>
            <th className="px-4 py-3 border">Category</th>
            <th className="px-4 py-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <td className="px-4 py-2 font-medium">{txn.paymentFor}</td>
              <td className="px-4 py-2 text-green-700 font-semibold">
                ₹{txn.amount.toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {getPaymentIcon(txn.paymentMethod)}
                  <span>{txn.paymentMethod}</span>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {getCategoryIcon()}
                  <span>{txn.category}</span>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {getDateIcon()}
                  <span>
                    {new Date(txn.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionCard;
