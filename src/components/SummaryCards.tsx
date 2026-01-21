import { MOCK_TRANSACTIONS } from "../mocks/transactions";
import { formatCurrency } from "../utils/formatters";

export const SummaryCards = () => {
  const totalBalance = MOCK_TRANSACTIONS.reduce(
    (acc, value) => acc + value.amount,
    0,
  );
  const totalBTC = 1.2456789; // Mocked BTC balance

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 shadow-xl border-l-4 border-l-indigo-500">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Total Balance (CHF)
        </p>
        <h3 className="text-2xl font-mono font-bold text-emerald-400 mt-2">
          {formatCurrency(totalBalance, "CHF")}
        </h3>
      </div>

      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 shadow-xl border-l-4 border-l-indigo-500">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Crypto Assets (BTC)
        </p>
        <h3 className="text-2xl font-mono font-bold text-amber-400 mt-2">
          {formatCurrency(totalBTC, "BTC")}
        </h3>
      </div>

      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 shadow-xl border-l-4 border-l-indigo-500">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Active Transactions
        </p>
        <h3 className="text-2xl font-mono font-bold text-slate-100 mt-2">
          {MOCK_TRANSACTIONS.length}
        </h3>
      </div>
    </div>
  );
};
