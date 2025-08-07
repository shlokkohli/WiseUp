type Props = {
    value: string;
    onChange: (val: string) => void;
  };
  
  const TransactionSearchBar: React.FC<Props> = ({ value, onChange }) => (
    <input
      className="w-1/2 border-gray-800 mb-5 rounded-lg border p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Search Transactions"
    />
  );
  
  export default TransactionSearchBar;
  