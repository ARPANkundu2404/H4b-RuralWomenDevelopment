import { useState } from "react";
import { analyzeExpenses } from "../../constant/aiModel"; // Adjust the import path as necessary
import Suggestions from "./Suggestions";

const FinanceCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [expenseDetails, setExpenseDetails] = useState("");
  const [balance, setBalance] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const calculateBalance = () => {
    const netBalance = parseFloat(income) - parseFloat(expenses);
    setBalance(netBalance);

    if (netBalance < 0) {
      setSuggestions(analyzeExpenses(expenseDetails));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Finance Calculator</h2>
          <p className="text-blue-100 opacity-90 mt-1">
            Track your income and expenses
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Total Income (₹)
            </label>
            <input
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="number"
              placeholder="e.g. 50000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Total Expenses (₹)
            </label>
            <input
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="number"
              placeholder="e.g. 35000"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1">
              Expense Details
            </label>
            <textarea
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Breakdown of expenses (Food: 10000, Rent: 15000, etc.)"
              value={expenseDetails}
              onChange={(e) => setExpenseDetails(e.target.value)}
            ></textarea>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            onClick={calculateBalance}
          >
            Calculate Balance
          </button>

          {balance !== null && (
            <div
              className={`p-4 rounded-lg text-center font-bold text-lg ${
                balance < 0
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              Net Balance: ₹{balance.toLocaleString()}
            </div>
          )}

          {balance < 0 && <Suggestions suggestions={suggestions} />}
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;
